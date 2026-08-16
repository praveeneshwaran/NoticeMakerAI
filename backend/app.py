import os

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai

load_dotenv()

app = Flask(__name__)
CORS(app)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing from .env")

client = genai.Client(api_key=api_key)


@app.route("/")
def home():
    return "Notice Maker AI Backend is Working! 🚀"


@app.route("/generate-notice", methods=["POST"])
def generate_notice():

    data = request.get_json()

    notice_type = data.get("noticeType", "")
    tone = data.get("tone", "Professional")
    length = data.get("length", "Medium")

    institution = data.get("institution", "")
    title = data.get("title", "")
    date = data.get("date", "")
    time = data.get("time", "")
    venue = data.get("venue", "")
    description = data.get("description", "")
    instructions = data.get("instructions", "")

    prompt = f"""
You are an expert professional notice writer.

Create a high-quality {notice_type} for the following institution.

INSTITUTION:
{institution}

NOTICE TITLE:
{title}

DATE:
{date}

TIME:
{time}

VENUE:
{venue}

DESCRIPTION:
{description}

ADDITIONAL INSTRUCTIONS:
{instructions}

WRITING STYLE:
Tone: {tone}
Length: {length}

IMPORTANT REQUIREMENTS:

1. Write a professional and realistic notice.
2. Use clear and grammatically correct English.
3. Keep the information provided by the user accurate.
4. Do not invent important facts such as dates, locations or names.
5. Organize the notice into logical paragraphs.
6. Use the selected tone.
7. Follow the selected length.
8. Do not add explanations before or after the notice.
9. Return only the notice content.
"""

    try:

        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt
        )

        generated_notice = response.text

        return jsonify({
            "success": True,
            "notice": generated_notice
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route("/suggest-titles", methods=["POST"])
def suggest_titles():

    try:

        data = request.get_json()

        description = data.get("description", "")
        notice_type = data.get("noticeType", "")
        institution = data.get("institution", "")

        prompt = f"""
You are a professional notice writer.

Generate 5 professional title options for a notice.

Institution:
{institution}

Notice Type:
{notice_type}

Notice Description:
{description}

Requirements:

1. Generate exactly 5 title options.
2. Keep each title short and professional.
3. Make each title different.
4. Do not add numbering.
5. Do not add explanations.
6. Return only the 5 titles, one title per line.
"""

        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt
        )

        text = response.text.strip()

        titles = [
            line.strip()
            for line in text.split("\n")
            if line.strip()
        ]

        cleaned_titles = []

        for title in titles:

            title = title.lstrip("0123456789.-) ")

            if title:
                cleaned_titles.append(title)

        return jsonify({
            "success": True,
            "titles": cleaned_titles[:5]
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
if __name__ == "__main__":
    app.run(debug=True, port=5000)
// =====================================================
// NOTICE MAKER AI - COMPLETE FRONTEND SCRIPT
// =====================================================


// =====================================================
// 1. GENERATE NOTICE
// =====================================================

async function generateNotice() {

    const noticeType = document.getElementById("noticeType").value;
    const tone = document.getElementById("tone").value;
    const length = document.getElementById("length").value;
    const design = document.getElementById("design").value;

    const institution = document.getElementById("institution").value.trim();
    const title = document.getElementById("title").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const venue = document.getElementById("venue").value.trim();
    const description = document.getElementById("description").value.trim();
    const instructions = document.getElementById("instructions").value.trim();

    if (!institution || !title || !description) {
        alert("Please enter Institution Name, Notice Title and Description.");
        return;
    }

    const button = document.getElementById("generateBtn");
    const status = document.getElementById("status");
    const preview = document.getElementById("noticePreview");

    button.disabled = true;
    button.innerText = "🤖 Generating...";
    status.innerText = "AI is working...";

    preview.innerHTML = `
        <div class="loading">
            <div class="loading-icon">🤖</div>
            <h3>Creating your notice...</h3>
            <p>Gemini AI is generating your professional notice.</p>
        </div>
    `;

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/generate-notice",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    noticeType,
                    tone,
                    length,
                    institution,
                    title,
                    date,
                    time,
                    venue,
                    description,
                    instructions
                })
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.error || "Failed to generate notice."
            );
        }

        displayNotice({
            institution,
            title,
            date,
            time,
            venue,
            content: data.notice,
            design
        });

        status.innerText = "Generated ✓";

    }
    catch (error) {

        console.error("Generate error:", error);

        preview.innerHTML = `
            <div class="error-box">
                <div>❌</div>
                <h3>Something went wrong</h3>
                <p>${escapeHTML(error.message)}</p>
            </div>
        `;

        status.innerText = "Error";
    }
    finally {

        button.disabled = false;
        button.innerText = "✨ Generate Notice";
    }
}


// =====================================================
// 2. DISPLAY NOTICE
// =====================================================

function displayNotice(data) {

    const preview = document.getElementById("noticePreview");

    const formattedDate = formatDate(data.date);
    const formattedContent = formatNotice(data.content);
    const design = data.design || "official";

    preview.innerHTML = `

        <div class="professional-notice ${design}">

            <div class="notice-top">

                <div class="institution-name">
                    ${escapeHTML(data.institution)}
                </div>

                <div class="notice-label">
                    NOTICE
                </div>

            </div>

            <div class="notice-line"></div>

            <div class="notice-title">
                ${escapeHTML(data.title)}
            </div>

            <div class="notice-info">

                ${
                    formattedDate
                    ? `
                        <span>
                            📅 ${formattedDate}
                        </span>
                    `
                    : ""
                }

                ${
                    data.time
                    ? `
                        <span>
                            🕐 ${escapeHTML(data.time)}
                        </span>
                    `
                    : ""
                }

                ${
                    data.venue
                    ? `
                        <span>
                            📍 ${escapeHTML(data.venue)}
                        </span>
                    `
                    : ""
                }

            </div>

            <div class="notice-body">

                <div
                    id="editableNotice"
                    class="editable-notice"
                    contenteditable="false"
                >
                    ${formattedContent}
                </div>

            </div>

            <div class="notice-footer">

                <div>
                    <strong>Date:</strong>
                    ${formattedDate || "________"}
                </div>

                <div class="signature">

                    <div class="signature-line"></div>

                    <strong>
                        Authorized Signature
                    </strong>

                </div>

            </div>

            <div class="notice-actions">

                <button
                    type="button"
                    id="editNoticeBtn"
                    onclick="editNotice()"
                >
                    ✏️ Edit
                </button>

                <button
                    type="button"
                    id="regenerateBtn"
                    onclick="regenerateNotice()"
                >
                    🔄 Regenerate
                </button>

                <button
                    type="button"
                    onclick="copyNotice()"
                >
                    📋 Copy
                </button>

            </div>

        </div>
    `;
}


// =====================================================
// 3. EDIT NOTICE
// =====================================================

function editNotice() {

    const notice = document.getElementById("editableNotice");
    const button = document.getElementById("editNoticeBtn");

    if (!notice || !button) {
        return;
    }

    const editing =
        notice.getAttribute("contenteditable") === "true";

    if (!editing) {

        notice.setAttribute("contenteditable", "true");

        notice.classList.add("editing");

        button.innerText = "💾 Save";

        notice.focus();

    }
    else {

        notice.setAttribute("contenteditable", "false");

        notice.classList.remove("editing");

        button.innerText = "✏️ Edit";

        alert("Notice changes saved! ✅");
    }
}


// =====================================================
// 4. REGENERATE NOTICE
// =====================================================

async function regenerateNotice() {

    const description =
        document.getElementById("description").value.trim();

    if (!description) {
        alert("Please enter a notice description.");
        return;
    }

    const button =
        document.getElementById("regenerateBtn");

    if (!button) {
        return;
    }

    button.disabled = true;
    button.innerText = "🤖 Regenerating...";

    try {

        const noticeType =
            document.getElementById("noticeType").value;

        const tone =
            document.getElementById("tone").value;

        const length =
            document.getElementById("length").value;

        const institution =
            document.getElementById("institution").value.trim();

        const title =
            document.getElementById("title").value.trim();

        const date =
            document.getElementById("date").value;

        const time =
            document.getElementById("time").value;

        const venue =
            document.getElementById("venue").value.trim();

        const instructions =
            document.getElementById("instructions").value.trim();

        const design =
            document.getElementById("design").value;

        const response = await fetch(
            "http://127.0.0.1:5000/generate-notice",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    noticeType,
                    tone,
                    length,
                    institution,
                    title,
                    date,
                    time,
                    venue,
                    description,
                    instructions
                })
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.error || "Regeneration failed."
            );
        }

        displayNotice({
            institution,
            title,
            date,
            time,
            venue,
            content: data.notice,
            design
        });

        document.getElementById("status").innerText =
            "Regenerated ✓";

    }
    catch (error) {

        console.error("Regeneration error:", error);

        alert(
            "Unable to regenerate notice.\n\n" +
            error.message
        );

    }
    finally {

        button.disabled = false;
        button.innerText = "🔄 Regenerate";
    }
}


// =====================================================
// 5. FORMAT NOTICE
// =====================================================

function formatNotice(text) {

    if (!text) {
        return "";
    }

    let safeText = escapeHTML(text);

    safeText = safeText
        .replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        )
        .replace(
            /^#+\s?(.*?)$/gm,
            "<strong>$1</strong>"
        )
        .replace(
            /\n{2,}/g,
            "</p><p>"
        )
        .replace(
            /\n/g,
            "<br>"
        );

    return `<p>${safeText}</p>`;
}


// =====================================================
// 6. FORMAT DATE
// =====================================================

function formatDate(dateString) {

    if (!dateString) {
        return "";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );
}


// =====================================================
// 7. ESCAPE HTML
// =====================================================

function escapeHTML(text) {

    if (!text) {
        return "";
    }

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// =====================================================
// 8. COPY NOTICE
// =====================================================

function copyNotice() {

    const preview =
        document.getElementById("noticePreview");

    if (!preview) {
        return;
    }

    const notice = preview.innerText;

    if (!notice.trim()) {
        alert("Please generate a notice first.");
        return;
    }

    navigator.clipboard
        .writeText(notice)
        .then(() => {
            alert("Notice copied! 📋");
        })
        .catch(() => {
            alert("Unable to copy notice.");
        });
}


// =====================================================
// 9. CREATE EXPORT CLONE
// =====================================================

function createExportClone() {

    const notice =
        document.querySelector(".professional-notice");

    if (!notice) {
        return null;
    }

    const clone = notice.cloneNode(true);

    const actions =
        clone.querySelector(".notice-actions");

    if (actions) {
        actions.remove();
    }

    clone.querySelectorAll("[contenteditable]").forEach(
        element => {
            element.setAttribute(
                "contenteditable",
                "false"
            );

            element.classList.remove("editing");
        }
    );

    const exportArea =
        document.createElement("div");

    exportArea.style.position = "fixed";
    exportArea.style.left = "-10000px";
    exportArea.style.top = "0";
    exportArea.style.width = "794px";
    exportArea.style.background = "#ffffff";
    exportArea.style.padding = "0";
    exportArea.style.margin = "0";

    clone.style.width = "794px";
    clone.style.minHeight = "1123px";
    clone.style.height = "1123px";
    clone.style.margin = "0";
    clone.style.boxShadow = "none";

    exportArea.appendChild(clone);
    document.body.appendChild(exportArea);

    return {
        clone,
        exportArea
    };
}


// =====================================================
// 10. DOWNLOAD PNG
// =====================================================

async function downloadPNG() {

    const button =
        document.querySelector(
            ".actions button:nth-child(3)"
        );

    const originalText =
        button ? button.innerText : "";

    const exportData =
        createExportClone();

    if (!exportData) {
        alert("Please generate a notice first.");
        return;
    }

    if (typeof html2canvas === "undefined") {

        exportData.exportArea.remove();

        alert(
            "PNG library is not loaded. Check your internet connection."
        );

        return;
    }

    if (button) {
        button.disabled = true;
        button.innerText = "⏳ Creating PNG...";
    }

    try {

        const canvas = await html2canvas(
            exportData.clone,
            {
                scale: 2,
                backgroundColor: "#ffffff",
                useCORS: true,
                logging: false
            }
        );

        const image =
            canvas.toDataURL("image/png");

        const link =
            document.createElement("a");

        link.download =
            "Notice-Maker-AI.png";

        link.href = image;

        document.body.appendChild(link);

        link.click();

        link.remove();

    }
    catch (error) {

        console.error(
            "PNG download error:",
            error
        );

        alert(
            "Unable to download PNG.\n\n" +
            error.message
        );

    }
    finally {

        exportData.exportArea.remove();

        if (button) {
            button.disabled = false;
            button.innerText = originalText;
        }
    }
}


// =====================================================
// 11. DOWNLOAD PDF
// =====================================================

async function downloadPDF() {

    const button =
        document.querySelector(
            ".actions button:nth-child(4)"
        );

    const originalText =
        button ? button.innerText : "";

    const exportData =
        createExportClone();

    if (!exportData) {
        alert("Please generate a notice first.");
        return;
    }

    if (typeof html2canvas === "undefined") {

        exportData.exportArea.remove();

        alert(
            "PDF image library is not loaded. Check your internet connection."
        );

        return;
    }

    if (!window.jspdf) {

        exportData.exportArea.remove();

        alert(
            "PDF library is not loaded. Check your internet connection."
        );

        return;
    }

    if (button) {
        button.disabled = true;
        button.innerText = "⏳ Creating PDF...";
    }

    try {

        const canvas = await html2canvas(
            exportData.clone,
            {
                scale: 2,
                backgroundColor: "#ffffff",
                useCORS: true,
                logging: false
            }
        );

        const image =
            canvas.toDataURL("image/png");

        const { jsPDF } =
            window.jspdf;

        const pdf =
            new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });

        const pageWidth =
            pdf.internal.pageSize.getWidth();

        const pageHeight =
            pdf.internal.pageSize.getHeight();

        const margin = 5;

        const availableWidth =
            pageWidth - margin * 2;

        const availableHeight =
            pageHeight - margin * 2;

        const imageRatio =
            canvas.height / canvas.width;

        let imageWidth =
            availableWidth;

        let imageHeight =
            imageWidth * imageRatio;

        if (imageHeight > availableHeight) {

            imageHeight =
                availableHeight;

            imageWidth =
                imageHeight / imageRatio;
        }

        const x =
            (pageWidth - imageWidth) / 2;

        const y =
            (pageHeight - imageHeight) / 2;

        pdf.addImage(
            image,
            "PNG",
            x,
            y,
            imageWidth,
            imageHeight
        );

        pdf.save(
            "Notice-Maker-AI.pdf"
        );

    }
    catch (error) {

        console.error(
            "PDF download error:",
            error
        );

        alert(
            "Unable to download PDF.\n\n" +
            error.message
        );

    }
    finally {

        exportData.exportArea.remove();

        if (button) {
            button.disabled = false;
            button.innerText = originalText;
        }
    }
}


// =====================================================
// 12. AI TITLE SUGGESTIONS
// =====================================================

async function suggestTitles() {

    const description =
        document
            .getElementById("description")
            .value
            .trim();

    const noticeType =
        document.getElementById("noticeType").value;

    const institution =
        document
            .getElementById("institution")
            .value
            .trim();

    const button =
        document.getElementById("suggestTitleBtn");

    const suggestions =
        document.getElementById("titleSuggestions");

    if (!description) {

        alert(
            "Please enter the notice description first."
        );

        return;
    }

    button.disabled = true;
    button.innerText = "🤖 Thinking...";

    suggestions.innerHTML = `
        <div class="suggestion-loading">
            Generating title suggestions...
        </div>
    `;

    try {

        const response =
            await fetch(
                "http://127.0.0.1:5000/suggest-titles",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        description,
                        noticeType,
                        institution
                    })
                }
            );

        const data =
            await response.json();

        if (!response.ok || !data.success) {

            throw new Error(
                data.error ||
                "Unable to generate titles."
            );
        }

        showTitleSuggestions(data.titles);

    }
    catch (error) {

        console.error(
            "Title suggestion error:",
            error
        );

        suggestions.innerHTML = `
            <div class="suggestion-error">
                ❌ ${escapeHTML(error.message)}
            </div>
        `;

    }
    finally {

        button.disabled = false;
        button.innerText = "💡 Suggest Titles";
    }
}


// =====================================================
// 13. SHOW TITLE SUGGESTIONS
// =====================================================

function showTitleSuggestions(titles) {

    const container =
        document.getElementById(
            "titleSuggestions"
        );

    if (!container) {
        return;
    }

    if (!titles || titles.length === 0) {

        container.innerHTML =
            "<p>No title suggestions found.</p>";

        return;
    }

    window.generatedTitles = titles;

    container.innerHTML = `

        <div class="suggestion-heading">
            ✨ AI Suggested Titles
        </div>

        ${titles.map(
            (title, index) => `

                <button
                    type="button"
                    class="suggestion-item"
                    onclick="selectTitle(${index})"
                >
                    ${escapeHTML(title)}
                </button>

            `
        ).join("")}

    `;
}


// =====================================================
// 14. SELECT TITLE
// =====================================================

function selectTitle(index) {

    if (
        !window.generatedTitles ||
        !window.generatedTitles[index]
    ) {
        return;
    }

    const title =
        window.generatedTitles[index];

    document.getElementById("title").value =
        title;

    const suggestions =
        document.getElementById(
            "titleSuggestions"
        );

    if (suggestions) {

        suggestions.innerHTML = `
            <div class="selected-title">
                ✓ Title selected
            </div>
        `;
    }
}


// =====================================================
// 15. QUICK TEMPLATES
// =====================================================

function applyTemplate(type) {

    const templates = {

        "college-event": {
            noticeType: "Event Notice",
            tone: "Professional",
            length: "Medium",
            design: "college",
            title: "College Event Announcement",
            venue: "College Auditorium",
            description:
                "All students are informed that a college event will be conducted. Students are requested to participate actively and follow the instructions provided by the institution.",
            instructions:
                "Mention that students should arrive on time and maintain discipline."
        },

        "holiday": {
            noticeType: "Holiday Notice",
            tone: "Formal",
            length: "Short",
            design: "official",
            title: "Holiday Announcement",
            description:
                "The institution will remain closed on the specified date due to a holiday. Students and staff are requested to take note of the holiday.",
            instructions: ""
        },

        "exam": {
            noticeType: "Exam Notice",
            tone: "Formal",
            length: "Detailed",
            design: "official",
            title: "Examination Schedule",
            venue: "Examination Hall",
            description:
                "Students are informed about the upcoming examination. They are requested to follow the examination schedule and instructions issued by the institution.",
            instructions:
                "Students should report to the examination venue before the examination begins and carry their required materials."
        },

        "placement": {
            noticeType: "Placement Notice",
            tone: "Professional",
            length: "Detailed",
            design: "modern",
            title: "Campus Placement Drive",
            venue: "Placement Cell",
            description:
                "A campus placement drive will be conducted for eligible students. Interested students are requested to register and attend the recruitment process.",
            instructions:
                "Mention eligibility, registration requirements and the need to bring relevant documents."
        },

        "sports": {
            noticeType: "Sports Notice",
            tone: "Friendly",
            length: "Medium",
            design: "college",
            title: "Sports Event Announcement",
            venue: "College Sports Ground",
            description:
                "The institution is organizing a sports event for students. Interested students are encouraged to participate and register within the given deadline.",
            instructions:
                "Encourage students to participate actively and follow sports rules."
        },

        "workshop": {
            noticeType: "Workshop Notice",
            tone: "Professional",
            length: "Detailed",
            design: "modern",
            title: "Workshop Announcement",
            venue: "Seminar Hall",
            description:
                "A technical workshop will be conducted for students to improve their knowledge and practical skills. Interested students are encouraged to participate.",
            instructions:
                "Mention that participants should register in advance."
        },

        "meeting": {
            noticeType: "Meeting Notice",
            tone: "Formal",
            length: "Medium",
            design: "official",
            title: "Important Meeting Notice",
            venue: "Conference Hall",
            description:
                "A meeting will be conducted to discuss important institutional matters. All concerned participants are requested to attend the meeting.",
            instructions:
                "Mention punctuality and active participation."
        },

        "deadline": {
            noticeType: "Announcement",
            tone: "Urgent",
            length: "Short",
            design: "minimal",
            title: "Important Submission Deadline",
            description:
                "Students are reminded to complete and submit the required work before the specified deadline. Late submissions may not be accepted.",
            instructions:
                "Clearly emphasize the submission deadline."
        },

        "fest": {
            noticeType: "Event Notice",
            tone: "Friendly",
            length: "Detailed",
            design: "modern",
            title: "College Fest Announcement",
            venue: "College Campus",
            description:
                "The college is organizing a cultural fest featuring various activities and competitions. Students are encouraged to participate and make the event successful.",
            instructions:
                "Create an energetic and attractive announcement."
        },

        "emergency": {
            noticeType: "Announcement",
            tone: "Urgent",
            length: "Short",
            design: "official",
            title: "Urgent Announcement",
            description:
                "An urgent announcement is being issued to inform students and staff about an important situation. Everyone is requested to follow the instructions provided by the institution.",
            instructions:
                "Keep the notice clear, direct and easy to understand."
        }
    };

    const template =
        templates[type];

    if (!template) {
        return;
    }

    document.getElementById("noticeType").value =
        template.noticeType;

    document.getElementById("tone").value =
        template.tone;

    document.getElementById("length").value =
        template.length;

    document.getElementById("design").value =
        template.design;

    document.getElementById("title").value =
        template.title;

    document.getElementById("venue").value =
        template.venue || "";

    document.getElementById("description").value =
        template.description;

    document.getElementById("instructions").value =
        template.instructions;

    document.getElementById("titleSuggestions").innerHTML = "";

    document.querySelector(".form-card").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    alert("Template applied! ⚡ Now enter your institution and date, then click Generate Notice.");
}


// =====================================================
// 16. KEYBOARD SHORTCUT
// =====================================================

document.addEventListener("keydown", function(event) {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Enter"
    ) {

        event.preventDefault();

        generateNotice();
    }

});
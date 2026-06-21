import { useState } from "react";
import axios from "axios";
import "./App.css";

function Home() {
const [emailType, setEmailType] = useState("");
const [tone, setTone] = useState("");
const [details, setDetails] = useState("");
const [generatedEmail, setGeneratedEmail] = useState("");
const [loading, setLoading] = useState(false);

const generateEmail = async () => {
    if (!emailType) {
    alert("Please select Email Type");
    return;
    }

    if (!tone) {
    alert("Please select Tone");
    return;
    }

    if (!details.trim()) {
    alert("Please enter email details");
    return;
    }

    setLoading(true);

    try {
    const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        {
        emailType,
        tone,
        details,
        }
    );

    setGeneratedEmail(response.data);
    } catch (error) {
    console.error(error);
    setGeneratedEmail("Error generating email");
    } finally {
    setLoading(false);
    }
};

const copyEmail = () => {
    if (!generatedEmail) return;

    navigator.clipboard.writeText(generatedEmail);
    alert("Email copied successfully!");
};

const downloadEmail = () => {
    if (!generatedEmail) return;

    const element = document.createElement("a");

    const file = new Blob(
    [generatedEmail],
    { type: "text/plain" }
    );

    element.href = URL.createObjectURL(file);
    element.download = "generated-email.txt";

    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
};

const clearOutput = () => {
    setGeneratedEmail("");
};

return (
    <div className="page-container">
    <div className="glass-card">

        <h1 className="page-title">
        AI Email Writer
        </h1>

        {/* Stats Section */}

        <div className="stats-grid">

        <div className="stat-card">
            <h3>20+</h3>
            <p>Email Templates</p>
        </div>

        <div className="stat-card">
            <h3>18+</h3>
            <p>Professional Tones</p>
        </div>

        <div className="stat-card">
            <h3>AI</h3>
            <p>Powered by OpenRouter</p>
        </div>

        </div>

        {/* Email Type */}

        <div className="form-group">
        <label>Email Type</label>

        <select
            className="form-control"
            value={emailType}
            onChange={(e) =>
            setEmailType(e.target.value)
            }
        >
            <option value="">
            Select Email Type
            </option>

            <option value="Leave Request">
            📅 Leave Request
            </option>

            <option value="Job Application">
            💼 Job Application
            </option>

            <option value="Complaint">
            ⚠ Complaint
            </option>

            <option value="Resignation">
            🚪 Resignation
            </option>

            <option value="Apology">
            🙏 Apology
            </option>

            <option value="Meeting Request">
            🤝 Meeting Request
            </option>

            <option value="Follow-Up">
            📩 Follow-Up
            </option>

            <option value="Thank You">
            ❤️ Thank You
            </option>

            <option value="Recommendation Request">
            ⭐ Recommendation Request
            </option>

            <option value="Internship Application">
            🎓 Internship Application
            </option>

            <option value="Promotion Request">
            📈 Promotion Request
            </option>

            <option value="Salary Increment Request">
            💰 Salary Increment Request
            </option>

            <option value="Business Proposal">
            🚀 Business Proposal
            </option>

            <option value="Project Update">
            📊 Project Update
            </option>

            <option value="Customer Support">
            🎧 Customer Support
            </option>

            <option value="Invitation">
            🎉 Invitation
            </option>

            <option value="Event Announcement">
            📢 Event Announcement
            </option>

            <option value="Reminder Email">
            ⏰ Reminder Email
            </option>

            <option value="Sales Pitch">
            💵 Sales Pitch
            </option>

            <option value="Feedback Request">
            📝 Feedback Request
            </option>

            <option value="Partnership Proposal">
            🤝 Partnership Proposal
            </option>
        </select>
        </div>

        {/* Tone */}

        <div
        className="form-group"
        style={{ marginTop: "20px" }}
        >
        <label>Tone</label>

        <select
            className="form-control"
            value={tone}
            onChange={(e) =>
            setTone(e.target.value)
            }
        >
            <option value="">
            Select Tone
            </option>

            <option value="Professional">Professional</option>
            <option value="Formal">Formal</option>
            <option value="Friendly">Friendly</option>
            <option value="Casual">Casual</option>
            <option value="Confident">Confident</option>
            <option value="Persuasive">Persuasive</option>
            <option value="Respectful">Respectful</option>
            <option value="Apologetic">Apologetic</option>
            <option value="Empathetic">Empathetic</option>
            <option value="Enthusiastic">Enthusiastic</option>
            <option value="Urgent">Urgent</option>
            <option value="Diplomatic">Diplomatic</option>
            <option value="Polite">Polite</option>
            <option value="Motivational">Motivational</option>
            <option value="Corporate">Corporate</option>
            <option value="Luxury Brand">Luxury Brand</option>
            <option value="Academic">Academic</option>
            <option value="Creative">Creative</option>
        </select>
        </div>

        {/* Details */}

        <div
        className="form-group"
        style={{ marginTop: "20px" }}
        >
        <label>Email Details</label>

        <textarea
            className="form-control text-area"
            placeholder="Describe what you want in the email..."
            value={details}
            onChange={(e) =>
            setDetails(e.target.value)
            }
        />
        </div>

        {/* Generate Button */}

        <button
        className="primary-btn"
        onClick={generateEmail}
        disabled={loading}
        >
        {loading
            ? "⚡ Generating AI Email..."
            : "Generate Email"}
        </button>

        {/* Output Section */}

        <div className="output-box">

        <div className="output-header">

            <h2 className="output-title">
            Generated Email
            </h2>

            <span className="word-count">
            Words:{" "}
            {
                generatedEmail
                .split(" ")
                .filter(Boolean).length
            }
            </span>

        </div>

        <div className="generated-output">

            {generatedEmail
            ? generatedEmail
            : "Your AI generated email will appear here..."}

        </div>

        <div className="action-buttons">

            <button
            className="secondary-btn"
            onClick={copyEmail}
            >
            Copy Email
            </button>

            <button
            className="secondary-btn"
            onClick={downloadEmail}
            >
            Download Email
            </button>

            <button
            className="danger-btn"
            onClick={clearOutput}
            >
            Clear Output
            </button>

        </div>

        </div>

    </div>
    </div>
);
}

export default Home;
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function History() {
const [emails, setEmails] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
    fetchEmails();
}, []);

const fetchEmails = async () => {
    try {
    const response = await axios.get(
        "http://localhost:8080/api/email/history"
    );

    setEmails(response.data);

    } catch (error) {

    console.error(
        "History Error:",
        error
    );
    }
};

const deleteEmail = async (id) => {

    const confirmDelete =
    window.confirm(
        "Delete this email?"
    );

    if (!confirmDelete) return;

    try {

    await axios.delete(
        `http://localhost:8080/api/email/${id}`
    );

    fetchEmails();

    } catch (error) {

    console.error(
        "Delete Error:",
        error
    );
    }
};

 const deleteAllEmails = async () => {

    const confirmDelete =
    window.confirm(
        "Delete ALL emails?"
    );

    if (!confirmDelete) return;

    try {

    await axios.delete(
        "http://localhost:8080/api/email/delete-all"
    );

    fetchEmails();

    } catch (error) {

    console.error(
        "Delete All Error:",
        error
    );
    }
};

const filteredEmails = emails.filter(
    (email) =>
    email.emailType
        ?.toLowerCase()
        .includes(
        searchTerm.toLowerCase()
        ) ||
    email.tone
        ?.toLowerCase()
        .includes(
        searchTerm.toLowerCase()
        ) ||
    email.generatedEmail
        ?.toLowerCase()
        .includes(
        searchTerm.toLowerCase()
        )
);

return (
    <div className="page-container">

    <div className="glass-card">

        <div
        style={{
            display: "flex",
            justifyContent:
            "space-between",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "10px",
        }}
        >

        <h1
            className="page-title"
            style={{
            marginBottom: "0",
            }}
        >
            Email History
        </h1>

        <button
            className="danger-btn"
            onClick={deleteAllEmails}
        >
            Delete All
        </button>

        </div>

        <input
        type="text"
        className="form-control"
        placeholder="Search by type, tone, or content..."
        value={searchTerm}
        onChange={(e) =>
            setSearchTerm(
            e.target.value
            )
        }
        style={{
            marginBottom: "25px",
        }}
        />

        {filteredEmails.length === 0 ? (

        <div
            style={{
            textAlign: "center",
            padding: "40px",
            color: "#cbd5e1",
            }}
        >
            No emails found
        </div>

        ) : (

        filteredEmails.map(
            (email) => (
            <div
                key={email.id}
                className="history-card"
            >

                <h3>
                {email.emailType}
                </h3>

                <p>
                <strong>
                    Tone:
                </strong>{" "}
                {email.tone}
                </p>

                <p>
                <strong>
                    Created:
                </strong>{" "}
                {email.createdAt}
                </p>

                <pre>
                {
                    email.generatedEmail
                }
                </pre>

                <button
                className="danger-btn"
                onClick={() =>
                    deleteEmail(
                    email.id
                    )
                }
                style={{
                    marginTop: "15px",
                }}
                >
                Delete Email
                </button>

            </div>
            )
        )

        )}

    </div>

    </div>
);
}

export default History;
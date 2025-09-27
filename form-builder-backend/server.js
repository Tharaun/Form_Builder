import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Setup MySQL connection
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",        // your MySQL user
  password: "godzilla", // your MySQL password
  database: "form_builder"
});

// ✅ Create new form
app.post("/api/forms", async (req, res) => {
  console.log("Incoming body:", req.body);
  const { title, fields } = req.body;
  try {
    const [formResult] = await db.execute(
      "INSERT INTO forms (title) VALUES (?)",
      [title]
    );
    const formId = formResult.insertId;

    for (let field of fields) {
      await db.execute(
        "INSERT INTO form_fields (form_id, field_type, label, required, options) VALUES (?,?,?,?,?)",
        [
          formId,
          field.type,
          field.label,
          field.required,
          JSON.stringify(field.options || [])
        ]
      );
    }

    res.json({ success: true, formId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all forms
app.get("/api/forms", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM forms ORDER BY created_at DESC");
  res.json(rows);
});

// ✅ Get single form with fields
app.get("/api/forms/:id", async (req, res) => {
  const formId = req.params.id;
  const [form] = await db.execute("SELECT * FROM forms WHERE id = ?", [formId]);
  const [fields] = await db.execute("SELECT * FROM form_fields WHERE form_id = ?", [formId]);
  res.json({ ...form[0], fields });
});

// ✅ Submit form
app.post("/api/forms/:id/submit", async (req, res) => {
  const formId = req.params.id;
  const { data } = req.body;

  const [submissionResult] = await db.execute(
    "INSERT INTO submissions (form_id) VALUES (?)",
    [formId]
  );
  const submissionId = submissionResult.insertId;

  for (let fieldId in data) {
    await db.execute(
      "INSERT INTO submission_data (submission_id, field_id, value) VALUES (?,?,?)",
      [submissionId, fieldId, data[fieldId]]
    );
  }

  res.json({ success: true, submissionId });
});

// ✅ Get submissions
app.get("/api/forms/:id/submissions", async (req, res) => {
  const formId = req.params.id;
  const [submissions] = await db.execute(
    "SELECT * FROM submissions WHERE form_id = ?",
    [formId]
  );

  for (let submission of submissions) {
    const [data] = await db.execute(
      "SELECT field_id, value FROM submission_data WHERE submission_id = ?",
      [submission.id]
    );
    submission.data = data;
  }

  res.json(submissions);
});

// Start server
app.listen(5000, () => console.log("✅ Backend running at http://localhost:5000"));

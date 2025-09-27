import { useState, useEffect } from "react";
import api from "../api";

function ViewSubmissions() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    api.get("/api/forms").then((res) => setForms(res.data));
  }, []);

  const loadSubmissions = async (id) => {
    setSelectedForm(id);
    const res = await api.get(`/api/forms/${id}/submissions`);
    setSubmissions(res.data);
  };

  return (
    <div>
      {!selectedForm ? (
        <div>
          <h2 className="font-bold mb-2">Select Form</h2>
          <ul>
            {forms.map((form) => (
              <li key={form.id} className="mb-2">
                <button
                  onClick={() => loadSubmissions(form.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  {form.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2 className="font-bold mb-4">Submissions</h2>
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="border p-3 mb-2 bg-white shadow-sm rounded"
            >
              <p className="text-sm text-gray-600">
                Submitted at: {new Date(sub.submitted_at).toLocaleString()}
              </p>
              <ul className="list-disc pl-5">
                {sub.data.map((d, i) => (
                  <li key={i}>
                    Field {d.field_id}: {d.value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewSubmissions;

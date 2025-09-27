import { useState, useEffect } from "react";
import api from "../api";

function FillForms() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    api.get("/api/forms").then((res) => setForms(res.data));
  }, []);

  const loadForm = async (id) => {
    const res = await api.get(`/api/forms/${id}`);
    setSelectedForm(res.data);
    setResponses({});
  };

  const handleChange = (fieldId, value) => {
    setResponses({ ...responses, [fieldId]: value });
  };

  const submitForm = async () => {
    await api.post(`/api/forms/${selectedForm.id}/submit`, { data: responses });
    alert("Form submitted!");
    setSelectedForm(null);
  };

  return (
    <div>
      {!selectedForm ? (
        <div>
          <h2 className="font-bold mb-2">Available Formss</h2>
          <ul>
            {forms.map((form) => (
              <li key={form.id} className="mb-2">
                <button
                  onClick={() => loadForm(form.id)}
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
          <h2 className="font-bold mb-2">{selectedForm.title}</h2>
          {selectedForm.fields.map((field) => (
            <div key={field.id} className="mb-3">
              <label className="block font-medium">{field.label}</label>
              {field.type === "text" && (
                <input
                  type="text"
                  className="border p-1 w-full"
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
              {field.type === "textarea" && (
                <textarea
                  className="border p-1 w-full"
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
              {field.type === "radio" &&
                field.options.map((opt, i) => (
                  <div key={i}>
                    <input
                      type="radio"
                      name={field.id}
                      value={opt}
                      onChange={() => handleChange(field.id, opt)}
                    />{" "}
                    {opt}
                  </div>
                ))}
              {field.type === "checkbox" &&
                field.options.map((opt, i) => (
                  <div key={i}>
                    <input
                      type="checkbox"
                      value={opt}
                      onChange={(e) => {
                        const prev = responses[field.id] || [];
                        if (e.target.checked) {
                          handleChange(field.id, [...prev, opt]);
                        } else {
                          handleChange(
                            field.id,
                            prev.filter((v) => v !== opt)
                          );
                        }
                      }}
                    />{" "}
                    {opt}
                  </div>
                ))}
            </div>
          ))}
          <button
            onClick={submitForm}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default FillForms;

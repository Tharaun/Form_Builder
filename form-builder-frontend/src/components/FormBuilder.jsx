import { useState } from "react";
import FieldLibrary from "./FieldLibrary";
import FieldProperties from "./FieldProperties";
import api from "../api";

function FormBuilder() {
  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [formTitle, setFormTitle] = useState("");

  const addField = (type) => {
    const newField = {
      id: Date.now(),
      type,
      label: `${type} field`,
      required: false,
      options: type === "radio" || type === "checkbox" ? ["Option 1"] : [],
    };
    setFields([...fields, newField]);
    setSelectedFieldId(newField.id); // auto-select new field
  };

  const updateField = (id, updates) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const saveForm = async () => {
    try {
      const payload = { title: formTitle, fields };
      console.log("Sending payload:", payload);  
      await api.post("/api/forms", payload);
      alert("Form saved successfully!");

      setFields([]);
      setFormTitle("");
      setSelectedFieldId(null);
    } catch (err) {
      console.error(err);
      alert("Error saving form");
    }
  };

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Left panel: Field Library */}
      <div>
        <h2 className="font-bold mb-2">Tharun Library</h2>
        <FieldLibrary addField={addField} />
      </div>

      {/* Middle panel: Form Preview */}
      <div>
        <h2 className="font-bold mb-2">Form Preview</h2>
        <input
          type="text"
          placeholder="Form Title"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="border p-2 mb-3 w-full"
        />
        <div className="border p-2 min-h-[200px] bg-white">
          {fields.map((field) => (
            <div
              key={field.id}
              className={`border p-2 mb-2 cursor-pointer ${
                selectedFieldId === field.id ? "bg-blue-100" : ""
              }`}
              onClick={() => setSelectedFieldId(field.id)}
            >
              <label>{field.label}</label>
              {field.type === "text" && (
                <input type="text" className="border w-full" disabled />
              )}
              {field.type === "textarea" && (
                <textarea className="border w-full" disabled />
              )}
              {field.type === "radio" &&
                field.options.map((opt, i) => (
                  <div key={i}>
                    <input type="radio" disabled /> {opt}
                  </div>
                ))}
              {field.type === "checkbox" &&
                field.options.map((opt, i) => (
                  <div key={i}>
                    <input type="checkbox" disabled /> {opt}
                  </div>
                ))}
            </div>
          ))}
        </div>
        <button
          onClick={saveForm}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Form
        </button>
      </div>

      {/* Right panel: Field Properties */}
      <div>
        <h2 className="font-bold mb-2">Field Properties</h2>
        {selectedField ? (
          <FieldProperties field={selectedField} updateField={updateField} />
        ) : (
          <p>Select a field to edit its properties</p>
        )}
      </div>
    </div>
  );
}

export default FormBuilder;

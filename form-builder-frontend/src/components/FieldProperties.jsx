function FieldProperties({ field, updateField }) {
  const handleChange = (key, value) => {
    updateField(field.id, { ...field, [key]: value });
  };

  const updateOption = (i, value) => {
    const options = [...field.options];
    options[i] = value;
    handleChange("options", options);
  };

  const addOption = () => {
    handleChange("options", [...field.options, "New Option"]);
  };

  if (!field) return null;

  return (
    <div className="border p-2 bg-white">
      <label className="block mb-2">
        Label:
        <input
          type="text"
          value={field.label}
          onChange={(e) => handleChange("label", e.target.value)}
          className="border p-1 w-full"
        />
      </label>
      <label className="block mb-2">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) => handleChange("required", e.target.checked)}
        />{" "}
        Required
      </label>

      {(field.type === "radio" || field.type === "checkbox") && (
        <div>
          <p className="font-semibold">Options:</p>
          {field.options.map((opt, i) => (
            <input
              key={i}
              type="text"
              value={opt}
              onChange={(e) => updateOption(i, e.target.value)}
              className="border p-1 w-full mb-1"
            />
          ))}
          <button
            onClick={addOption}
            className="bg-gray-300 px-2 py-1 rounded mt-2"
          >
            Add Option
          </button>
        </div>
      )}
    </div>
  );
}

export default FieldProperties;

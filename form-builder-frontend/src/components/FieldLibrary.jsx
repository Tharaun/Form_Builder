function FieldLibrary({ addField }) {
  return (
    <div className="space-y-2">
      <button
        onClick={() => addField("text")}
        className="w-full bg-blue-500 text-white px-3 py-2 rounded"
      >
        Text
      </button>
      <button
        onClick={() => addField("textarea")}
        className="w-full bg-blue-500 text-white px-3 py-2 rounded"
      >
        Textarea
      </button>
      <button
        onClick={() => addField("radio")}
        className="w-full bg-blue-500 text-white px-3 py-2 rounded"
      >
        Radio
      </button>
      <button
        onClick={() => addField("checkbox")}
        className="w-full bg-blue-500 text-white px-3 py-2 rounded"
      >
        Checkbox
      </button>
      <button
        onClick={() => addField("textarea")}
        className="w-full bg-blue-500 text-white px-3 py-2 rounded"
      >
        tharun
      </button>
    </div>
  );
}

export default FieldLibrary;

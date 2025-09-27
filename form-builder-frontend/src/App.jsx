import { useState } from "react";
import FormBuilder from "./components/FormBuilder";
import FillForms from "./components/FillForms";
import ViewSubmissions from "./components/ViewSubmissions";

function App() {
  const [activeTab, setActiveTab] = useState("builder");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">React Form Builder</h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("builder")}
          className={`px-4 py-2 rounded ${
            activeTab === "builder" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Builder
        </button>
        <button
          onClick={() => setActiveTab("fill")}
          className={`px-4 py-2 rounded ${
            activeTab === "fill" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Fill Forms
        </button>
        <button
          onClick={() => setActiveTab("submissions")}
          className={`px-4 py-2 rounded ${
            activeTab === "submissions" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          View Submissions
        </button>
      </div>

      {activeTab === "builder" && <FormBuilder />}
      {activeTab === "fill" && <FillForms />}
      {activeTab === "submissions" && <ViewSubmissions />}
    </div>
  );
}

export default App;

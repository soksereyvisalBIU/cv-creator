import React, { useState } from "react";
import Template1 from "../templates/Template3";
import Template2 from "../templates/Template1";
import Template3 from "../templates/Template2";
import Form from "../pages/Form";
import { downloadTemplateAsPDF } from "../utils/pdfExport";

function Homepage() {
  const [formData, setFormData] = useState();
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [mode, setMode] = useState("preview"); // or "print"

  const templates = {
    template1: Template1,
    template2: Template2,
    template3: Template3,
  };
  const TemplateComponent = templates[selectedTemplate];

  const handleExport = async () => {
    setMode("print");

    // Wait for DOM update
    setTimeout(async () => {
      await downloadTemplateAsPDF("print-area", "resume.pdf");
      setMode("preview");
    }, 300); // slight delay to allow layout/render
  };

  // console.log("formData", formData);
  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container grid gap-8 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
        <div className="">
          {/* Template Switcher */}
          <div className="mb-4 flex gap-2">
            <button
              className={`px-3 py-1 rounded ${
                selectedTemplate === "template1"
                  ? "bg-blue-700 text-white"
                  : "bg-white border"
              }`}
              onClick={() => setSelectedTemplate("template1")}
            >
              Template 1
            </button>
            <button
              className={`px-3 py-1 rounded ${
                selectedTemplate === "template2"
                  ? "bg-blue-700 text-white"
                  : "bg-white border"
              }`}
              onClick={() => setSelectedTemplate("template2")}
            >
              Template 2
            </button>
            <button
              className={`px-3 py-1 rounded ${
                selectedTemplate === "template3"
                  ? "bg-blue-700 text-white"
                  : "bg-white border"
              }`}
              onClick={() => setSelectedTemplate("template3")}
            >
              Template 3
            </button>
          </div>
          {/* Render selected template */}
          <TemplateComponent {...formData} />
        </div>
        <div className="lg:col-span-2 text-gray-600 overflow-hidden px-2 pb-2">
          <Form setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
}

export default Homepage;

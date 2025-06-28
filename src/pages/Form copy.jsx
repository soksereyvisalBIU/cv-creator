import React, { useState, useEffect } from "react"; // Import React and hooks
import Personal from "../component/form/Personal";
import Education from "../component/form/Educations";
import Experience from "../component/form/Experiences";
import Skills from "../component/form/Skills";
import Certifications from "../component/form/Certifications";
import Languages from "../component/form/Languages";
import Projects from "../component/form/Projects";
import Publications from "../component/form/Publications";
import Workshops from "../component/form/Workshops";
import Volunteer from "../component/form/Volunteers";
import References from "../component/form/References";

// List of form sections with their labels and components
const formSections = [
  { label: "Personal", component: Personal },
  { label: "Education", component: Education },
  { label: "Experience", component: Experience },
  { label: "Skills", component: Skills },
  { label: "Certifications", component: Certifications },
  { label: "Languages", component: Languages },
  { label: "Projects", component: Projects },
  { label: "Publications", component: Publications },
  { label: "Workshops", component: Workshops },
  { label: "Volunteer", component: Volunteer },
  { label: "References", component: References },
];

const FORM_DATA_KEY = "cvCreatorFormData"; // Key for localStorage form data
const FORM_STEP_KEY = "cvCreatorFormStep"; // Key for localStorage step

function Form({ setFormData: setFormDataProp }) {
  // Main Form component
  // Load formData from localStorage if available, else use empty object
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(FORM_DATA_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  // Load step from localStorage if available, else start at 0
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem(FORM_STEP_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });
  const SectionComponent = formSections[step].component; // Current section component

  // Save formData to localStorage and update parent if needed
  useEffect(() => {
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
    if (setFormDataProp) setFormDataProp(formData);
  }, [formData, setFormDataProp]);
  // Save step to localStorage
  useEffect(() => {
    localStorage.setItem(FORM_STEP_KEY, step);
  }, [step]);

  // Warn user before closing or refreshing the tab
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue =
        "You have unsaved changes. Are you sure you want to leave?";
      return e.returnValue;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Go to next section
  const goNext = () => {
    if (step < formSections.length - 1) setStep(step + 1);
  };
  // Go to previous section
  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  // Clean all form data and step from localStorage and reset state, with confirmation
  const handleClearData = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all data? This action cannot be undone."
      )
    ) {
      localStorage.removeItem(FORM_DATA_KEY);
      localStorage.removeItem(FORM_STEP_KEY);
      setFormData({});
      setStep(0);
    }
  };

  return (
    <div>
      {/* Section label */}
      <div className="mb-4 text-center text-lg font-bold text-white">
        {formSections[step].label}
      </div>
      {/* Pagination navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {formSections.map((section, idx) => {
          // Check if the section is filled (has any non-empty value in formData)
          let isFilled = false;
          const sectionKey = section.label.toLowerCase();
          if (formData[sectionKey]) {
            const val = formData[sectionKey];
            if (Array.isArray(val)) {
              isFilled = val.some((item) => {
                if (typeof item === "object" && item !== null) {
                  return Object.values(item).some(
                    (v) => v !== undefined && v !== null && v !== ""
                  );
                }
                return item !== undefined && item !== null && item !== "";
              });
            } else if (typeof val === "object" && val !== null) {
              isFilled = Object.values(val).some(
                (v) => v !== undefined && v !== null && v !== ""
              );
            } else {
              isFilled = val !== undefined && val !== null && val !== "";
            }
          }
          return (
            <button
              key={section.label}
              type="button"
              onClick={() => setStep(idx)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                idx === step
                  ? "bg-blue-700 text-white border-blue-700"
                  : isFilled
                  ? "bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white border-blue-300 hover:bg-blue-100"
                  : "bg-white text-blue-700 border-blue-300 hover:bg-blue-100"
              }`}
            >
              {section.label}
            </button>
          );
        })}
      </div>
      {/* Render current section */}
      <SectionComponent setFormData={setFormData} />
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-4 ${
            step === 0
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300"
          }`}
        >
          Back
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={step === formSections.length - 1}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-4 ${
            step === formSections.length - 1
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-green-700 text-white hover:bg-green-800 focus:ring-green-300"
          }`}
        >
          Next
        </button>
      </div>
      {/* Clear Data button */}
      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={handleClearData}
          className="px-5 py-2.5 rounded-lg text-sm font-medium bg-red-700 text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          Clear All Data
        </button>
      </div>
    </div>
  );
}

export default Form; // Export the Form component

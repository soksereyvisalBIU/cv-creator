import React, { useState, useEffect, useRef } from "react"; // Import React and hooks
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
// import { downloadTemplateAsPDF } from "../utils/pdfExport"; // adjust path

import "../component/form/form-animations.css"; // Import animation CSS for slide transitions

// List of form sections with their labels and components
const formSections = [
  { label: "Personal", component: Personal },
  { label: "Educations", component: Education },
  { label: "Experiences", component: Experience },
  { label: "Skills", component: Skills },
  { label: "Certifications", component: Certifications },
  { label: "Languages", component: Languages },
  { label: "Projects", component: Projects },
  { label: "Publications", component: Publications },
  { label: "Workshops", component: Workshops },
  { label: "Volunteers", component: Volunteer },
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
  const [animation, setAnimation] = useState(""); // Animation class for transitions
  const prevStep = useRef(step); // Track previous step for direction

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

  // Animate on step change
  useEffect(() => {
    if (prevStep.current === step) return;
    if (step > prevStep.current) {
      setAnimation("animate-slide-left"); // Next: slide left
    } else {
      setAnimation("animate-slide-right"); // Back: slide right
    }
    prevStep.current = step;
    // Remove animation class after animation duration (400ms)
    const timeout = setTimeout(() => setAnimation(""), 400);
    return () => clearTimeout(timeout);
  }, [step]);

  // Handle swipe gestures for mobile/touch devices
  useEffect(() => {
    let touchStartX = null;
    let touchEndX = null;
    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };
    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX !== null && touchEndX !== null) {
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 50) {
          // Minimum swipe distance
          if (diff < 0 && step < formSections.length - 1) {
            setAnimation("animate-slide-left");
            setStep(step + 1); // Swipe left: next
          } else if (diff > 0 && step > 0) {
            setAnimation("animate-slide-right");
            setStep(step - 1); // Swipe right: back
          }
        }
      }
      touchStartX = null;
      touchEndX = null;
    };
    const container = document.getElementById("form-swipe-container");
    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [step]);

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
    <div id="form-swipe-container" className="">
      {/* Section label */}
      <div className="mb-4 text-center text-lg font-bold ">
        {formSections[step].label}
      </div>
      {/* Pagination navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {formSections.map((section, idx) => {
          // Calculate fill percentage for the section
          let fillPercent = 0; // Percentage of fields filled for this section
          const sectionKey = section.label.toLowerCase(); // Use label as key in formData
          const val = formData[sectionKey]; // Get the value for this section
          let totalFields = 0; // Total number of fields in this section
          let filledFields = 0; // Number of filled fields in this section
          if (val) {
            if (Array.isArray(val)) {
              // If the section is an array (e.g. multiple entries)
              // Count all fields in all objects in the array
              val.forEach((item) => {
                if (typeof item === "object" && item !== null) {
                  const values = Object.values(item);
                  totalFields += values.length;
                  // Special case: if a value is an array (e.g. contributions: [""]), count only non-empty strings
                  filledFields += values.reduce((acc, v) => {
                    if (Array.isArray(v)) {
                      // Only count as filled if at least one non-empty string exists
                      const nonEmpty = v.filter(
                        (s) => typeof s === "string" && s.trim() !== ""
                      );
                      totalFields += v.length - 1; // subtract 1 because we already counted the array itself
                      return acc + nonEmpty.length;
                    } else if (v !== undefined && v !== null && v !== "") {
                      return acc + 1;
                    }
                    return acc;
                  }, 0);
                } else {
                  totalFields += 1;
                  if (item !== undefined && item !== null && item !== "")
                    filledFields += 1;
                }
              });
            } else if (typeof val === "object" && val !== null) {
              const values = Object.values(val);
              totalFields = values.length;
              filledFields = values.reduce((acc, v) => {
                if (Array.isArray(v)) {
                  // Only count as filled if at least one non-empty string exists
                  const nonEmpty = v.filter(
                    (s) => typeof s === "string" && s.trim() !== ""
                  );
                  totalFields += v.length - 1; // subtract 1 because we already counted the array itself
                  return acc + nonEmpty.length;
                } else if (v !== undefined && v !== null && v !== "") {
                  return acc + 1;
                }
                return acc;
              }, 0);
            } else {
              totalFields = 1;
              filledFields =
                val !== undefined && val !== null && val !== "" ? 1 : 0;
            }
          }
          fillPercent =
            totalFields > 0
              ? Math.round((filledFields / totalFields) * 100)
              : 0; // Calculate percentage filled
          const isCurrent = idx === step; // Is this the current section?
          let buttonClass =
            "px-4 py-2 rounded-full text-xs font-medium border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300 "; // Base button classes
          let style = {}; // Inline style for gradient/solid backgrounds
          if (isCurrent) {
            buttonClass += "bg-blue-700 text-white border-blue-700 "; // Highlight current section
          } else if (fillPercent === 100) {
            buttonClass += "text-white border-green-600 "; // Solid green if fully filled
            style = { background: "oklch(28.2% 0.091 267.935)" }; // Tailwind green-500
          } else if (fillPercent > 0) {
            buttonClass += "text-white border-blue-300 "; // Gradient if partially filled
            style = {
              background: `linear-gradient(to right, oklch(28.2% 0.091 267.935) ${fillPercent}%, oklch(80.9% 0.105 251.813) ${fillPercent}%)`,
            };
          } else {
            buttonClass +=
              "bg-white text-blue-700 border-blue-300 hover:bg-blue-100 "; // Default style if empty
          }
          return (
            <button
              key={section.label}
              type="button"
              onClick={() => {
                if (idx !== step) {
                  setAnimation(
                    idx > step ? "animate-slide-left" : "animate-slide-right"
                  );
                  setStep(idx);
                }
              }}
              className={buttonClass}
              style={style}
            >
              {section.label}
            </button>
          );
        })}
      </div>
      {/* Render current section with animation */}
      <div className={`transition-all duration-400 bg-slate-50 ${animation}`}>
        <SectionComponent setFormData={setFormData} />
      </div>
      {/* Navigation buttons */}
      <div className="flex flex-col items-center mt-8 gap-2">
        <div className="flex justify-center mb-2">
          {/* Small dots pagination */}
          {formSections.map((_, idx) => (
            <span
              key={idx}
              className={`mx-1 w-2 h-2 rounded-full inline-block transition-all duration-200 ${
                idx === step ? "bg-blue-700 scale-125 shadow" : "bg-gray-400"
              }`}
              style={{
                boxShadow: idx === step ? "0 0 0 2px #3b82f6" : undefined,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between w-full">
          <button
            type="button"
            onClick={() => {
              setAnimation("animate-slide-right");
              goBack();
            }}
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
            onClick={() => {
              setAnimation("animate-slide-left");
              goNext();
            }}
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
        {/* <button onClick={() => downloadTemplateAsPDF()}>Download as PDF</button> */}
      </div>
    </div>
  );
}

export default Form; // Export the Form component

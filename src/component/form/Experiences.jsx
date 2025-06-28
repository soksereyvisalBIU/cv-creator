import { useState, useEffect } from "react"; // Import useState and useEffect from React

const FORM_DATA_KEY = "cvCreatorFormData";

function Experience({ setFormData }) {
  // Load experiences from localStorage if available
  const [experiences, setExperiences] = useState(() => {
    try {
      const saved = localStorage.getItem(FORM_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return (
          parsed.experiences || [
            {
              jobTitle: "",
              companyName: "",
              location: "",
              datesOfEmployment: "",
              responsibilities: [""],
              achievements: [""],
            },
          ]
        );
      }
    } catch {}
    return [
      {
        jobTitle: "",
        companyName: "",
        location: "",
        datesOfEmployment: "",
        responsibilities: [""],
        achievements: [""],
      },
    ];
  });

  // Handle input changes for each experience entry (except array fields)
  const handleChange = (index, e) => {
    const { name, value } = e.target; // Get field name and value
    const updated = [...experiences]; // Copy experiences array
    updated[index][name] = value; // Update the changed field
    setExperiences(updated); // Update state
    setFormData((prev) => ({
      ...prev,
      experiences: updated, // Update experiences section
    }));
  };

  // Handle changes for array fields (responsibilities, achievements)
  const handleArrayChange = (index, field, arrIndex, value) => {
    const updated = [...experiences];
    updated[index][field][arrIndex] = value;
    setExperiences(updated);
    setFormData((prev) => ({
      ...prev,
      experiences: updated,
    }));
  };

  // Add a new experience entry
  const addExperience = () => {
    const updated = [
      ...experiences,
      {
        jobTitle: "",
        companyName: "",
        location: "",
        datesOfEmployment: "",
        responsibilities: [""],
        achievements: [""],
      },
    ];
    setExperiences(updated);
    setFormData((prev) => ({
      ...prev,
      experiences: updated,
    }));
  };

  // Remove an experience entry by index
  const removeExperience = (index) => {
    if (experiences.length === 1) return; // Prevent removing the last entry
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
    setFormData((prev) => ({
      ...prev,
      experiences: updated,
    }));
  };

  // Add a new bullet point to responsibilities or achievements
  const addBullet = (index, field) => {
    const updated = [...experiences];
    updated[index][field].push("");
    setExperiences(updated);
    setFormData((prev) => ({
      ...prev,
      experiences: updated,
    }));
  };

  // Remove a bullet point from responsibilities or achievements
  const removeBullet = (index, field, arrIndex) => {
    const updated = [...experiences];
    if (updated[index][field].length === 1) return;
    updated[index][field].splice(arrIndex, 1);
    setExperiences(updated);
    setFormData((prev) => ({
      ...prev,
      experiences: updated,
    }));
  };

  // Keep localStorage in sync if experiences changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, experiences }));
    // Also update localStorage directly for immediate persistence
    const saved = localStorage.getItem(FORM_DATA_KEY);
    let merged = {};
    try {
      merged = saved ? JSON.parse(saved) : {};
    } catch {}
    merged.experiences = experiences;
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(merged));
  }, [experiences, setFormData]);

  return (
    <>
      <div className="form-container">
        {experiences.map((exp, index) => (
          <>
            <div className="md:col-span-2">
              <label htmlFor={`jobTitle-${index}`}>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                id={`jobTitle-${index}`}
                className="input-field"
                placeholder=" "
                required
                value={exp.jobTitle}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-3">
              <label htmlFor={`companyName-${index}`}>Company Name</label>
              <input
                type="text"
                name="companyName"
                id={`companyName-${index}`}
                className="input-field"
                placeholder=" "
                required
                value={exp.companyName}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={`location-${index}`}>Location</label>
              <input
                type="text"
                name="location"
                id={`location-${index}`}
                className="input-field"
                placeholder=" "
                required
                value={exp.location}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={`datesOfEmployment-${index}`}>
                Dates of Employment
              </label>
              <input
                type="text"
                name="datesOfEmployment"
                id={`datesOfEmployment-${index}`}
                className="input-field"
                placeholder="Month/Year – Month/Year"
                required
                value={exp.datesOfEmployment}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            {/* Key Responsibilities (bullet points) */}
            <div className="md:col-span-5 mb-2">
              <label className="">Key Responsibilities</label>
              {exp.responsibilities.map((item, arrIndex) => (
                <div key={arrIndex} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleArrayChange(
                        index,
                        "responsibilities",
                        arrIndex,
                        e.target.value
                      )
                    }
                    className="input-field flex-1"
                    placeholder="Responsibility"
                    required
                  />
                  {exp.responsibilities.length > 1 && (
                    <button
                      type="button"
                      className="text-red-500 text-xs"
                      onClick={() =>
                        removeBullet(index, "responsibilities", arrIndex)
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="text-blue-500 text-xs"
                onClick={() => addBullet(index, "responsibilities")}
              >
                + Add Responsibility
              </button>
            </div>
            {/* Achievements / Results (bullet points) */}
            <div className="md:col-span-5 mb-2">
              <label className="">Achievements / Results</label>
              {exp.achievements.map((item, arrIndex) => (
                <div key={arrIndex} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleArrayChange(
                        index,
                        "achievements",
                        arrIndex,
                        e.target.value
                      )
                    }
                    className="input-field flex-1"
                    placeholder="Achievement or Result (use numbers/metrics if possible)"
                    required
                  />
                  {exp.achievements.length > 1 && (
                    <button
                      type="button"
                      className="text-red-500 text-xs"
                      onClick={() =>
                        removeBullet(index, "achievements", arrIndex)
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="text-blue-500 text-xs"
                onClick={() => addBullet(index, "achievements")}
              >
                + Add Achievement
              </button>
            </div>
            {experiences.length > 1 && (
              <>
                <div className="md:col-span-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-red-500 hover:text-red-700 text-xs mb-2"
                  >
                    Remove
                  </button>
                </div>
                <div className="md:col-span-5 border-b border-gray-200 mb-2"></div>
              </>
            )}
          </>
        ))}
        <div className="md:col-span-5 flex justify-end">
          <button
            type="button"
            onClick={addExperience}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Add Experience
          </button>
        </div>
      </div>
    </>
  );
}

export default Experience; // Export the Experience component

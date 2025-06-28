import { useState, useEffect } from "react"; // Import useState and useEffect from React

const FORM_DATA_KEY = "cvCreatorFormData";

function Education({ setFormData }) {
  // Load educations from localStorage if available
  const [educations, setEducations] = useState(() => {
    try {
      const saved = localStorage.getItem(FORM_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return (
          parsed.educations || [
            {
              degree: "",
              institution: "",
              location: "",
              yearsAttended: "",
              gpaHonors: "",
            },
          ]
        );
      }
    } catch {}
    return [
      {
        degree: "",
        institution: "",
        location: "",
        yearsAttended: "",
        gpaHonors: "",
      },
    ];
  });

  // Handle input changes for each education entry
  const handleChange = (index, e) => {
    const { name, value } = e.target; // Get field name and value
    const updated = [...educations]; // Copy educations array
    updated[index][name] = value; // Update the changed field
    setEducations(updated); // Update state

    // Update parent formData with new education data
    setFormData((prev) => ({
      ...prev, // Preserve other form data
      // education: {
      educations: updated, // Update education section
      // },
    }));
  };

  // Add a new education entry
  const addEducation = () => {
    const updated = [
      ...educations, // Keep existing entries
      {
        degree: "",
        institution: "",
        location: "",
        yearsAttended: "",
        gpaHonors: "",
      },
    ];
    setEducations(updated); // Update state

    // Update parent formData after adding
    setFormData((prev) => ({
      ...prev, // Preserve other form data
      // education: {
      educations: updated, // Update education section
      // },
    }));
  };

  // Remove a personal entry by index
  const removePersonal = (index) => {
    if (educations.length === 1) return; // Prevent removing the last entry
    const updated = educations.filter((_, i) => i !== index); // Remove selected entry
    setEducations(updated); // Update state

    // Update parent formData after adding
    setFormData((prev) => ({
      ...prev, // Preserve other form data
      // education: {
      educations: updated, // Update education section
      // },
    }));
  };

  // Keep localStorage in sync if educations changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, educations }));
    // Also update localStorage directly for immediate persistence
    const saved = localStorage.getItem(FORM_DATA_KEY);
    let merged = {};
    try {
      merged = saved ? JSON.parse(saved) : {};
    } catch {}
    merged.educations = educations;
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(merged));
  }, [educations, setFormData]);

  return (
    <>
      <div className="form-container">
        {educations.map((edu, index) => (
          <>
            <div className="md:col-span-2">
              <label htmlFor={`degree-${index}`}>Degree / Qualification</label>
              <input
                type="text"
                name="degree"
                id={`degree-${index}`}
                className="input-field"
                placeholder=" "
                required
                value={edu.degree}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-3">
              <label htmlFor={`institution-${index}`}>Institution Name</label>
              <input
                type="text"
                name="institution"
                id={`institution-${index}`}
                className="input-field"
                placeholder=" "
                required
                value={edu.institution}
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
                value={edu.location}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={`yearsAttended-${index}`}>Years Attended</label>
              <input
                type="text"
                name="yearsAttended"
                id={`yearsAttended-${index}`}
                className="input-field"
                placeholder=" "
                required
                value={edu.yearsAttended}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor={`gpaHonors-${index}`}>
                GPA / Honors
              </label>
              <input
                type="text"
                name="gpaHonors"
                id={`gpaHonors-${index}`}
                className="input-field"
                placeholder=" "
                value={edu.gpaHonors}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            {educations.length > 1 && (
              <>
                <div className="md:col-span-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removePersonal(index)}
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
            onClick={addEducation}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Add Education
          </button>
        </div>
      </div>
    </>
  );
}

export default Education; // Export the Education component

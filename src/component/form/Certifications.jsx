import { useState, useEffect } from "react"; // Import useState and useEffect from React

const FORM_DATA_KEY = "cvCreatorFormData";

function Certifications({ setFormData }) {
  // Load certifications from localStorage if available
  const [certifications, setCertifications] = useState(() => {
    try {
      const saved = localStorage.getItem(FORM_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return (
          parsed.certifications || [
            {
              title: "",
              organization: "",
              dateIssued: "",
              credential: "",
            },
          ]
        );
      }
    } catch {}
    return [
      {
        title: "",
        organization: "",
        dateIssued: "",
        credential: "",
      },
    ];
  });

  // Handle input changes for each certification entry
  const handleChange = (index, e) => {
    const { name, value } = e.target; // Get field name and value
    const updated = [...certifications]; // Copy certifications array
    updated[index][name] = value; // Update the changed field
    setCertifications(updated); // Update state
    setFormData((prev) => ({
      ...prev,
      certifications: updated, // Update certifications section
    }));
  };

  // Add a new certification entry
  const addCertification = () => {
    const updated = [
      ...certifications,
      {
        title: "",
        organization: "",
        dateIssued: "",
        credential: "",
      },
    ];
    setCertifications(updated);
    setFormData((prev) => ({
      ...prev,
      certifications: updated,
    }));
  };

  // Remove a certification entry by index
  const removeCertification = (index) => {
    if (certifications.length === 1) return; // Prevent removing the last entry
    const updated = certifications.filter((_, i) => i !== index);
    setCertifications(updated);
    setFormData((prev) => ({
      ...prev,
      certifications: updated,
    }));
  };

  // Keep localStorage in sync if certifications changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, certifications }));
    // Also update localStorage directly for immediate persistence
    const saved = localStorage.getItem(FORM_DATA_KEY);
    let merged = {};
    try {
      merged = saved ? JSON.parse(saved) : {};
    } catch {}
    merged.certifications = certifications;
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(merged));
  }, [certifications, setFormData]);

  return (
    <>
      <div className="form-container">
        {certifications.map((cert, index) => (
          <>
            <div className="md:col-span-2">
              <label htmlFor={`title-${index}`}>Certificate Title</label>
              <input
                type="text"
                name="title"
                id={`title-${index}`}
                className="input-field"
                placeholder="Certificate Title"
                required
                value={cert.title}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-3">
              <label htmlFor={`organization-${index}`}>
                Issuing Organization
              </label>
              <input
                type="text"
                name="organization"
                id={`organization-${index}`}
                className="input-field"
                placeholder="Issuing Organization"
                required
                value={cert.organization}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={`dateIssued-${index}`}>Date Issued</label>
              <input
                type="date"
                name="dateIssued"
                id={`dateIssued-${index}`}
                className="input-field"
                placeholder="Date Issued"
                required
                value={cert.dateIssued}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-3">
              <label htmlFor={`credential-${index}`}>
                Credential ID / Link (optional)
              </label>
              <input
                type="text"
                name="credential"
                id={`credential-${index}`}
                className="input-field"
                placeholder="Credential ID / Link (optional)"
                value={cert.credential}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            {certifications.length > 1 && (
              <>
                <div className="md:col-span-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
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
            onClick={addCertification}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Add Certification
          </button>
        </div>
      </div>
    </>
  );
}

export default Certifications; // Export the Certifications component

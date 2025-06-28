import { useState, useEffect } from "react"; // Import useState and useEffect from React

const FORM_DATA_KEY = "cvCreatorFormData";

function References({ setFormData }) {
  // Load references from localStorage if available
  const [references, setReferences] = useState(() => {
    try {
      const saved = localStorage.getItem(FORM_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return (
          parsed.references || [
            {
              name: "",
              position: "",
              company: "",
              contact: "",
            },
          ]
        );
      }
    } catch {}
    return [
      {
        name: "",
        position: "",
        company: "",
        contact: "",
      },
    ];
  });

  // Handle input changes for each reference entry
  const handleChange = (index, e) => {
    const { name, value } = e.target; // Get field name and value
    const updated = [...references]; // Copy references array
    updated[index][name] = value; // Update the changed field
    setReferences(updated); // Update state
    setFormData((prev) => ({
      ...prev,
      references: updated,
    }));
  };

  // Add a new reference entry
  const addReference = () => {
    const updated = [
      ...references,
      {
        name: "",
        position: "",
        company: "",
        contact: "",
      },
    ];
    setReferences(updated);
    setFormData((prev) => ({
      ...prev,
      references: updated,
    }));
  };

  // Remove a reference entry by index
  const removeReference = (index) => {
    if (references.length === 1) return; // Prevent removing the last entry
    const updated = references.filter((_, i) => i !== index);
    setReferences(updated);
    setFormData((prev) => ({
      ...prev,
      references: updated,
    }));
  };

  // Keep localStorage in sync if references changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, references }));
    // Also update localStorage directly for immediate persistence
    const saved = localStorage.getItem(FORM_DATA_KEY);
    let merged = {};
    try {
      merged = saved ? JSON.parse(saved) : {};
    } catch {}
    merged.references = references;
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(merged));
  }, [references, setFormData]);

  return (
    <>
      {/* <form className="bg-slate-800 p-5 rounded-lg shadow-md">
        <h3 className="text-white font-bold text-xl text-center pb-5">
          References (Optional)
        </h3> */}
      {/* Form container with styling */}
      <div className="form-container">
        {references.map((ref, index) => (
          <>
            <div className="md:col-span-2">
              <label htmlFor={`name-${index}`}>Name</label>
              <input
                type="text"
                name="name"
                id={`name-${index}`}
                className="input-field"
                placeholder="Name"
                required
                value={ref.name}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-3">
              <label htmlFor={`position-${index}`}>Position</label>
              <input
                type="text"
                name="position"
                id={`position-${index}`}
                className="input-field"
                placeholder="Position"
                required
                value={ref.position}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={`company-${index}`}>Company</label>
              <input
                type="text"
                name="company"
                id={`company-${index}`}
                className="input-field"
                placeholder="Company"
                required
                value={ref.company}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-3">
              <label htmlFor={`contact-${index}`}>
                Contact Info (with permission)
              </label>
              <input
                type="text"
                name="contact"
                id={`contact-${index}`}
                className="input-field"
                placeholder="Contact Info (with permission)"
                required
                value={ref.contact}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            {references.length > 1 && (
              <>
                <div className="md:col-span-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeReference(index)}
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
            onClick={addReference}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Add Reference
          </button>
        </div>
      </div>
      {/* </form> */}
    </>
  );
}

export default References; // Export the References component

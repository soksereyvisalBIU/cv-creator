import { useState, useEffect } from "react"; // Import useState and useEffect from React

const FORM_DATA_KEY = "cvCreatorFormData";

function Languages({ setFormData }) {
  // Load languages from localStorage if available
  const [languages, setLanguages] = useState(() => {
    try {
      const saved = localStorage.getItem(FORM_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return (
          parsed.languages || [
            {
              language: "",
              proficiency: "",
            },
          ]
        );
      }
    } catch {}
    return [
      {
        language: "",
        proficiency: "",
      },
    ];
  });

  // Handle input changes for each language entry
  const handleChange = (index, e) => {
    const { name, value } = e.target; // Get field name and value
    const updated = [...languages]; // Copy languages array
    updated[index][name] = value; // Update the changed field
    setLanguages(updated); // Update state
    setFormData((prev) => ({
      ...prev,
      languages: updated, // Update languages section
    }));
  };

  // Add a new language entry
  const addLanguage = () => {
    const updated = [
      ...languages,
      {
        language: "",
        proficiency: "",
      },
    ];
    setLanguages(updated);
    setFormData((prev) => ({
      ...prev,
      languages: updated,
    }));
  };

  // Remove a language entry by index
  const removeLanguage = (index) => {
    if (languages.length === 1) return; // Prevent removing the last entry
    const updated = languages.filter((_, i) => i !== index);
    setLanguages(updated);
    setFormData((prev) => ({
      ...prev,
      languages: updated,
    }));
  };

  // Keep localStorage in sync if languages changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, languages }));
    // Also update localStorage directly for immediate persistence
    const saved = localStorage.getItem(FORM_DATA_KEY);
    let merged = {};
    try {
      merged = saved ? JSON.parse(saved) : {};
    } catch {}
    merged.languages = languages;
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(merged));
  }, [languages, setFormData]);

  return (
    <>
      <div className="form-container">
        {languages.map((lang, index) => (
          <>
            <div className="md:col-span-3">
              <label htmlFor={`language-${index}`}>Language</label>
              <input
                type="text"
                name="language"
                id={`language-${index}`}
                className="input-field"
                placeholder="Language"
                required
                value={lang.language}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={`proficiency-${index}`}>Proficiency Level</label>
              <select
                name="proficiency"
                id={`proficiency-${index}`}
                className="input-field"
                required
                value={lang.proficiency}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="" disabled>
                  Select Proficiency Level
                </option>
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
            </div>
            {languages.length > 1 && (
              <>
                <div className="md:col-span-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
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
            onClick={addLanguage}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Add Language
          </button>
        </div>
      </div>
    </>
  );
}

export default Languages; // Export the Languages component

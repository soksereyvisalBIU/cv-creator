import { useState, useEffect } from "react"; // Import useState and useEffect from React

const FORM_DATA_KEY = "cvCreatorFormData";

function Publications({ setFormData }) {
  // Load publications from localStorage if available
  const [publications, setPublications] = useState(() => {
    try {
      const saved = localStorage.getItem(FORM_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return (
          parsed.publications || [
            {
              title: "",
              journal: "",
              date: "",
              link: "",
            },
          ]
        );
      }
    } catch {}
    return [
      {
        title: "",
        journal: "",
        date: "",
        link: "",
      },
    ];
  });

  // Handle input changes for each publication entry
  const handleChange = (index, e) => {
    const { name, value } = e.target; // Get field name and value
    const updated = [...publications]; // Copy publications array
    updated[index][name] = value; // Update the changed field
    setPublications(updated); // Update state
    setFormData((prev) => ({
      ...prev,
      publications: updated,
    }));
  };

  // Add a new publication entry
  const addPublication = () => {
    const updated = [
      ...publications,
      {
        title: "",
        journal: "",
        date: "",
        link: "",
      },
    ];
    setPublications(updated);
    setFormData((prev) => ({
      ...prev,
      publications: updated,
    }));
  };

  // Remove a publication entry by index
  const removePublication = (index) => {
    if (publications.length === 1) return; // Prevent removing the last entry
    const updated = publications.filter((_, i) => i !== index);
    setPublications(updated);
    setFormData((prev) => ({
      ...prev,
      publications: updated,
    }));
  };

  // Keep localStorage in sync if publications changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, publications }));
    // Also update localStorage directly for immediate persistence
    const saved = localStorage.getItem(FORM_DATA_KEY);
    let merged = {};
    try {
      merged = saved ? JSON.parse(saved) : {};
    } catch {}
    merged.publications = publications;
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(merged));
  }, [publications, setFormData]);

  return (
    <>
      {/* <div className=" p-5 rounded-lg shadow-md"> */}
        {/* <h3 className="text-white font-bold text-xl text-center pb-5">
          Publications / Research
        </h3> */}
        {/* Form container with styling */}
        <div className="form-container">
          {publications.map((pub, index) => (
            <>
              <div className="md:col-span-2">
                <label htmlFor={`title-${index}`}>Title</label>
                <input
                  type="text"
                  name="title"
                  id={`title-${index}`}
                  className="input-field"
                  placeholder="Title"
                  required
                  value={pub.title}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div className="md:col-span-3">
                <label htmlFor={`journal-${index}`}>
                  Journal / Conference Name
                </label>
                <input
                  type="text"
                  name="journal"
                  id={`journal-${index}`}
                  className="input-field"
                  placeholder="Journal / Conference Name"
                  required
                  value={pub.journal}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor={`date-${index}`}>Date</label>
                <input
                  type="date"
                  name="date"
                  id={`date-${index}`}
                  className="input-field"
                  placeholder="Date"
                  required
                  value={pub.date}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div className="md:col-span-3">
                <label htmlFor={`link-${index}`}>Link or DOI (optional)</label>
                <input
                  type="text"
                  name="link"
                  id={`link-${index}`}
                  className="input-field"
                  placeholder="Link or DOI (optional)"
                  value={pub.link}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              {publications.length > 1 && (
                <>
                  <div className="md:col-span-5 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removePublication(index)}
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
              onClick={addPublication}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Add Publication
            </button>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}

export default Publications; // Export the Publications component

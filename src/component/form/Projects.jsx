import { useState, useEffect } from "react"; // Import useState and useEffect from React

const FORM_DATA_KEY = "cvCreatorFormData";

function Projects({ setFormData }) {
  // Load projects from localStorage if available
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(FORM_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return (
          parsed.projects || [
            {
              title: "",
              description: "",
              tools: "",
              link: "",
            },
          ]
        );
      }
    } catch {}
    return [
      {
        title: "",
        description: "",
        tools: "",
        link: "",
      },
    ];
  });

  // Handle input changes for each project entry
  const handleChange = (index, e) => {
    const { name, value } = e.target; // Get field name and value
    const updated = [...projects]; // Copy projects array
    updated[index][name] = value; // Update the changed field
    setProjects(updated); // Update state
    setFormData((prev) => ({
      ...prev,
      projects: updated,
    }));
  };

  // Add a new project entry
  const addProject = () => {
    const updated = [
      ...projects,
      {
        title: "",
        description: "",
        tools: "",
        link: "",
      },
    ];
    setProjects(updated);
    setFormData((prev) => ({
      ...prev,
      projects: updated,
    }));
  };

  // Remove a project entry by index
  const removeProject = (index) => {
    if (projects.length === 1) return; // Prevent removing the last entry
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    setFormData((prev) => ({
      ...prev,
      projects: updated,
    }));
  };

  // Keep localStorage in sync if projects changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, projects }));
    // Also update localStorage directly for immediate persistence
    const saved = localStorage.getItem(FORM_DATA_KEY);
    let merged = {};
    try {
      merged = saved ? JSON.parse(saved) : {};
    } catch {}
    merged.projects = projects;
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(merged));
  }, [projects, setFormData]);

  return (
    <>
      <div className="form-container">
        {projects.map((proj, index) => (
          <>
            <div className="md:col-span-2">
              <label htmlFor={`title-${index}`}>Project Title</label>
              <input
                type="text"
                name="title"
                id={`title-${index}`}
                className="input-field"
                placeholder="Project Title"
                required
                value={proj.title}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-3">
              <label htmlFor={`tools-${index}`}>Tools/Technologies Used</label>
              <input
                type="text"
                name="tools"
                id={`tools-${index}`}
                className="input-field"
                placeholder="Tools/Technologies Used"
                required
                value={proj.tools}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-5">
              <label htmlFor={`description-${index}`}>
                Description (1–2 lines)
              </label>
              <textarea
                name="description"
                id={`description-${index}`}
                className="input-field resize-none"
                placeholder="Description (1–2 lines)"
                rows={2}
                required
                value={proj.description}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-5">
              <label htmlFor={`link-${index}`}>
                GitHub Link or Demo URL (optional)
              </label>
              <input
                type="url"
                name="link"
                id={`link-${index}`}
                className="input-field"
                placeholder="GitHub Link or Demo URL (optional)"
                value={proj.link}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            {projects.length > 1 && (
              <>
                <div className="md:col-span-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
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
            onClick={addProject}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Add Project
          </button>
        </div>
      </div>
    </>
  );
}

export default Projects; // Export the Projects component

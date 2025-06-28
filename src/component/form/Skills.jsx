import { useState, useEffect } from "react"; // Import useState and useEffect from React

const FORM_DATA_KEY = "cvCreatorFormData";

function Skills({ setFormData }) {
  // Load skills from localStorage if available
  const [skills, setSkills] = useState(() => {
    try {
      const saved = localStorage.getItem(FORM_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return (
          parsed.skills || {
            technical: [""],
            soft: [""],
            tools: [""],
          }
        );
      }
    } catch {}
    return {
      technical: [""],
      soft: [""],
      tools: [""],
    };
  });

  // Handle input changes for each skill category
  const handleChange = (category, index, value) => {
    const updated = { ...skills };
    updated[category][index] = value;
    setSkills(updated);
    setFormData((prev) => ({
      ...prev,
      skills: updated,
    }));
  };

  // Add a new skill input to a category
  const addSkill = (category) => {
    const updated = { ...skills };
    updated[category].push("");
    setSkills(updated);
    setFormData((prev) => ({
      ...prev,
      skills: updated,
    }));
  };

  // Remove a skill input from a category
  const removeSkill = (category, index) => {
    if (skills[category].length === 1) return; // Prevent removing the last entry
    const updated = { ...skills };
    updated[category] = updated[category].filter((_, i) => i !== index);
    setSkills(updated);
    setFormData((prev) => ({
      ...prev,
      skills: updated,
    }));
  };

  // Keep localStorage in sync if skills changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, skills }));
    // Also update localStorage directly for immediate persistence
    const saved = localStorage.getItem(FORM_DATA_KEY);
    let merged = {};
    try {
      merged = saved ? JSON.parse(saved) : {};
    } catch {}
    merged.skills = skills;
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(merged));
  }, [skills, setFormData]);

  return (
    <>
      <div className="form-container">
        {/* Technical Skills */}
        <div className="md:col-span-5">
          <label className="">
            Technical Skills (e.g., Python, React, SQL)
          </label>
          {skills.technical.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleChange("technical", index, e.target.value)
                }
                className="input-field flex-1"
                placeholder="Technical Skill"
                required
              />
              {skills.technical.length > 1 && (
                <button
                  type="button"
                  className="text-red-500 text-xs"
                  onClick={() => removeSkill("technical", index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-blue-500 text-xs"
            onClick={() => addSkill("technical")}
          >
            + Add Technical Skill
          </button>
        </div>
        {/* Soft Skills */}
        <div className="md:col-span-5">
          <label className="">
            Soft Skills (e.g., Communication, Teamwork)
          </label>
          {skills.soft.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleChange("soft", index, e.target.value)}
                className="input-field flex-1"
                placeholder="Soft Skill"
                required
              />
              {skills.soft.length > 1 && (
                <button
                  type="button"
                  className="text-red-500 text-xs"
                  onClick={() => removeSkill("soft", index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-blue-500 text-xs"
            onClick={() => addSkill("soft")}
          >
            + Add Soft Skill
          </button>
        </div>
        {/* Tools/Platforms */}
        <div className="md:col-span-5">
          <label className="">Tools/Platforms (e.g., Figma, Git, Docker)</label>
          {skills.tools.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleChange("tools", index, e.target.value)}
                className="input-field flex-1"
                placeholder="Tool or Platform"
                required
              />
              {skills.tools.length > 1 && (
                <button
                  type="button"
                  className="text-red-500 text-xs"
                  onClick={() => removeSkill("tools", index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-blue-500 text-xs"
            onClick={() => addSkill("tools")}
          >
            + Add Tool/Platform
          </button>
        </div>
      </div>
    </>
  );
}

export default Skills; // Export the Skills component

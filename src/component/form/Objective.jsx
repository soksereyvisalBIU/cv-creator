import { useState, useEffect } from "react";

const FORM_DATA_KEY = "cvCreatorFormData";

function Objective({ setFormData }) {
  // Load objective from localStorage if available
  const [objective, setObjective] = useState(() => {
    try {
      const saved = localStorage.getItem(FORM_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.objective || "";
      }
    } catch {}
    return "";
  });

  // Keep localStorage in sync if objective changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, objective }));
    // Also update localStorage directly for immediate persistence
    const saved = localStorage.getItem(FORM_DATA_KEY);
    let merged = {};
    try {
      merged = saved ? JSON.parse(saved) : {};
    } catch {}
    merged.objective = objective;
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(merged));
  }, [objective, setFormData]);

  return (
    <form className="bg-slate-800 p-5 rounded-lg shadow-md">
      <h3 className="text-white font-bold text-xl text-center pb-5">
        Objective / Summary
      </h3>
      <div className="mb-6">
        <textarea
          name="objective"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          className="input resize-none w-full"
          placeholder="Write your career objective or summary here..."
          rows={4}
          required
        />
      </div>
    </form>
  );
}

export default Objective;

import { useState, useEffect } from "react"; // Import useState and useEffect from React

const FORM_DATA_KEY = "cvCreatorFormData";

function Volunteer({ setFormData }) {
  // Load volunteers from localStorage if available
  const [volunteers, setVolunteers] = useState(() => {
    try {
      const saved = localStorage.getItem(FORM_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return (
          parsed.volunteers || [
            {
              role: "",
              organization: "",
              dates: "",
              contributions: [""],
            },
          ]
        );
      }
    } catch {}
    return [
      {
        role: "",
        organization: "",
        dates: "",
        contributions: [""],
      },
    ];
  });

  // Handle input changes for each volunteer entry (except array fields)
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...volunteers];
    updated[index][name] = value;
    setVolunteers(updated);
    setFormData((prev) => ({
      ...prev,
      volunteers: updated,
    }));
  };

  // Handle changes for array fields (contributions)
  const handleArrayChange = (index, arrIndex, value) => {
    const updated = [...volunteers];
    updated[index].contributions[arrIndex] = value;
    setVolunteers(updated);
    setFormData((prev) => ({
      ...prev,
      volunteers: updated,
    }));
  };

  // Add a new volunteer entry
  const addVolunteer = () => {
    const updated = [
      ...volunteers,
      {
        role: "",
        organization: "",
        dates: "",
        contributions: [""],
      },
    ];
    setVolunteers(updated);
    setFormData((prev) => ({
      ...prev,
      volunteers: updated,
    }));
  };

  // Remove a volunteer entry by index
  const removeVolunteer = (index) => {
    if (volunteers.length === 1) return;
    const updated = volunteers.filter((_, i) => i !== index);
    setVolunteers(updated);
    setFormData((prev) => ({
      ...prev,
      volunteers: updated,
    }));
  };

  // Add a new bullet point to contributions
  const addContribution = (index) => {
    const updated = [...volunteers];
    updated[index].contributions.push("");
    setVolunteers(updated);
    setFormData((prev) => ({
      ...prev,
      volunteers: updated,
    }));
  };

  // Remove a bullet point from contributions
  const removeContribution = (index, arrIndex) => {
    const updated = [...volunteers];
    if (updated[index].contributions.length === 1) return;
    updated[index].contributions.splice(arrIndex, 1);
    setVolunteers(updated);
    setFormData((prev) => ({
      ...prev,
      volunteers: updated,
    }));
  };

  // Keep localStorage in sync if volunteers changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, volunteers }));
    // Also update localStorage directly for immediate persistence
    const saved = localStorage.getItem(FORM_DATA_KEY);
    let merged = {};
    try {
      merged = saved ? JSON.parse(saved) : {};
    } catch {}
    merged.volunteers = volunteers;
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(merged));
  }, [volunteers, setFormData]);

  return (
    <>
      {/* <div className="bg-slate-800 p-5 rounded-lg shadow-md">
        <h3 className="text-white font-bold text-xl text-center pb-5">
          Volunteer Experience
        </h3> */}
      {/* Form container with styling */}
      <div className="form-container">
        {volunteers.map((vol, index) => (
          <>
            <div className="md:col-span-2">
              <label htmlFor={`role-${index}`}>Role</label>
              <input
                type="text"
                name="role"
                id={`role-${index}`}
                className="input-field"
                placeholder="Role"
                required
                value={vol.role}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-3">
              <label htmlFor={`organization-${index}`}>Organization</label>
              <input
                type="text"
                name="organization"
                id={`organization-${index}`}
                className="input-field"
                placeholder="Organization"
                required
                value={vol.organization}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={`dates-${index}`}>Dates</label>
              <input
                type="text"
                name="dates"
                id={`dates-${index}`}
                className="input-field"
                placeholder="Dates"
                required
                value={vol.dates}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="md:col-span-5 mb-2">
              <label className="">Key Contributions</label>
              {vol.contributions.map((item, arrIndex) => (
                <div key={arrIndex} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleArrayChange(index, arrIndex, e.target.value)
                    }
                    className="input-field flex-1"
                    placeholder="Contribution"
                    required
                  />
                  {vol.contributions.length > 1 && (
                    <button
                      type="button"
                      className="text-red-500 text-xs"
                      onClick={() => removeContribution(index, arrIndex)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="text-blue-500 text-xs"
                onClick={() => addContribution(index)}
              >
                + Add Contribution
              </button>
            </div>
            {volunteers.length > 1 && (
              <>
                <div className="md:col-span-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeVolunteer(index)}
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
            onClick={addVolunteer}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Add Volunteer Experience
          </button>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Volunteer; // Export the Volunteer component

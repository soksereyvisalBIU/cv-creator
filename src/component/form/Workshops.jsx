import { useState, useEffect } from "react"; // Import useState and useEffect from React

const FORM_DATA_KEY = "cvCreatorFormData";

function Workshops({ setFormData }) {
  // Load workshops from localStorage if available
  const [workshops, setWorkshops] = useState(() => {
    try {
      const saved = localStorage.getItem(FORM_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return (
          parsed.workshops || [
            {
              event: "",
              role: "",
              date: "",
              location: "",
            },
          ]
        );
      }
    } catch {}
    return [
      {
        event: "",
        role: "",
        date: "",
        location: "",
      },
    ];
  });

  // Handle input changes for each workshop entry
  const handleChange = (index, e) => {
    const { name, value } = e.target; // Get field name and value
    const updated = [...workshops]; // Copy workshops array
    updated[index][name] = value; // Update the changed field
    setWorkshops(updated); // Update state

    // Update parent formData with new workshop data
    setFormData((prev) => ({
      ...prev, // Preserve other form data
      workshops: updated, // Update workshop section
    }));
  };

  // Add a new workshop entry
  const addWorkshop = () => {
    const updated = [
      ...workshops, // Keep existing entries
      {
        event: "",
        role: "",
        date: "",
        location: "",
      },
    ];
    setWorkshops(updated); // Update state

    // Update parent formData after adding
    setFormData((prev) => ({
      ...prev, // Preserve other form data
      workshops: updated, // Update workshop section
    }));
  };

  // Remove a workshop entry by index
  const removeWorkshop = (index) => {
    if (workshops.length === 1) return; // Prevent removing the last entry
    const updated = workshops.filter((_, i) => i !== index); // Remove selected entry
    setWorkshops(updated); // Update state

    // Update parent formData after removing
    setFormData((prev) => ({
      ...prev, // Preserve other form data
      workshops: updated, // Update workshop section
    }));
  };

  // Keep localStorage in sync if workshops changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, workshops }));
    // Also update localStorage directly for immediate persistence
    const saved = localStorage.getItem(FORM_DATA_KEY);
    let merged = {};
    try {
      merged = saved ? JSON.parse(saved) : {};
    } catch {}
    merged.workshops = workshops;
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(merged));
  }, [workshops, setFormData]);

  return (
    <div className="form-container">
      {workshops.map((ws, index) => (
        <>
          <div className="md:col-span-2">
            <label htmlFor={`event-${index}`}>Event Name</label>
            <input
              type="text"
              name="event"
              id={`event-${index}`}
              className="input-field"
              placeholder="Event Name"
              required
              value={ws.event}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          <div className="md:col-span-3">
            <label htmlFor={`role-${index}`}>Role</label>
            <select
              name="role"
              id={`role-${index}`}
              className="input-field"
              required
              value={ws.role}
              onChange={(e) => handleChange(index, e)}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Speaker">Speaker</option>
              <option value="Attendee">Attendee</option>
              <option value="Organizer">Organizer</option>
            </select>
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
              value={ws.date}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          <div className="md:col-span-3">
            <label htmlFor={`location-${index}`}>Location</label>
            <input
              type="text"
              name="location"
              id={`location-${index}`}
              className="input-field"
              placeholder="Location"
              required
              value={ws.location}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          {workshops.length > 1 && (
            <>
              <div className="md:col-span-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeWorkshop(index)}
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
          onClick={addWorkshop}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Add Workshop
        </button>
      </div>
    </div>
  );
}

export default Workshops; // Export the Workshops component

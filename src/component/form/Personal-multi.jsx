import { useState } from "react"; // Import useState hook from React

function Personal({ setFormData }) { // Personal form component receives setFormData prop
  // Start with one personal entry by default
  const [personals, setPersonals] = useState([
    {
      firstname: "", // User's first name
      lastname: "", // User's last name
      professionalTitle: "", // User's professional title
      phonenumber: "", // User's phone number
      email: "", // User's email address
      linkedin: "", // User's LinkedIn profile URL
      portfolio: "", // User's portfolio or GitHub URL
      address: "", // User's address
      professionalSummary: "", // User's professional summary
    },
  ]);

  // Handle input changes for each personal entry
  const handleChange = (index, e) => {
    const { name, value } = e.target; // Get field name and value
    const updated = [...personals]; // Copy personals array
    updated[index][name] = value; // Update the changed field
    setPersonals(updated); // Update state

    setFormData((prev) => ({
      ...prev, // Preserve other form data
      personals: updated, // Update personals section
    }));
  };

  // Add a new personal entry
  const addPersonal = () => {
    const updated = [
      ...personals, // Keep existing entries
      {
        firstname: "",
        lastname: "",
        professionalTitle: "",
        phonenumber: "",
        email: "",
        linkedin: "",
        portfolio: "",
        address: "",
        professionalSummary: "",
      },
    ];
    setPersonals(updated); // Update state
    setFormData((prev) => ({
      ...prev, // Preserve other form data
      personals: updated, // Update personals section
    }));
  };

  // Remove a personal entry by index
  const removePersonal = (index) => {
    if (personals.length === 1) return; // Prevent removing the last entry
    const updated = personals.filter((_, i) => i !== index); // Remove selected entry
    setPersonals(updated); // Update state
    setFormData({
      personal: {
        personals: updated, // Update personals section
      },
    });
  };

  return (
    <form className="bg-slate-800 p-5 rounded-lg shadow-md"> {/* Form container with styling */}
      {personals.map((personal, index) => (
        <div key={index} className="mb-6 border-b border-gray-600 pb-4"> {/* Personal entry section */}
          {/* First and Last Name fields */}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="firstname"
                id={`firstname-${index}`}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={personal.firstname}
                onChange={(e) => handleChange(index, e)}
              />
              <label
                htmlFor={`firstname-${index}`}
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="lastname"
                id={`lastname-${index}`}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={personal.lastname}
                onChange={(e) => handleChange(index, e)}
              />
              <label
                htmlFor={`lastname-${index}`}
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last Name
              </label>
            </div>
          </div>
          {/* Professional Title field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="professionalTitle"
              id={`professionalTitle-${index}`}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={personal.professionalTitle}
              onChange={(e) => handleChange(index, e)}
            />
            <label
              htmlFor={`professionalTitle-${index}`}
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Professional Title
            </label>
          </div>
          {/* Phone and Email fields */}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                name="phonenumber"
                id={`phonenumber-${index}`}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={personal.phonenumber}
                onChange={(e) => handleChange(index, e)}
              />
              <label
                htmlFor={`phonenumber-${index}`}
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone Number
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id={`email-${index}`}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={personal.email}
                onChange={(e) => handleChange(index, e)}
              />
              <label
                htmlFor={`email-${index}`}
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email Address
              </label>
            </div>
          </div>
          {/* LinkedIn and Portfolio fields */}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="url"
                name="linkedin"
                id={`linkedin-${index}`}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={personal.linkedin}
                onChange={(e) => handleChange(index, e)}
              />
              <label
                htmlFor={`linkedin-${index}`}
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                LinkedIn Profile (optional)
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="url"
                name="portfolio"
                id={`portfolio-${index}`}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={personal.portfolio}
                onChange={(e) => handleChange(index, e)}
              />
              <label
                htmlFor={`portfolio-${index}`}
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                GitHub / Portfolio Website (optional)
              </label>
            </div>
          </div>
          {/* Address field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="address"
              id={`address-${index}`}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={personal.address}
              onChange={(e) => handleChange(index, e)}
            />
            <label
              htmlFor={`address-${index}`}
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address (City/Country, optional)
            </label>
          </div>
          {/* Professional Summary field */}
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              name="professionalSummary"
              id={`professionalSummary-${index}`}
              rows={4}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none"
              placeholder=" "
              required
              value={personal.professionalSummary}
              onChange={(e) => handleChange(index, e)}
            />
            <label
              htmlFor={`professionalSummary-${index}`}
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Professional Summary / Objective (2–4 lines)
            </label>
          </div>
          {/* Remove button for multiple entries */}
          {personals.length > 1 && (
            <button
              type="button"
              onClick={() => removePersonal(index)}
              className="text-red-500 hover:text-red-700 text-xs mb-2"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      {/* Add and Submit buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={addPersonal}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Add Personal
        </button>
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default Personal; // Export the Personal component

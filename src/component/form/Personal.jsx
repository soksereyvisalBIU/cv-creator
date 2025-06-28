import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage"; // Utility function below
import { Button } from "../../component/ui/Button";

const FORM_DATA_KEY = "cvCreatorFormData";

function Personal({ setFormData }) {
  // Load personal data from localStorage if available
  const [personal, setPersonal] = useState(() => {
    try {
      const saved = localStorage.getItem(FORM_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return (
          parsed.personal || {
            firstname: "",
            lastname: "",
            professionalTitle: "",
            phonenumber: "",
            email: "",
            linkedin: "",
            portfolio: "",
            address: "",
            professionalSummary: "",
            profilePhoto: "",
          }
        );
      }
    } catch {}
    return {
      firstname: "",
      lastname: "",
      professionalTitle: "",
      phonenumber: "",
      email: "",
      linkedin: "",
      portfolio: "",
      address: "",
      professionalSummary: "",
      profilePhoto: "",
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...personal, [name]: value };
    setPersonal(updated);
    setFormData((prev) => ({
      ...prev,
      personal: updated,
    }));
  };

  const [image, setImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // const showCroppedImage = useCallback(async () => {
  //   const cropped = await getCroppedImg(image, croppedAreaPixels);
  //   setCroppedImage(cropped);
  // }, [image, croppedAreaPixels]);
  const showCroppedImage = useCallback(async () => {
    const cropped = await getCroppedImg(image, croppedAreaPixels);
    setCroppedImage(cropped);

    const updated = { ...personal, profilePhoto: cropped };
    setPersonal(updated);
    setFormData((prev) => ({
      ...prev,
      personal: updated,
    }));
  }, [image, croppedAreaPixels, personal, setFormData]);

  // Keep localStorage in sync if personal changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, personal }));
    // Also update localStorage directly for immediate persistence
    const saved = localStorage.getItem(FORM_DATA_KEY);
    let merged = {};
    try {
      merged = saved ? JSON.parse(saved) : {};
    } catch {}
    merged.personal = personal;
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(merged));
  }, [personal, setFormData]);

  return (
    <>
      <div className="form-container">
        <div className="md:col-span-2 md:row-span-3">
          <div className="text-slate-900 h-full relative flex flex-col justify-center items-center">
            {!croppedImage && image && (
              <div className="relative w-64 h-64 flex flex-col justify-center items-center">
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  <Button
                    className="text-xl bg-green-500 hover:bg-green-600"
                    onClick={showCroppedImage}
                  >
                    <span role="img" aria-label="confirm">
                      🗸
                    </span>
                  </Button>
                  <Button
                    className="text-xl bg-red-600 hover:bg-red-700"
                    variant="secondary"
                    onClick={() => setImage(null)}
                  >
                    X
                  </Button>
                </div>
              </div>
            )}

            {croppedImage && (
              <div className="mb-8">
                <img
                  src={croppedImage}
                  alt="Cropped"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
            )}
            {!croppedImage && !image && (
              <label
                htmlFor="file-upload"
                className="cursor-pointer w-full flex flex-col items-center"
              >
                <div className="mt-1 h-full hover:bg-slate-100 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <span className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 px-2">
                        Upload a file
                        <input
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          id="file-upload"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </span>
                      <span className="pl-1">or drag and drop</span>
                    </div>
                    <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </label>
            )}
          </div>
        </div>

        <div className="md:col-span-3">
          <label htmlFor="full_name">First Name</label>
          <input
            type="text"
            name="firstname"
            className="input-field"
            placeholder=" "
            required
            value={personal.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-3">
          <label htmlFor="full_name">Middle Name</label>
          <input
            type="text"
            name="lastname"
            className="input-field"
            placeholder=" "
            required
            value={personal.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-3">
          <label htmlFor="full_name">Last Name</label>
          <input
            type="text"
            name="lastname"
            className="input-field"
            placeholder=" "
            required
            value={personal.lastname}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-3">
          <label htmlFor="email">Professional Title</label>
          <input
            type="text"
            name="professionalTitle"
            className="input-field"
            placeholder=" "
            required
            value={personal.professionalTitle}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-3">
          <label htmlFor="address">Phone Number</label>
          <input
            type="tel"
            name="phonenumber"
            className="input-field"
            placeholder=" "
            required
            value={personal.phonenumber}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="city">Email Address</label>
          <input
            type="email"
            name="email"
            className="input-field"
            placeholder=" "
            required
            value={personal.email}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="country">LinkedIn Profile (optional)</label>
          <div className="h-10 bg-gray-50 flex rounded items-center mt-1">
            <input
              type="url"
              name="linkedin"
              className="input-field"
              placeholder=" "
              value={personal.linkedin}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* <div className="md:col-span-2">
          <label htmlFor="state">State / province</label>
          <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
            <input
              name="state"
              id="state"
              placeholder="State"
              className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
              value=""
            />
            <button
              tabIndex="-1"
              className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
            >
              <svg
                className="w-4 h-4 mx-2 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <button
              tabIndex="-1"
              htmlFor="show_more"
              className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
            >
              <svg
                className="w-4 h-4 mx-2 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          </div>
        </div> */}

        <div className="md:col-span-1">
          <label htmlFor="zipcode">GitHub / Portfolio Website</label>
          <input
            type="url"
            name="portfolio"
            className="input-field"
            placeholder=" "
            value={personal.portfolio}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}

export default Personal;

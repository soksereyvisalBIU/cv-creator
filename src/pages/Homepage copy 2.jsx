import React, { useState } from "react";
import Template1 from "../templates/Template1";
import Template1Print from "../templates/Template1Print";
import Form from "../pages/Form";
import { downloadTemplateAsPDF } from "../utils/pdfExport";

function Homepage() {
  const [formData, setFormData] = useState();
  const [mode, setMode] = useState("preview"); // or "print"

  const handleExport = async () => {
    setMode("print");

    // Wait for DOM update
    setTimeout(async () => {
      await downloadTemplateAsPDF("print-area", "resume.pdf");
      setMode("preview");
    }, 300); // slight delay to allow layout/render
  };

  // console.log("formData", formData);
  return (
    <div>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className=" container mx-auto">
          {/* <div className="container max-w-screen-lg mx-auto"> */}
          <div>
            {/* <h2 className="font-semibold text-xl text-gray-600">
              Responsive Form
            </h2>
            <p className="text-gray-500 mb-6">
              Form is mobile responsive. Give it a try.
            </p> */}

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-8 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600 ">
                  <p className="font-medium text-lg mb-4">Preview</p>
                  {/* <p>Please fill out all the fields.</p> */}
                  <div className="shadow-lg rounded-lg p-4 mb-6 bg-slate-400 sticky top-0">
                    {/* <Template1 {...formData} /> */}

                    {mode === "preview" && (
                      <>
                        <Template1 {...formData} />
                        <button
                          onClick={handleExport}
                          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                        >
                          Export PDF
                        </button>
                      </>
                    )}

                    {mode === "print" && (
                      <div
                        id="print-area"
                        className="w-[794px] h-[1123px] mx-auto bg-white"
                      >
                        <Template1Print {...formData} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2 text-gray-600 overflow-hidden px-2 pb-2">
                  <p className="font-medium text-lg mb-4  ">Form</p>
                  <Form setFormData={setFormData} />
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://www.buymeacoffee.com/dgauderman"
            target="_blank"
            className="md:absolute bottom-0 right-0 p-4 float-right"
          >
            {/* <img src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg" alt="Buy Me A Coffee" className="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"> */}
          </a>
        </div>
      </div>

      {/* Uncomment below to see the print version */}
      {/* <div className="hidden">
        <Template1Print {...formData} />
      </div> */}

      {/* <div className="flex container mx-auto  gap-4 p-8">
        <div className="w-[50%] px-10">
          <Form setFormData={setFormData} />
        </div>
        <div className="w-[50%] px-10">
          <Template1 {...formData} />
        </div>
      </div> */}
    </div>
  );
}

export default Homepage;

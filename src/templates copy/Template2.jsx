import React, { useEffect, useCallback } from "react";
import "../templates/style/template.css";

function Template() {
  // Log and scale the A4 preview paper responsively
  const paperPreview = useCallback(() => {
    const template = document.getElementById("previewContainer");
    const paper = document.getElementById("A4paper");
    const originalWidth = 210; // A4 width in mm
    if (!template || !paper) return;

    const widthPx = template.offsetWidth;
    const widthMm = (widthPx * 25.4) / 96;
    const scaleSize = widthMm / originalWidth;

    paper.style.transform = `scale(${scaleSize})`;
    paper.style.transformOrigin = "top left";
  }, []);

  useEffect(() => {
    paperPreview(); // Initial call
    window.addEventListener("resize", paperPreview);
    return () => window.removeEventListener("resize", paperPreview);
  }, [paperPreview]);

  return (
    <div className="container mx-auto grid grid-cols-2 items-center min-h-screen">
      {/* A4 preview section */}
      <div
        id="previewContainer"
        className="previewContainer relative w-full max-w-[500px] aspect-[210/297] overflow-hidden mx-auto"
      >
        {/* The A4Page is styled to look like an A4 paper and is absolutely positioned */}
        <div
          id="A4paper"
          className="A4Page origin-top-left absolute top-0 left-0 flex text-[11pt] leading-[1.5]"
        >
          {/* left side  */}
          <div className="w-2/5 bg-blue-900 py-[20mm] text-gray-100">
            <div className="flex justify-center items-center">
              <img
                className="rounded-full w-1/2"
                src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                alt="Logo"
              />
            </div>
            <div className="pt-10 flex flex-col gap-5 px-[15mm]">
              <div>
                <h1 className="uppercase text-[14pt] font-bold">Contact</h1>
                <hr className="border-2" />
                <div>
                  <ul>
                    <li>+855 77 388 785</li>
                    <li>+855 77 388 785</li>
                    <li>+855 77 388 785</li>
                    <li>+855 77 388 785</li>
                  </ul>
                </div>
              </div>
              <div>
                <h1 className="uppercase text-[14pt] font-bold pt-5">Education</h1>
                <hr className="border-2" />
                <div>
                  <ul>
                    <li>2020 - 2024</li>
                    <li>University of Example</li>
                    <li>Bachelor of Science in Computer Science</li>
                    <li>GPA: 3.8</li>
                  </ul>
                </div>
              </div>
              <div>
                <h1 className="uppercase text-[14pt] font-bold pt-5">Skills</h1>
                <hr className="border-2" />
                <div>
                  <ul>
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>Node.js</li>
                    <li>CSS</li>
                  </ul>
                </div>
              </div>
              <div>
                <h1 className="uppercase text-[14pt] font-bold pt-5">Experience</h1>
                <hr className="border-2" />
                <div>
                  <ul>
                    <li>2022 - Present: Frontend Developer at Example Corp</li>
                    <li>2021 - 2022: Intern at Example Inc.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h1 className="uppercase text-[14pt] font-bold pt-5">Languages</h1>
                <hr className="border-2" />
                <div>
                  <ul>
                    <li>English (Fluent)</li>
                    <li>Khmer (Native)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* right side  */}
          <div className="w-3/5">
            <div className="p-[15mm] ps-[10mm]">
              <div className="">
                <h1 className="text-[20pt] font-bold text-gray-800">John Doe</h1>
                <p className="text-lg text-gray-600">Full Stack Developer</p>
                <div className="border-4 border-blue-900 w-1/4 "></div>
              </div>
              <div className="flex flex-col gap-5 mt-10">
                <div>
                  <h2 className="uppercase font-bold text-[14pt]">Profile</h2>
                  <hr className="border-2" />
                  <p className="text-gray-700 pt-2">
                    A highly motivated and skilled full stack developer with a
                    passion for creating dynamic and responsive web
                    applications. Experienced in both frontend and backend
                    technologies.
                  </p>
                </div>
                <div>
                  <h2 className="uppercase font-bold text-[14pt]">Work Experience</h2>
                  <hr className="border-2" />
                  <div className="pt-2">
                    <ul className="list-disc list-inside border-s border-black ps-5">
                      <li className="">
                        <div>
                          <h3>Borcelle Student</h3>
                          <span>2030-present</span>
                        </div>
                        <p className="text-gray-600 italic">
                          Marketing Manager & Specialist
                        </p>
                      </li>
                      <li className="">
                        <div>
                          <h3>Borcelle Student</h3>
                          <span>2030-present</span>
                        </div>
                        <p className="text-gray-600 italic">
                          Marketing Manager & Specialist
                        </p>
                      </li>
                      <li className="">
                        <div>
                          <h3>Borcelle Student</h3>
                          <span>2030-present</span>
                        </div>
                        <p className="text-gray-600 italic">
                          Marketing Manager & Specialist
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h2 className="uppercase font-bold text-[14pt]">Reference</h2>
                  <hr className="border-2" />
                  <div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="">
                        <h3 className="font-bold">Jane Smith</h3>
                        <p className="text-gray-600">
                          Senior Developer at Example Corp
                        </p>
                        <p className="text-gray-500">
                          Email: soksereyivsal@gmail.com
                        </p>
                        <p className="text-gray-500">Phone: +855 77 388 785</p>
                      </div>
                      <div className="">
                        <h3 className="font-bold">Jane Smith</h3>
                        <p className="text-gray-600">
                          Senior Developer at Example Corp
                        </p>
                        <p className="text-gray-500">
                          Email: soksereyivsal@gmail.com
                        </p>
                        <p className="text-gray-500">Phone: +855 77 388 785</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <h1 className="text-[16pt]">Template Component</h1>
          <p className="text-[12pt]">This is a Template component.</p> */}
        </div>
      </div>

      {/* Form section */}
      <div>
        <form>
          <input type="text" className="border p-2" />
        </form>
      </div>
    </div>
  );
}

export default Template;

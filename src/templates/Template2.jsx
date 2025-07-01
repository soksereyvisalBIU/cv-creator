import React, { useEffect, useCallback } from "react";
import "../templates/style/template.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Template(props) {
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

  // console.log(props);

  return (
    <div>
      {/* A4 preview section */}
      <div
        id="previewContainer"
        className="previewContainer relative w-full aspect-[210/297] overflow-hidden mx-auto shadow-lg border border-gray-300"
      >
        {/* The A4Page is styled to look like an A4 paper and is absolutely positioned */}
        <div
          id="A4paper"
          className="A4Page bg-white origin-top-left absolute top-0 left-0 flex text-[11pt] leading-[1.5]"
        >
          {/* left side  */}
          <div className="w-2/5  py-[20mm] text-gray-100 relative">
            <div className="flex justify-center items-center relative bg-green-200">
              <img
                className="absolute top-[-10mm] z-10 rounded-full w-1/2 border-2 border-white"
                src={props.personal?.profilePhoto || "./logo192.png"}
                alt="Logo"
              />
            </div>
            <div className=" h-full p-[20pt] relative block">
              <div className="pt-[30mm]  py-10 rounded-2xl flex flex-col px-[5mm] bg-sky-900 h-full">
                <div>
                  <h1 className="uppercase text-[14pt] font-bold bg-slate-200 mx-[5pt] text-sky-900 text-center rounded-full">
                    Contact Me
                  </h1>
                  <div className="mt-2">
                    <ul>
                      <li>{props.personal?.phonenumber || "+123-456-789"}</li>
                      <li>
                        {props.personal?.email || "hello@reallygreatsite.com"}
                      </li>
                      <li>
                        {props.personal?.address ||
                          "123 Anywhere St., Any City"}
                      </li>
                      <li>
                        {props.personal?.portfolio || "www.reallygreatsite.com"}
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h1 className="uppercase text-[14pt] font-bold mt-5 bg-slate-200 mx-[5pt] text-sky-900 text-center rounded-full">
                    Reference
                  </h1>
                  <div className="flex flex-col gap-5 mt-2">
                    {props.references && props.references.length > 0 ? (
                      props.references.map((ref, idx) => (
                        <div key={idx}>
                          <h3 className="font-bold">{ref.name}</h3>
                          <p className="text-sm">
                            {ref.position} at {ref.company}
                          </p>
                          <p className="">{ref.email}</p>
                          <p className="">{ref.phone}</p>
                        </div>
                      ))
                    ) : (
                      <div>
                        <h3 className="font-bold text-base">Sok sereyvisal</h3>
                        <h4 className="text-sm">
                          BELTEI International University
                        </h4>
                        <ul className="text-xs">
                          <li>123-456-789</li>
                          <li>soksereyivsal@gmail.com</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h1 className="uppercase text-[14pt] font-bold mt-5 bg-slate-200 mx-[5pt] text-sky-900 text-center rounded-full">
                    Skills
                  </h1>

                  <div className="mt-2">
                    <ul className="list-disc ms-[10pt]">
                      {props.skills?.technical &&
                      props.skills.technical.length > 0 ? (
                        props.skills.technical.map((skill, idx) => (
                          <li key={"tech-" + idx}>{skill}</li>
                        ))
                      ) : (
                        <>
                          <li>JavaScript</li>
                          <li>React</li>
                          <li>Node.js</li>
                          <li>CSS</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
                <div>
                  <h1 className="uppercase text-[14pt] font-bold mt-5 bg-slate-200 mx-[5pt] text-sky-900 text-center rounded-full">
                    Languages
                  </h1>

                  <div className="mt-2">
                    <ul className="list-disc ms-[10pt]">
                      {props?.languages && props.languages.length > 0 ? (
                        props.languages.map((lang, idx) => (
                          <li key={"lang-" + idx}>
                            {lang.language}
                            {lang.proficiency ? ` (${lang.proficiency})` : ""}
                          </li>
                        ))
                      ) : (
                        <>
                          <li>Chinese (Fluent)</li>
                          <li>Thai (Fluent)</li>
                          <li>Khmer (Native)</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right side  */}
          <div className="w-3/5">
            <div className="p-[15mm] ps-[10mm]">
              <div className="">
                <h1 className="text-[24pt] font-bold text-gray-800 uppercase leading-[1]">
                  <span>
                    {props.personal?.firstname || "Sok"} <br />
                  </span>
                  <span className="text-blue-900 font-black">
                    {props.personal?.lastname || "visal"}
                  </span>
                </h1>
                <p className="mt-4 text-[14pt] text-gray-600">
                  Position Apply:{" "}
                  {props.personal?.professionalTitle || "Full Stack Developer"}
                </p>
              </div>
              <div className="flex flex-col gap-5 mt-5">
                <div>
                  <div className="flex items-center">
                    <h2 className="uppercase font-bold text-[14pt] text-center rounded-full text-white bg-blue-900 w-[40%] ml-[-16pt]">
                      About Me
                    </h2>
                  </div>
                  <p className="text-gray-700 pt-2">
                    {props.personal?.professionalSummary ||
                      `A highly motivated and skilled full stack developer with a passion for creating dynamic and responsive web applications. Experienced in both frontend and backend technologies.`}
                  </p>
                </div>
                <div>
                  <div className="flex items-center">
                    <h2 className="uppercase font-bold text-[14pt] text-center rounded-full text-white bg-blue-900 w-[40%] ml-[-16pt]">
                      Experience
                    </h2>
                  </div>
                  <div className="mt-2">
                    <div className="relative border-gray-700">
                      {props.experiences && props.experiences.length > 0 ? (
                        props.experiences.map((exp, index) => (
                          <div key={index} className="mb-4">
                            <div>
                              <div className="flex justify-between items-center">
                                <h3 className="font-black text-blue-900">
                                  BELTEI GROUP
                                </h3>
                                <time className="mb-1 text-[9pt] font-normal leading-none text-gray-500">
                                  2020 - Present
                                </time>
                              </div>
                              <p className="mb-1 text-sm font-normal leading-none ">
                                Frontend Developer
                              </p>
                              <p className="text-gray-600 text-sm">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Illo eum minima quibusdam
                                officiis, laudantium, iste vitae eaque
                                cupiditate magnam magni fuga ipsum quos culpa!
                                Quia aspernatur reiciendis ex sequi iure.
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <>
                          <div>
                            <div>
                              <div className="flex justify-between items-center">
                                <h3 className="font-black text-blue-900">
                                  BELTEI GROUP
                                </h3>
                                <time className="mb-1 text-[9pt] font-normal leading-none text-gray-500">
                                  2020 - Present
                                </time>
                              </div>
                              <p className="mb-1 text-gray-700 text-sm font-normal leading-none ">
                                Frontend Developer
                              </p>
                              <p className="text-gray-600 text-sm">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Illo eum minima quibusdam
                                officiis, laudantium, iste vitae eaque
                                cupiditate magnam magni fuga ipsum quos culpa!
                                Quia aspernatur reiciendis ex sequi iure.
                              </p>
                            </div>
                          </div>
                          {/* <li className="mb-4 ms-4">
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <div>
                              <div className="flex justify-between items-center">
                                <h3 className="font-bold">BELTEI GROUP</h3>
                                <time className="mb-1 text-[9pt] font-normal leading-none text-gray-500">
                                  2020 - Present
                                </time>
                              </div>
                              <p className="mb-1 text-sm font-normal leading-none text-gray-600">
                                Frontend Developer
                              </p>
                              <ul className="list-disc ms-[10pt] text-gray-600">
                                <li>
                                  Developed and maintained web applications
                                  using React and Node.js.
                                </li>
                                <li>
                                  Collaborated with designers to implement
                                  responsive UI/UX designs.
                                </li>
                                <li>
                                  Optimized application performance and ensured
                                  cross-browser compatibility.
                                </li>
                              </ul>
                            </div>
                          </li> */}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <h2 className="uppercase font-bold text-[14pt] text-center rounded-full text-white bg-blue-900 w-[40%] ml-[-16pt]">
                      Education
                    </h2>
                  </div>
                  <div>
                    <div className="">
                      {props.educations && props.educations.length > 0 ? (
                        props.educations.map((edu, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center mb-4"
                          >
                            <div>
                              <p className="text-gray-700 font-bold">
                                {edu.institution}
                              </p>
                              <p className="text-gray-500">{edu.degree}</p>
                            </div>
                            <p className="text-gray-500">{edu.yearsAttended}</p>

                            {/* <h3 className="font-bold">{edu.yearsAttended}</h3>
                            <h3 className="font-bold">
                              {edu.institution} {edu.location}
                            </h3>
                            <ul className="list-disc ms-[10pt]">
                              <li>{edu.degree}</li>
                              {edu.gpaHonors && <li>{edu.gpaHonors}</li>}
                            </ul> */}
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <p className="text-gray-700 font-bold">
                                Beltei International University
                              </p>
                              <p className="text-gray-500">
                                Bachelor of Business Management
                              </p>
                            </div>
                            <p className="text-gray-500">2020 - 2024</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-gray-700 font-bold">
                                Beltei International University
                              </p>
                              <p className="text-gray-500">
                                Bachelor of Business Management
                              </p>
                            </div>
                            <p className="text-gray-500">2020 - 2024</p>
                          </div>
                          {/* <div>
                            <h3 className="font-bold">Jane Smith</h3>
                            <p className="text-gray-600">
                              Senior Developer at Example Corp
                            </p>
                            <p className="text-gray-500">
                              soksereyivsal@gmail.com
                            </p>
                            <p className="text-gray-500">+855 77 388 785</p>
                          </div> */}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {/* <div>
                  <div className="flex items-center">
                    <h2 className="uppercase font-bold text-[14pt] text-center rounded-full text-white bg-blue-900 w-[40%] ml-[-16pt]">
                      Reference
                    </h2>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      {props.references && props.references.length > 0 ? (
                        props.references.map((ref, idx) => (
                          <div key={idx}>
                            <h3 className="font-bold">{ref.name}</h3>
                            <p className="text-gray-600">
                              {ref.position} at {ref.company}
                            </p>
                            <p className="text-gray-500">{ref.email}</p>
                            <p className="text-gray-500">{ref.phone}</p>
                          </div>
                        ))
                      ) : (
                        <>
                          <div>
                            <h3 className="font-bold">Jane Smith</h3>
                            <p className="text-gray-600">
                              Senior Developer at Example Corp
                            </p>
                            <p className="text-gray-500">
                              soksereyivsal@gmail.com
                            </p>
                            <p className="text-gray-500">+855 77 388 785</p>
                          </div>
                          <div>
                            <h3 className="font-bold">Jane Smith</h3>
                            <p className="text-gray-600">
                              Senior Developer at Example Corp
                            </p>
                            <p className="text-gray-500">
                              soksereyivsal@gmail.com
                            </p>
                            <p className="text-gray-500">+855 77 388 785</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* <h1 className="text-[16pt]">Template Component</h1>
          <p className="text-[12pt]">This is a Template component.</p> */}
        </div>
      </div>
    </div>
  );
}

export default Template;

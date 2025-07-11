import React, { useEffect, useCallback } from "react";
import "../templates/style/template.css";

function Template1(props) {
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
          className="A4Page bg-white origin-top-left absolute top-0 left-0 flex text-[11pt] leading-[1.5] rier-prime-bold-italic"
        >
          {/* left side  */}
          <div className="w-2/5 py-[20mm] bg-gray-100 text-gray-100 relative">
            <div className="flex flex-col text-slate-800 justify-center items-center z-10 relative">
              <img
                className="rounded-full w-1/2 border-2 border-white z-20"
                src={props.personal?.profilePhoto || "./logo192.png"}
                alt="Logo"
              />

              <div className="text-center text-sky-500  mt-5 font-sans">
                <div>
                  <h1 className="text-[16pt] font-bold">
                    {props.personal?.name || "PICH"}
                  </h1>
                  <h1 className="text-[16pt] font-bold mt-[-6pt]">
                    {props.personal?.name || "SOPHEA"}
                  </h1>
                  <h3 className="text-[12pt] font-normal text-stone-600">
                    {props.personal?.title || "Web Developer"}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-sky-500 absolute w-[500px] aspect-square rotate-45 top-[-270px] left-[-270px] zIndex-1"></div>

            <div className="pt-10 flex flex-col px-[15mm] text-slate-700">
              <div>
                <h1 className="uppercase text-[14pt] font-bold">Contact</h1>
                <hr className="border-1 mt-[5pt] border-sky-700" />
                <div className="mt-2">
                  <ul>
                    <li>{props.personal?.phonenumber || "+123-456-789"}</li>
                    <li>
                      {props.personal?.email || "hello@reallygreatsite.com"}
                    </li>
                    <li>
                      {props.personal?.address || "123 Anywhere St., Any City"}
                    </li>
                    <li>
                      {props.personal?.portfolio || "www.reallygreatsite.com"}
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h1 className="uppercase text-[14pt] font-bold pt-5">
                  About Me
                </h1>
                <hr className="border-1 mt-[5pt] border-sky-700" />
                <div className="mt-2">
                  <p className="text-gray-700 text-justify">
                    {props.personal?.aboutMe ||
                      "A passionate web developer with a knack for creating dynamic and responsive web applications. Always eager to learn new technologies and improve skills."}
                  </p>
                </div>
              </div>

              <div>
                <h1 className="uppercase text-[14pt] font-bold pt-5">Skills</h1>
                <hr className="border-1 mt-[5pt] border-sky-700" />
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
                <h1 className="uppercase text-[14pt] font-bold pt-5">
                  Languages
                </h1>
                <hr className="border-1 mt-[5pt] border-sky-700" />
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

          {/* right side  */}
          <div className="w-3/5">
            <div className="p-[15mm] ps-[10mm]">
              <div className="flex flex-col gap-5 mt-10">
                <div>
                  <h2 className="uppercase font-bold text-[14pt]">Education</h2>
                  <hr className="border-1 mt-[5pt] border-sky-700" />
                  <div className="mt-2">
                    <ol className="relative border-s border-gray-700">
                      {props.experiences && props.experiences.length > 0 ? (
                        props.experiences.map((exp, index) => (
                          <li className="mb-4 ms-4" key={index}>
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <div>
                              <div className="flex justify-between items-center">
                                <h3 className="font-bold">
                                  {exp.company || "BELTEI GROUP"}
                                </h3>
                                <time className="mb-1 text-[9pt] font-normal leading-none text-gray-500">
                                  {exp.years || "2020 - Present"}
                                </time>
                              </div>
                              <p className="mb-1 text-sm font-normal leading-none text-gray-600">
                                {exp.title || "Frontend Developer"}
                              </p>
                              <ul className="list-disc ms-[10pt] text-gray-600">
                                {exp.responsibilities &&
                                exp.responsibilities.length > 0 ? (
                                  exp.responsibilities.map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))
                                ) : (
                                  <>
                                    <li>
                                      Developed and maintained web applications
                                      using React and Node.js.
                                    </li>
                                    <li>
                                      Collaborated with designers to implement
                                      responsive UI/UX designs.
                                    </li>
                                    <li>
                                      Optimized application performance and
                                      ensured cross-browser compatibility.
                                    </li>
                                  </>
                                )}
                              </ul>
                            </div>
                          </li>
                        ))
                      ) : (
                        <>
                          <li className="mb-4 ms-4">
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
                          </li>
                        </>
                      )}
                    </ol>
                  </div>
                </div>
                <div>
                  <h2 className="uppercase font-bold text-[14pt]">
                    Work Experience
                  </h2>
                  <hr className="border-1 mt-[5pt] border-sky-700" />
                  <div className="mt-2">
                    <ol className="relative border-s border-gray-700">
                      {props.experiences && props.experiences.length > 0 ? (
                        props.experiences.map((exp, index) => (
                          <li className="mb-4 ms-4" key={index}>
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <div>
                              <div className="flex justify-between items-center">
                                <h3 className="font-bold">
                                  {exp.company || "BELTEI GROUP"}
                                </h3>
                                <time className="mb-1 text-[9pt] font-normal leading-none text-gray-500">
                                  {exp.years || "2020 - Present"}
                                </time>
                              </div>
                              <p className="mb-1 text-sm font-normal leading-none text-gray-600">
                                {exp.title || "Frontend Developer"}
                              </p>
                              <ul className="list-disc ms-[10pt] text-gray-600">
                                {exp.responsibilities &&
                                exp.responsibilities.length > 0 ? (
                                  exp.responsibilities.map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))
                                ) : (
                                  <>
                                    <li>
                                      Developed and maintained web applications
                                      using React and Node.js.
                                    </li>
                                    <li>
                                      Collaborated with designers to implement
                                      responsive UI/UX designs.
                                    </li>
                                    <li>
                                      Optimized application performance and
                                      ensured cross-browser compatibility.
                                    </li>
                                  </>
                                )}
                              </ul>
                            </div>
                          </li>
                        ))
                      ) : (
                        <>
                          <li className="mb-4 ms-4">
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
                          </li>
                        </>
                      )}
                    </ol>
                  </div>
                </div>
                <div>
                  <h2 className="uppercase font-bold text-[14pt]">Reference</h2>
                  <hr className="border-1 mt-[5pt] border-sky-700" />
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
                </div>
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

export default Template1;

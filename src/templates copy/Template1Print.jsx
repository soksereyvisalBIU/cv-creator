import React from "react";
import { useFlexFont } from "../included/useFlexFont";

function Template1(props) {
  // Generate font size map for pt5 to pt50
  const fontSizes = {};
  for (let i = 5; i <= 50; i++) {
    fontSizes[`pt${i}`] = { value: i, unit: "pt" };
  }
  // Add additional units and custom spacing
  const flexFontMap = {
    ...fontSizes,
    mm10: { value: 10, unit: "mm" },
    cm1: { value: 1, unit: "cm" },
    inch05: { value: 0.5, unit: "inch" },
    inch075: { value: 0.75, unit: "inch" },
    inch1: { value: 1, unit: "inch" },
    // Example for line spacing: fontSize 11pt, lineHeight 1.15
    flexLinespace: { fontSize: 11, linespace: 1.15 },
  };
  useFlexFont("templatePrint", flexFontMap);

  return (
    <>
      <div
        id="templatePrint"
        style={{
          width: "794px", // 210mm
          height: "1123px", // 297mm
        }}
        className="templatePrint flexFont-A4-pt11 flexLine-A4-pt21 relative aspect-[210/297] w-full max-w-5xl mx-auto bg-white flex flex-row"
      >
        {/* Left Column */}
        <div className="flexFont-A4-pt11 bg-blue-900 relative text-white flexPad-A4-pt12 w-2/5 items-center flexPadT-A4-inch075 flexPadB-A4-inch075 flexPadL-A4-inch05">
          <div className="flex justify-center">
            <img
              src={props.personal?.profilePhoto || "./logo192.png"}
              alt="Profile"
              className="w-[75%] rounded-full border border-white"
            />
          </div>
          <div className="flexPadT-A4-pt15">
            <h2 className="flexFont-A4-pt14 font-semibold">CONTACT</h2>
            <p>📞 {props.personal?.phonenumber || "+855 95 589 859"} </p>
            <p>📧 {props.personal?.email || "hello@reallygreatsite.com"} </p>
            <p>📍 {props.personal?.address || "123 Anywhere St., Any City"} </p>
            <p>🌐 {props.personal?.linkedin || "https://www.facebook.com"} </p>
          </div>
          <div className="flexPadT-A4-pt15">
            <h2 className="flexFont-A4-pt14 font-semibold">EDUCATION</h2>
            {props.educations?.map((edu, index) => (
              <div key={index}>
                <p className="font-bold">{edu.yearsAttended}</p>
                <p>
                  {edu.institution} {edu.location}
                </p>
                <p>{edu.degree}</p>
                <p>{edu.gpaHonors}</p>
              </div>
            ))}
          </div>
          <div className="flexPadT-A4-pt15">
            <h2 className="flexFont-A4-pt14 font-semibold">SKILLS</h2>
            <ul className="list-disc list-inside">
              {props.skills?.technical?.map((skill, idx) => (
                <li key={"tech-" + idx}>{skill}</li>
              ))}
              {props.skills?.soft?.map((skill, idx) => (
                <li key={"soft-" + idx}>{skill}</li>
              ))}
              {props.skills?.tools?.map((skill, idx) => (
                <li key={"tool-" + idx}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="flexPadT-A4-pt15">
            <h2 className="flexFont-A4-pt14 font-semibold">LANGUAGES</h2>
            <ul className="list-disc list-inside">
              {props.languages?.map((lang, idx) => (
                <li key={idx}>
                  {lang.language}{" "}
                  {lang.proficiency ? `(${lang.proficiency})` : ""}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Right Column */}
        <div className="flexPad-A4-pt12 w-3/5 flexPadT-A4-inch075 flexPadB-A4-inch075 flexPadR-A4-inch05">
          <div className="flexPadB-A4-pt15 flexPadT-A4-pt15">
            <h1 className="flexFont-A4-pt25 font-bold text-gray-800">
              {props.personal?.firstname?.toUpperCase() || "RICHARD"}{" "}
              {props.personal?.midlename || ""}{" "}
              <span className="text-blue-900">
                {props.personal?.lastname?.toUpperCase() || "SANCHEZ"}{" "}
              </span>
            </h1>
            <p className="flexFont-A4-pt12 text-gray-600">
              {props.personal?.professionalTitle || "MARKETING MANAGER"}{" "}
            </p>
          </div>
          <div className="flexPadT-A4-pt15">
            <h2 className="flexFont-A4-pt16 font-semibold text-blue-900 border-b ">
              PROFILE
            </h2>
            <p className="text-gray-700 ">
              {props.personal?.professionalSummary ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."}{" "}
            </p>
          </div>
          <div className="flexPadT-A4-pt15">
            <h2 className="flexFont-A4-pt16 font-semibold text-blue-900 border-b ">
              WORK EXPERIENCE
            </h2>
            {/* Example work experience, replace with dynamic data if available */}
            <div>
              <h3 className="font-bold text-gray-800">
                Borcelle Studio{" "}
                <span className="float-right font-normal">2030 - PRESENT</span>
              </h3>
              <p className="text-gray-600 italic">
                Marketing Manager & Specialist
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>
                  Develop and execute comprehensive marketing strategies...
                </li>
                <li>Lead, mentor, and manage a high-performing team...</li>
                <li>
                  Monitor brand consistency across marketing channels and
                  materials.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">
                Fauget Studio{" "}
                <span className="float-right font-normal">2025 - 2029</span>
              </h3>
              <p className="text-gray-600 italic">
                Marketing Manager & Specialist
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Create and manage the marketing budget...</li>
                <li>Oversee market research to identify trends...</li>
                <li>Monitor brand consistency across marketing materials.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">
                Studio Shodwe{" "}
                <span className="float-right font-normal">2024 - 2025</span>
              </h3>
              <p className="text-gray-600 italic">
                Marketing Manager & Specialist
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>
                  Develop and maintain strong relationships with partners...
                </li>
                <li>Monitor and maintain brand consistency.</li>
              </ul>
            </div>
          </div>
          <div className="flexPadT-A4-pt15">
            <h2 className="flexFont-A4-pt16 font-semibold text-blue-900 border-b ">
              REFERENCE
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {props.references?.map((ref, idx) => (
                <div key={idx}>
                  <p className="font-semibold">{ref.name}</p>
                  <p className="text-gray-700">
                    {ref.company} / {ref.position}
                  </p>
                  <p className="flexFont-A4-pt10">📞 {ref.contact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Template1;

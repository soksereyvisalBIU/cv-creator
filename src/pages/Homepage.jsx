import React, { useState, useRef, useEffect } from "react";
import Template1 from "../templates/Template3";
import Template2 from "../templates/Template1";
import Template3 from "../templates/Template2";
import Form from "../pages/Form";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const TEMPLATE_KEYS = {
  TEMPLATE1: "template1",
  TEMPLATE2: "template2",
  TEMPLATE3: "template3",
};

function Homepage() {
  const [formData, setFormData] = useState();
  const [selectedTemplate, setSelectedTemplate] = useState(
    TEMPLATE_KEYS.TEMPLATE1
  );
  const [isExporting, setIsExporting] = useState(false);
  const [boxVisible, setBoxVisible] = useState(true);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 400, height: 500 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const offset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const resizeRef = useRef(false);
  const boxRef = useRef(null);

  const templates = {
    [TEMPLATE_KEYS.TEMPLATE1]: Template1,
    [TEMPLATE_KEYS.TEMPLATE2]: Template2,
    [TEMPLATE_KEYS.TEMPLATE3]: Template3,
  };
  const TemplateComponent = templates[selectedTemplate];

  // ✅ Unified Export Function
  // Export A4paper to PDF
  const handleExport = async () => {
    const paper = document.getElementById("A4paper");
    if (!paper) return;
    const originalTransform = paper.style.transform;
    const originalTransformOrigin = paper.style.transformOrigin;
    paper.style.transform = `scale(1.75)`;
    paper.style.transformOrigin = "top left";
    // Use html2canvas to capture the A4paper
    const canvas = await html2canvas(paper, {
      scale: 1.75,
      useCORS: true,
      backgroundColor: null,
      logging: false,
      windowWidth: paper.scrollWidth,
      windowHeight: paper.scrollHeight,
    });
    // Restore original transform
    paper.style.transform = originalTransform;
    paper.style.transformOrigin = originalTransformOrigin;
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const pageWidth = 210;
    const pageHeight = 297;
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
    pdf.save("cv.pdf");
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isMobile) return;

      if (isDragging.current) {
        const newX = Math.max(
          0,
          Math.min(window.innerWidth - size.width, e.clientX - offset.current.x)
        );
        const newY = Math.max(
          0,
          Math.min(
            window.innerHeight - size.height,
            e.clientY - offset.current.y
          )
        );
        setPosition({ x: newX, y: newY });
      } else if (resizeRef.current) {
        const newWidth = Math.max(300, e.clientX - position.x);
        const newHeight = Math.max(300, e.clientY - position.y);
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      resizeRef.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [position, size, isMobile]);

  const handleMouseDown = (e) => {
    if (!isMobile) return;
    isDragging.current = true;
    const rect = boxRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startResize = (e) => {
    if (!isMobile) return;
    e.stopPropagation();
    resizeRef.current = true;
  };

  const TemplateButton = ({ keyName, label }) => (
    <button
      className={`px-3 py-1 rounded ${
        selectedTemplate === keyName
          ? "bg-blue-700 text-white"
          : "bg-white border"
      }`}
      onClick={() => setSelectedTemplate(keyName)}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container grid gap-8 text-sm grid-cols-1 lg:grid-cols-3">
        <div>
          {/* Template Switcher */}
          <div className="mb-4 flex gap-2 flex-wrap">
            <TemplateButton
              keyName={TEMPLATE_KEYS.TEMPLATE1}
              label="Template 1"
            />
            <TemplateButton
              keyName={TEMPLATE_KEYS.TEMPLATE2}
              label="Template 2"
            />
            <TemplateButton
              keyName={TEMPLATE_KEYS.TEMPLATE3}
              label="Template 3"
            />
          </div>

          {/* Toggle and Export Buttons */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setBoxVisible(!boxVisible)}
              className="px-3 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600"
            >
              Toggle Template
            </button>
            <button
              disabled={isExporting}
              onClick={handleExport}
              className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {isExporting ? "Exporting..." : "Export PDF"}
            </button>
          </div>

          {/* Draggable & Resizable Template Preview */}
          {boxVisible && (
            <div
              ref={boxRef}
              onMouseDown={handleMouseDown}
              style={{
                position: isMobile ? "fixed" : "relative",
                top: isMobile ? position.y : "auto",
                left: isMobile ? position.x : "auto",
                width: isMobile ? size.width : "100%",
                height: isMobile ? size.height : "auto",
                zIndex: 1000,
                cursor: isMobile ? "move" : "default",
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                overflow: "auto",
              }}
              id="print-area"
            >
              <TemplateComponent {...formData} />
              {/* Resize handle only on mobile */}
              {isMobile && (
                <div
                  onMouseDown={startResize}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    width: 20,
                    height: 20,
                    background: "#ddd",
                    cursor: "nwse-resize",
                    borderBottomRightRadius: "10px",
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* Form Area */}
        <div className="lg:col-span-2 text-gray-600 overflow-hidden px-2 pb-2">
          <Form setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
}

export default Homepage;

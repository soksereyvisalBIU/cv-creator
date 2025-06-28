import html2pdf from "html2pdf.js";
export function downloadTemplateAsPDF(templateId = "template", filename = "resume.pdf") {
  const element = document.getElementById(templateId);
  if (!element) return;

  // Save original inline styles
  const originalWidth = element.style.width;
  const originalHeight = element.style.height;

  // Temporarily set A4 dimensions (at 96dpi)
  element.style.width = "794px";
  element.style.height = "1123px";

  const opt = {
    margin: 0,
    filename,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      // Restore original styles
      element.style.width = originalWidth;
      element.style.height = originalHeight;
    });
}

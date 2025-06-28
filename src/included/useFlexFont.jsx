import { useEffect } from "react";

export function useFlexFont(templateId, sizeMap) {
  useEffect(() => {
    // A4 width at 96dpi
    const BASE_WIDTH = 793.92;
    // Unit conversion helpers
    const ptToPx = (pt) => pt * 1.3333;
    const mmToPx = (mm) => mm * 3.7795;
    const cmToPx = (cm) => cm * 37.795;
    const inchToPx = (inch) => inch * 96;

    // Main function to scale and apply styles
    const applyFlexFont = () => {
      const template = document.getElementById(templateId);
      if (!template) return;

      Object.entries(sizeMap).forEach(([key, value]) => {
        let pxValue;
        if (typeof value === "object" && value.unit && value.value != null) {
          switch (value.unit) {
            case "pt":
              pxValue = ptToPx(value.value);
              break;
            case "mm":
              pxValue = mmToPx(value.value);
              break;
            case "cm":
              pxValue = cmToPx(value.value);
              break;
            case "inch":
              pxValue = inchToPx(value.value);
              break;
            default:
              pxValue = Number(value.value) || 0;
          }
        } else {
          // fallback: treat as pt
          pxValue = ptToPx(value);
        }
        const multiplier = pxValue / BASE_WIDTH;
        const scaledValue = template.offsetWidth * multiplier;

        // Map style keys to class names
        const classPrefixMap = {
          fontSize: `flexFont-A4-${key}`,
          padding: `flexPad-A4-${key}`,
          paddingTop: `flexPadT-A4-${key}`,
          paddingBottom: `flexPadB-A4-${key}`,
          paddingLeft: `flexPadL-A4-${key}`,
          paddingRight: `flexPadR-A4-${key}`,
          width: `flexWidth-A4-${key}`,
          height: `flexHeight-A4-${key}`,
          lineHeight: `flexLine-A4-${key}`,
          margin: `flexMargin-A4-${key}`,
          gap: `flexGap-A4-${key}`,
          borderRadius: `flexRadius-A4-${key}`,
        };

        Object.entries(classPrefixMap).forEach(([style, className]) => {
          const elements = document.getElementsByClassName(className);
          for (let el of elements) {
            switch (style) {
              case "fontSize":
                el.style.fontSize = `${scaledValue}px`;
                break;
              case "padding":
                el.style.padding = `${scaledValue}px`;
                break;
              case "paddingTop":
                el.style.paddingTop = `${scaledValue}px`;
                break;
              case "paddingBottom":
                el.style.paddingBottom = `${scaledValue}px`;
                break;
              case "paddingLeft":
                el.style.paddingLeft = `${scaledValue}px`;
                break;
              case "paddingRight":
                el.style.paddingRight = `${scaledValue}px`;
                break;
              case "width":
                el.style.width = `${scaledValue}px`;
                break;
              case "height":
                el.style.height = `${scaledValue}px`;
                break;
              case "lineHeight":
                el.style.lineHeight = `${scaledValue}px`;
                break;
              case "margin":
                el.style.margin = `${scaledValue}px`;
                break;
              case "gap":
                el.style.gap = `${scaledValue}px`;
                break;
              case "borderRadius":
                el.style.borderRadius = `${scaledValue}px`;
                break;
              default:
                break;
            }
          }
        });
      });
    };

    // Debounce helper
    const debounce = (func, delay) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
      };
    };

    const debouncedApplyFlexFont = debounce(applyFlexFont, 100);
    applyFlexFont();
    window.addEventListener("resize", debouncedApplyFlexFont);
    return () => {
      window.removeEventListener("resize", debouncedApplyFlexFont);
    };
  }, [templateId, sizeMap]);
}

export default useFlexFont;

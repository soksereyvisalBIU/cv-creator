import React, { useState, useRef, useEffect } from "react";

const DraggableBox = () => {
  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [size, setSize] = useState({ width: 200, height: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const offset = useRef({ x: 0, y: 0 });
  const boxRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          top: e.clientY - offset.current.y,
          left: e.clientX - offset.current.x,
        });
      }

      if (isResizing && boxRef.current) {
        const newWidth = e.clientX - boxRef.current.offsetLeft;
        const newHeight = e.clientY - boxRef.current.offsetTop;
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing]);

  const handleMouseDown = (e) => {
    if (e.target.className === "resize-handle") return;
    setIsDragging(true);
    offset.current = {
      x: e.clientX - boxRef.current.offsetLeft,
      y: e.clientY - boxRef.current.offsetTop,
    };
  };

  const handleResizeMouseDown = (e) => {
    setIsResizing(true);
    e.stopPropagation();
  };

  return (
    <div>
      <button
        onClick={() => setVisible((v) => !v)}
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 10000,
        }}
      >
        Toggle Box
      </button>

      {visible && (
        <div
          ref={boxRef}
          onMouseDown={handleMouseDown}
          style={{
            position: "fixed",
            top: position.top,
            left: position.left,
            width: size.width,
            height: size.height,
            backgroundColor: "#3498db",
            color: "white",
            padding: "10px",
            borderRadius: "10px",
            boxSizing: "border-box",
            cursor: "move",
            zIndex: 9999,
          }}
        >
          <strong>Drag me!</strong>
          <p>This box is draggable, resizable, and toggleable.</p>
          <div
            className="resize-handle"
            onMouseDown={handleResizeMouseDown}
            style={{
              width: "15px",
              height: "15px",
              background: "white",
              position: "absolute",
              bottom: 0,
              right: 0,
              cursor: "se-resize",
              borderRadius: "0 0 10px 0",
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default DraggableBox;

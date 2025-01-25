/* eslint-disable react/prop-types */
import anime from "animejs";
import opentype from "opentype.js";
import { useEffect, useRef } from "react";

function DigitalSign({ name, onSignGenerated }) {
  const svgContainerRef = useRef(null);

  useEffect(() => {
    const fontSize = 48;
    const font =
      "https://cdn.jsdelivr.net/npm/@fontsource/caveat/files/caveat-latin-400-normal.woff";

    opentype.load(font, (err, font) => {
      if (err) {
        console.error("Font loading error:", err);
        return;
      }

      const textPath = font.getPath(name, 0, fontSize, fontSize);
      const pathData = textPath.toPathData();

      const svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgElement.setAttribute("width", "300");
      svgElement.setAttribute("height", "100");
      svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("d", pathData);
      path.setAttribute("fill", "transparent");
      path.setAttribute("stroke", "black");
      path.setAttribute("stroke-width", "1");
      svgElement.appendChild(path);

      const container = svgContainerRef.current;
      if (container) {
        container.innerHTML = "";
        container.appendChild(svgElement);
      }

      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgElement);
      const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
      onSignGenerated(svgBlob);

      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      anime({
        targets: path,
        strokeDashoffset: [length, 0],
        duration: 2000,
        easing: "easeInOutSine",
        complete: () => {
          anime({
            targets: path,
            fill: ["transparent", "black"],
            duration: 500,
            easing: "easeInOutSine",
          });
        },
      });
    });
  }, [name, onSignGenerated]);

  return (
    <div
      ref={svgContainerRef}
      className="flex justify-center items-center"
      style={{ width: "300px", height: "100px" }}
    ></div>
  );
}

export default DigitalSign;

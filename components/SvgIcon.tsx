"use client";

import React, { useEffect, useState } from "react";

interface SvgIconProps {
  src: string;
  color?: string;
  className?: string;
}

export const SvgIcon: React.FC<SvgIconProps> = ({ src, color, className }) => {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        // Remove width/height to let className handle it
        const cleanSvg = text
          .replace(/width="[^"]*"/, "")
          .replace(/height="[^"]*"/, "");
        setSvgContent(cleanSvg);
      });
  }, [src]);

  return (
    <div
      className={`${className} neon-shadow transition-all duration-300`}
      style={{ color: color }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

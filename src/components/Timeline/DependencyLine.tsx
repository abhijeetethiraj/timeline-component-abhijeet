// src/components/Timeline/DependencyLine.tsx
import React from "react";
import type { DependencyLine as DependencyLineType } from "../../utils/dependency.utils";

interface DependencyLineProps {
  line: DependencyLineType;
}

// This component renders a single SVG path for a dependency
export const DependencyLine: React.FC<DependencyLineProps> = ({ line }) => {
  const { x1, y1, x2, y2 } = line;

  // Create the 'd' attribute for the SVG path
  // This creates a simple right-angle path
  const pathData = `M ${x1} ${y1} L ${x1 + 10} ${y1} L ${
    x1 + 10
  } ${y2} L ${x2} ${y2}`;

  return (
    <path
      d={pathData}
      stroke="#94a3b8" // neutral-400 color
      strokeWidth="2"
      fill="none"
      markerEnd="url(#arrowhead)" // Use the arrowhead marker
    />
  );
};

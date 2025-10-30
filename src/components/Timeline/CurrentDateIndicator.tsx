// src/components/Timeline/CurrentDateIndicator.tsx
import React from "react";
import { calculatePosition } from "../../utils/position.utils";

interface CurrentDateIndicatorProps {
  startDate: Date;
  pixelsPerDay: number;
}

export const CurrentDateIndicator: React.FC<CurrentDateIndicatorProps> = ({
  startDate,
  pixelsPerDay,
}) => {
  const today = new Date();
  // Calculate the pixel position of 'today'
  const leftPosition = calculatePosition(today, startDate, pixelsPerDay);

  return (
    <div
      className="absolute bottom-0 top-0 z-20 w-0.5 bg-red-500"
      style={{ left: `${leftPosition}px` }}
    >
      <div className="absolute -top-5 -translate-x-1/2 rounded bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
        Today
      </div>
    </div>
  );
};

// src/components/Timeline/TimelineGrid.tsx
import React from "react";
import { generateTimeScale } from "../../utils/date.utils";
import { VIEW_MODE_CONFIG } from "../../constants/timeline.constants";

interface TimelineGridProps {
  startDate: Date;
  endDate: Date;
  viewMode: "day" | "week" | "month";
}

export const TimelineGrid: React.FC<TimelineGridProps> = ({
  startDate,
  endDate,
  viewMode,
}) => {
  const timeScale = generateTimeScale(startDate, endDate, viewMode);
  const config = VIEW_MODE_CONFIG[viewMode];

  return (
    <div className="absolute inset-0 flex">
      {timeScale.map(({ date }) => (
        <div
          key={date.toISOString()}
          className="flex-shrink-0 border-r border-neutral-200"
          style={{ width: config.columnWidth }}
        />
      ))}
    </div>
  );
};

// src/components/Timeline/TimelineHeader.tsx
import React, { memo } from "react";
import { generateTimeScale } from "../../utils/date.utils";
import { VIEW_MODE_CONFIG } from "../../constants/timeline.constants";

interface TimelineHeaderProps {
  startDate: Date;
  endDate: Date;
  viewMode: "day" | "week" | "month";
}

const TimelineHeaderComponent: React.FC<TimelineHeaderProps> = ({
  startDate,
  endDate,
  viewMode,
}) => {
  const timeScale = generateTimeScale(startDate, endDate, viewMode);
  const config = VIEW_MODE_CONFIG[viewMode];

  return (
    <div className="sticky top-0 z-10 flex h-10 border-b border-neutral-300 bg-neutral-50">
      {timeScale.map(({ date, label }) => (
        <div
          key={date.toISOString()}
          className="flex-shrink-0 border-r border-neutral-200 p-2 text-sm text-neutral-600"
          style={{ width: config.columnWidth }}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export const TimelineHeader = memo(TimelineHeaderComponent);

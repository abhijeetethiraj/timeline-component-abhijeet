import React from "react";
import type { TimeLineRow } from "../../types/timeline.types";

interface TimelineRowLabelProps {
  row: TimeLineRow;
}

export const TimelineRowLabel: React.FC<TimelineRowLabelProps> = ({ row }) => {
  return (
    <div className="flex h-12 items-center border-b border-neutral-200 p-2">
      <span className="truncate text-sm font-medium text-neutral-800">
        {row.label}
      </span>
    </div>
  );
};

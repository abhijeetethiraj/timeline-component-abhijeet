// src/components/Timeline/TimelineRow.tsx
import React, { memo } from "react";
import type {
  TimeLineRow as TimeLineRowType,
  TimeLineTask,
} from "../../types/timeline.types";

import { TaskBar } from "./TaskBar";
import {
  calculateDuration,
  calculatePosition,
} from "../../utils/position.utils";
import { useDroppableRow } from "../../hooks/useDragAndDrop";

interface TimelineRowProps {
  row: TimeLineRowType;
  tasks: Record<string, TimeLineTask>;
  startDate: Date;
  pixelsPerDay: number;
  onTaskClick: (task: TimeLineTask) => void;
  onTaskKeyDown: (e: React.KeyboardEvent, task: TimeLineTask) => void; // NEW
}

export const TimelineRow: React.FC<TimelineRowProps> = memo(
  ({ row, tasks, startDate, pixelsPerDay, onTaskClick, onTaskKeyDown }) => {
    const { setNodeRef, style: dropStyle } = useDroppableRow(row.id);

    return (
      <div
        ref={setNodeRef}
        className="relative h-12 border-b border-neutral-200"
        style={dropStyle}
        role="region" // NEW: ARIA role [cite: 298]
        aria-label={`${row.label} timeline. ${row.tasks.length} tasks.`} // NEW [cite: 299]
      >
        {row.tasks.map((taskId) => {
          const task = tasks[taskId];
          if (!task) return null;

          const left = calculatePosition(
            task.startDate,
            startDate,
            pixelsPerDay
          );
          const width = calculateDuration(
            task.startDate,
            task.endDate,
            pixelsPerDay
          );

          return (
            <TaskBar
              key={task.id}
              task={task}
              style={{
                left: `${left}px`,
                width: `${width}px`,
              }}
              onClick={onTaskClick}
              onKeyDown={onTaskKeyDown} // NEW: Pass handler
            />
          );
        })}
      </div>
    );
  }
);

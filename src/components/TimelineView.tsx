// src/components/Timeline/TimelineView.tsx
import React, { useMemo, useState, Suspense, lazy } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import type { TimeLineViewProps, TimeLineTask } from "../types/timeline.types";
import { TimelineGrid } from "./Timeline/TimelineGrid";
import { TimelineRow } from "./Timeline/TimelineRow";
import { TimelineRowLabel } from "./Timeline/TimelineRowLabel";
import { TimelineHeader } from "./Timeline/TimelineHeader";
import { CurrentDateIndicator } from "./Timeline/CurrentDateIndicator";
import { VIEW_MODE_CONFIG } from "../constants/timeline.constants";
import { getDaysBetween } from "../utils/date.utils";
import {
  calculateDateFromPosition,
  calculatePosition,
} from "../utils/position.utils";
import { calculateDependencyLines } from "../utils/dependency.utils";
import { DependencyLine } from "./Timeline/DependencyLine";

// ✅ Lazy load the sidebar component for performance
const TaskDetailSidebar = lazy(() => import("./Timeline/TaskDetailSidebar"));

export const TimelineView: React.FC<TimeLineViewProps> = ({
  rows,
  tasks,
  viewMode,
  startDate,
  endDate,
  onTaskUpdate,
  onTaskMove,
}) => {
  const [selectedTask, setSelectedTask] = useState<TimeLineTask | null>(null);

  const isEmpty = rows.length === 0;
  const config = VIEW_MODE_CONFIG[viewMode];
  const pixelsPerDay = config.pixelsPerDay;
  const totalDays = getDaysBetween(startDate, endDate);
  const totalWidth = totalDays * pixelsPerDay;
  const totalHeight = rows.length * 48;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const dependencyLines = useMemo(
    () => calculateDependencyLines(tasks, rows, startDate, pixelsPerDay),
    [tasks, rows, startDate, pixelsPerDay]
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;
    const { type, id } = active.data.current || {};
    if (!id) return;

    const task = tasks[id];
    if (!task) return;

    if (type === "task" && over) {
      const newRowId = over.data.current?.id;
      const originalLeft = calculatePosition(
        task.startDate,
        startDate,
        pixelsPerDay
      );
      const newLeft = originalLeft + delta.x;
      const newStartDate = calculateDateFromPosition(
        newLeft,
        startDate,
        pixelsPerDay
      );
      onTaskMove(task.id, newRowId, newStartDate);
    }

    if (type === "resize-left") {
      const originalLeft = calculatePosition(
        task.startDate,
        startDate,
        pixelsPerDay
      );
      const newLeft = originalLeft + delta.x;
      const newStartDate = calculateDateFromPosition(
        newLeft,
        startDate,
        pixelsPerDay
      );
      if (newStartDate < task.endDate) {
        onTaskUpdate(id, { startDate: newStartDate });
      }
    }

    if (type === "resize-right") {
      const originalRight = calculatePosition(
        task.endDate,
        startDate,
        pixelsPerDay
      );
      const newRight = originalRight + delta.x;
      const newEndDate = calculateDateFromPosition(
        newRight,
        startDate,
        pixelsPerDay
      );
      if (newEndDate > task.startDate) {
        onTaskUpdate(id, { endDate: newEndDate });
      }
    }
  };

  const handleTaskClick = (task: TimeLineTask) => {
    setSelectedTask(task);
  };

  const handleCloseSidebar = () => {
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    onTaskUpdate(taskId, { __DELETED: true } as any);
  };

  const handleTaskKeyDown = (e: React.KeyboardEvent, task: TimeLineTask) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedTask(task);
    }
  };

  return (
    <>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex w-full flex-col overflow-hidden rounded-lg border border-neutral-300 bg-white lg:flex-row">
          {/* Left Panel */}
          <div className="w-full flex-shrink-0 border-r border-neutral-300 bg-neutral-50 lg:w-[200px]">
            <div className="flex h-10 items-center border-b border-neutral-300 p-2 font-semibold text-neutral-700">
              Tasks
            </div>
            <div className="overflow-hidden">
              {rows.map((row) => (
                <TimelineRowLabel key={row.id} row={row} />
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full flex-1 overflow-x-auto lg:w-auto">
            <TimelineHeader
              startDate={startDate}
              endDate={endDate}
              viewMode={viewMode}
            />
            <div
              className="relative min-h-[200px]"
              style={{ width: `${totalWidth}px` }}
            >
              {isEmpty ? (
                <div className="flex h-32 items-center justify-center text-neutral-500">
                  No tasks to display.
                </div>
              ) : (
                <>
                  <TimelineGrid
                    startDate={startDate}
                    endDate={endDate}
                    viewMode={viewMode}
                  />
                  <CurrentDateIndicator
                    startDate={startDate}
                    pixelsPerDay={pixelsPerDay}
                  />
                  <svg
                    className="absolute inset-0 z-0 pointer-events-none"
                    width={totalWidth}
                    height={totalHeight}
                  >
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                      </marker>
                    </defs>
                    <g>
                      {dependencyLines.map((line) => (
                        <DependencyLine key={line.id} line={line} />
                      ))}
                    </g>
                  </svg>
                  <div className="relative z-10">
                    {rows.map((row) => (
                      <TimelineRow
                        key={row.id}
                        row={row}
                        tasks={tasks}
                        startDate={startDate}
                        pixelsPerDay={pixelsPerDay}
                        onTaskClick={handleTaskClick}
                        onTaskKeyDown={handleTaskKeyDown}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DndContext>

      {/* ✅ Sidebar with Suspense fallback */}
      <Suspense fallback={<div className="p-4">Loading sidebar...</div>}>
        <TaskDetailSidebar
          task={selectedTask}
          onClose={handleCloseSidebar}
          onUpdate={onTaskUpdate}
          onDelete={handleDeleteTask}
        />
      </Suspense>
    </>
  );
};

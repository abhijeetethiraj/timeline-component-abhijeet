// src/components/Timeline/TaskBar.tsx
import React, { memo } from "react";
import type { TimeLineTask } from "../../types/timeline.types"; // ✅ Fixed type name
import {
  useDraggableTask,
  useDraggableResizeHandle, // ✅ Custom hooks
} from "../../hooks/useDragAndDrop";

interface TaskBarProps {
  task: TimeLineTask;
  style: {
    left: string;
    width: string;
  };
  onClick: (task: TimeLineTask) => void;
  onKeyDown: (e: React.KeyboardEvent, task: TimeLineTask) => void;
}

export const TaskBar: React.FC<TaskBarProps> = memo(
  ({ task, style, onClick, onKeyDown }) => {
    const {
      attributes: taskAttrs,
      listeners: taskListeners,
      setNodeRef: taskRef,
      style: dragStyle,
    } = useDraggableTask(task.id);

    const {
      attributes: leftAttrs,
      listeners: leftListeners,
      setNodeRef: leftRef,
    } = useDraggableResizeHandle(task.id, "resize-left");

    const {
      attributes: rightAttrs,
      listeners: rightListeners,
      setNodeRef: rightRef,
    } = useDraggableResizeHandle(task.id, "resize-right");

    const taskColor = task.color || "#0ea5e9";

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      // Prevent accidental trigger during drag
      if (!dragStyle) onClick(task);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      onKeyDown(e, task);
    };

    // ARIA label for accessibility
    const ariaLabel = `${
      task.title
    }. From ${task.startDate.toDateString()} to ${task.endDate.toDateString()}. Progress: ${
      task.progress
    }%. Press Enter to edit.`;

    return (
      <div
        ref={taskRef}
        {...taskListeners}
        {...taskAttrs}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        className="absolute flex h-8 items-center rounded shadow-sm transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        style={{
          ...style,
          top: "8px",
          backgroundColor: taskColor,
          ...dragStyle,
        }}
      >
        {/* Task Info */}
        <div className="flex w-full items-center justify-between px-2">
          <span className="truncate text-xs font-medium text-white">
            {task.title}
          </span>
          {!task.isMilestone && (
            <span className="text-xs text-white opacity-75">
              {task.progress}%
            </span>
          )}
        </div>

        {/* Progress bar */}
        {!task.isMilestone && task.progress > 0 && (
          <div
            className="absolute bottom-0 left-0 h-1 rounded-b bg-white opacity-40"
            style={{ width: `${task.progress}%` }}
          />
        )}

        {/* Resize handles */}
        <div
          ref={leftRef}
          {...leftListeners}
          {...leftAttrs}
          onClick={(e) => e.stopPropagation()}
          role="separator"
          aria-label="Resize start date"
          className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize opacity-0 hover:bg-white/50"
        />
        <div
          ref={rightRef}
          {...rightListeners}
          {...rightAttrs}
          onClick={(e) => e.stopPropagation()}
          role="separator"
          aria-label="Resize end date"
          className="absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize opacity-0 hover:bg-white/50"
        />
      </div>
    );
  }
);

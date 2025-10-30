import React, { useEffect, useRef } from "react";
import type { TimeLineTask } from "../../types/timeline.types";

interface TaskDetailSidebarProps {
  task: TimeLineTask | null;
  onClose: () => void;
  onUpdate: (taskId: string, updates: Partial<TimeLineTask>) => void;
  onDelete: (taskId: string) => void;
}

const TaskDetailSidebar: React.FC<TaskDetailSidebarProps> = ({
  task,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Focus title input when sidebar opens
  useEffect(() => {
    if (task) {
      titleInputRef.current?.focus();
    }
  }, [task]);

  if (!task) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onUpdate(task.id, { [e.target.name]: e.target.value });
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(task.id, { progress: e.target.valueAsNumber });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      onDelete(task.id);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 bg-black/30"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="complementary"
        aria-label="Task details"
        aria-hidden={!task}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-semibold">Task Details</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-neutral-500 hover:bg-neutral-100"
            aria-label="Close task details"
          >
            &times;
          </button>
        </div>

        {/* Form Fields */}
        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="task-title"
              className="mb-1 block text-sm font-medium text-neutral-600"
            >
              Task Name
            </label>
            <input
              ref={titleInputRef}
              id="task-title"
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full rounded border border-neutral-300 p-2"
            />
          </div>

          <div>
            <label
              htmlFor="task-progress"
              className="mb-1 block text-sm font-medium text-neutral-600"
            >
              Progress: {task.progress}%
            </label>
            <input
              id="task-progress"
              type="range"
              name="progress"
              min="0"
              max="100"
              value={task.progress}
              onChange={handleProgressChange}
              className="w-full"
            />
          </div>

          <button
            onClick={handleDelete}
            className="w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailSidebar;

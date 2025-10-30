import type { Meta, StoryObj } from "@storybook/react";
import { TimelineView } from "../TimelineView";
import { sampleRows, sampleTasks } from "../../constants/sample.data";
import { generateLargeData } from "../../constants/large.data";
import { useArgs } from "storybook/internal/preview-api";
import { useCallback } from "react";
import type { TimeLineRow, TimeLineTask } from "../../types/timeline.types";

const meta: Meta<typeof TimelineView> = {
  title: "Components/TimelineView",
  component: TimelineView,
  tags: ["autodocs"],
  argTypes: {
    viewMode: {
      control: "radio",
      options: ["day", "week", "month"],
    },
    startDate: { control: "date" },
    endDate: { control: "date" },
    onTaskUpdate: { action: "taskUpdated" },
    onTaskMove: { action: "taskMoved" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Common args for all stories
const defaultArgs = {
  rows: sampleRows,
  tasks: sampleTasks,
  viewMode: "week" as const,
  startDate: new Date(2024, 0, 1),
  endDate: new Date(2024, 2, 31),
  onTaskUpdate: () => {},
  onTaskMove: () => {},
};

// Story 1: Default (also serves as "With Dependencies")
export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};

// Story 2: Empty State
export const EmptyState: Story = {
  args: {
    ...defaultArgs,
    rows: [],
    tasks: {},
  },
};

// Story 3: Interactive Playground (handles all state)
export const InteractiveDemo: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => {
    const [{ tasks, rows }, updateArgs] = useArgs();

    const handleTaskMove = useCallback(
      (taskId: string, newRowId: string, newStartDate: Date) => {
        const task: TimeLineTask = tasks[taskId];
        const oldRowId = task.rowId;
        const durationMs = task.endDate.getTime() - task.startDate.getTime();
        const newEndDate = new Date(newStartDate.getTime() + durationMs);
        const updatedTask: TimeLineTask = {
          ...task,
          startDate: newStartDate,
          endDate: newEndDate,
          rowId: newRowId,
        };
        const newTasks = { ...tasks, [taskId]: updatedTask };
        const newRows = (rows as TimeLineRow[]).map((row) => {
          if (row.id === oldRowId && oldRowId !== newRowId) {
            return {
              ...row,
              tasks: row.tasks.filter((id: string) => id !== taskId),
            };
          }
          if (row.id === newRowId && oldRowId !== newRowId) {
            return {
              ...row,
              tasks: [...row.tasks, taskId],
            };
          }
          return row;
        });
        updateArgs({ tasks: newTasks, rows: newRows });
      },
      [tasks, rows, updateArgs]
    );

    const handleTaskUpdate = useCallback(
      (
        taskId: string,
        updates: Partial<TimeLineTask> & { __DELETED?: boolean }
      ) => {
        if (updates.__DELETED) {
          const { [taskId]: deletedTask, ...remainingTasks } = tasks;
          const newRows = (rows as TimeLineRow[]).map((row) => ({
            ...row,
            tasks: row.tasks.filter((id: string) => id !== taskId),
          }));
          updateArgs({ tasks: remainingTasks, rows: newRows });
          return;
        }
        const updatedTask = { ...tasks[taskId], ...updates };
        const newTasks = { ...tasks, [taskId]: updatedTask };
        updateArgs({ tasks: newTasks });
      },
      [tasks, rows, updateArgs]
    );

    return (
      <TimelineView
        {...args}
        tasks={tasks}
        rows={rows}
        onTaskMove={handleTaskMove}
        onTaskUpdate={handleTaskUpdate}
      />
    );
  },
};

// --- NEW STORIES ---

// Story 4: View Mode (Day)
export const DayView: Story = {
  name: "View Mode: Day",
  args: {
    ...defaultArgs,
    viewMode: "day",
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 0, 31), // Shorter range for day view
  },
};

// Story 5: View Mode (Month)
export const MonthView: Story = {
  name: "View Mode: Month",
  args: {
    ...defaultArgs,
    viewMode: "month",
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 5, 30), // Longer range for month view
  },
};

// Story 6: Large Dataset (for performance testing)
const largeData = generateLargeData(50, 5); // 50 rows, 250 tasks
export const LargeDataset: Story = {
  name: "Stress Test: Large Dataset",
  args: {
    ...defaultArgs,
    rows: largeData.rows,
    tasks: largeData.tasks,
    viewMode: "month",
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 11, 31),
  },
};

// Story 7: Mobile View
export const MobileView: Story = {
  name: "Responsive: Mobile View",
  args: {
    ...defaultArgs,
  },
  parameters: {
    // This tells Storybook to render this story in a mobile viewport
    viewport: {
      defaultViewport: "small",
    },
  },
};

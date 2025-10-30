import type { TimeLineTask } from '../types/timeline.types'
import { calculatePosition, calculateDuration } from './position.utils';
export interface DependencyLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  id: string;
}

// Helper to get the pixel position of a task
const getTaskPosition = (
  task: TimeLineTask,
  startDate: Date,
  pixelsPerDay: number,
  rowMap: Map<string, number>, // Map of rowId -> rowIndex
) => {
  const left = calculatePosition(task.startDate, startDate, pixelsPerDay);
  const width = calculateDuration(task.startDate, task.endDate, pixelsPerDay);
  const rowIndex = rowMap.get(task.rowId) ?? 0;
  
  // Calculate vertical center of the task bar (row index * height + half height)
  const top = rowIndex * 48 + 24; // 48px row height, 24px is half

  return { left, width, top };
};

/**
 * Generates all dependency lines for the timeline
 * [cite: 541-552]
 */
export const calculateDependencyLines = (
  tasks: Record<string, TimeLineTask>,
  rows: { id: string }[],
  startDate: Date,
  pixelsPerDay: number,
): DependencyLine[] => {
  const lines: DependencyLine[] = [];
  
  // Create a map for quick row index lookup (rowId -> index)
  const rowMap = new Map(rows.map((row, index) => [row.id, index]));

  for (const task of Object.values(tasks)) {
    if (!task.dependencies) continue; // Skip if no dependencies

    // Get the position for the *dependent* task (the one with the arrow)
    const toTaskPosition = getTaskPosition(
      task,
      startDate,
      pixelsPerDay,
      rowMap,
    );

    for (const depId of task.dependencies) {
      const fromTask = tasks[depId];
      if (!fromTask) continue; // Skip if predecessor task not found

      // Get the position for the *predecessor* task
      const fromTaskPosition = getTaskPosition(
        fromTask,
        startDate,
        pixelsPerDay,
        rowMap,
      );

      // Line starts at the END of the predecessor
      const x1 = fromTaskPosition.left + fromTaskPosition.width;
      const y1 = fromTaskPosition.top;

      // Line ends at the START of the dependent task
      const x2 = toTaskPosition.left;
      const y2 = toTaskPosition.top;

      lines.push({
        x1,
        y1,
        x2,
        y2,
        id: `${fromTask.id}-${task.id}`,
      });
    }
  }
  return lines;
};
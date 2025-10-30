// src/constants/large.data.ts
import type { TimeLineRow, TimeLineTask } from '../types/timeline.types';

export const generateLargeData = (
  numRows: number = 50,
  tasksPerRow: number = 5,
) => {
  const rows: TimeLineRow[] = [];
  const tasks: Record<string, TimeLineTask> = {};
  let taskCounter = 1;

  for (let i = 1; i <= numRows; i++) {
    const rowId = `large-row-${i}`;
    const rowTasks: string[] = [];
    
    for (let j = 1; j <= tasksPerRow; j++) {
      const taskId = `large-task-${taskCounter++}`;
      const startDate = new Date(2024, 0, j * 5); // Start every 5 days
      const endDate = new Date(2024, 0, j * 5 + 3); // 3-day duration
      
      tasks[taskId] = {
        id: taskId,
        title: `Task ${taskCounter - 1}`,
        startDate,
        endDate,
        progress: Math.floor(Math.random() * 100),
        rowId,
        color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 4)],
      };
      rowTasks.push(taskId);
    }
    
    rows.push({
      id: rowId,
      label: `Team ${i}`,
      tasks: rowTasks,
    });
  }

  return { rows, tasks };
};
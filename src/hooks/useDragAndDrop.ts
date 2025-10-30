// src/hooks/useDragAndDrop.ts
import { useDraggable, useDroppable } from '@dnd-kit/core';

// This hook will be used by the <TaskBar> component
export function useDraggableTask(taskId: string) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `task-${taskId}`, // Unique ID for dragging
    data: { id: taskId, type: 'task' }, // Attach our task data
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 100, // Make sure it's on top
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', // Add drag shadow
      }
    : undefined;

  return { attributes, listeners, setNodeRef, style };
}

// This hook will be used by the <TimelineRow> component
export function useDroppableRow(rowId: string) {
  const { isOver, setNodeRef } = useDroppable({
    id: `row-${rowId}`, // Unique ID for dropping
    data: { id: rowId, type: 'row' }, // Attach our row data
  });

  const style = {
    backgroundColor: isOver ? 'rgba(0,100,255,0.1)' : undefined, // Highlight when dragging over
  };

  return { setNodeRef, style };
}

export function useDraggableResizeHandle(
  id: string,
  type: 'resize-left' | 'resize-right',
) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `${type}-${id}`, // Unique ID like "resize-left-task-1"
    data: { id: id, type: type }, // Attach data so we know what's being dragged
  });

  return { attributes, listeners, setNodeRef };
}
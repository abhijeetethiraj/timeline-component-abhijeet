# Timeline/Gantt View Component

This project is a high-performance, interactive Timeline/Gantt component built from scratch for a frontend developer assignment. It is rendered and documented using Storybook.

---

## Live Storybook

🔗 [https://timeline-component-abhijeet.vercel.app/](https://timeline-component-abhijeet.vercel.app/)

---

## Installation

To run the Storybook locally:

```bash
# 1. Clone the repository
git clone https://github.com/abhijeetethiraj/timeline-component-abhijeet.git
cd timeline-component-abhijeet

# 2. Install dependencies
npm install

# 3. Run Storybook
npm run storybook
 Architecture
The component is built using a composable architecture.
The main TimelineView component acts as a controller, managing state and context (like DndContext).

It composes smaller, memoized child components — TimelineRow, TaskBar, and TimelineHeader — to ensure high performance and prevent unnecessary re-renders.

Utility functions for date, position, and dependency calculations are separated for testability and reusability.

   Features
 Timeline grid with Day, Week, and Month views

 Task rendering with progress and dependencies

 Task drag-and-drop (horizontal move and row change)

 Task resizing (both left and right handles)

 Dependency line rendering (SVG)

 Task detail sidebar for editing and deleting

 Keyboard navigation and ARIA accessibility

 Responsive design for mobile

 Performance optimized with React.memo, useMemo, and React.lazy

Storybook Stories
Includes the following stories as required by the assignment:

Default: Standard timeline with sample data and dependencies

EmptyState: Component with no tasks or rows

InteractiveDemo: Full playground with drag, resize, and edit functionality

View Modes: Day, Week, and Month view stories

Stress Test (Large Dataset): Renders 50 rows and 250 tasks to test performance

Responsive (Mobile View): Demonstrates the stacked mobile layout

 Technologies Used
React

TypeScript

Tailwind CSS

Storybook

Vite

@dnd-kit/core (for drag-and-drop)

date-fns (for date calculations)

 Contact
Author: Abhijeet Ethiraj
```

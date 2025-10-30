Markdown

# Timeline/Gantt View Component

This project is a high-performance, interactive Timeline/Gantt component built from scratch for a frontend developer assignment. It is rendered and documented using Storybook.

## 🚀 Live Storybook

[**Your Deployed Storybook URL Will Go Here**]

## 💻 Installation

To run the Storybook locally:

```bash
# 1. Clone the repository
git clone [Your GitHub Repo URL]
cd [your-repo-name]

# 2. Install dependencies
npm install

# 3. Run Storybook
npm run storybook
🏗️ Architecture
The component is built using a composable architecture. The main TimelineView component acts as a controller, managing state and context (like DndContext). It composes smaller, memoized child components (TimelineRow, TaskBar, TimelineHeader) to ensure high performance and prevent unnecessary re-renders. Utility functions for date, position, and dependency calculations are separated for testability and reusability.

✨ Features
[x] Timeline grid with Day, Week, and Month views

[x] Task rendering with progress and dependencies

[x] Task drag-and-drop (horizontal move and row change)

[x] Task resizing (both left and right handles)

[x] Dependency line rendering (SVG)

[x] Task detail sidebar for editing and deleting

[x] Keyboard navigation and ARIA accessibility

[x] Responsive design for mobile

[x] Performance optimized with React.memo, useMemo, and React.lazy

📖 Storybook Stories
My Storybook includes the following stories as required by the assignment:

Default: Shows the standard timeline with sample data and dependencies.

EmptyState: Demonstrates the component with no tasks or rows.

InteractiveDemo: A full playground with drag, resize, and edit functionality.

View Mode (Day, Week, Month): Stories for each required view mode.

Stress Test (Large Dataset): Renders 50 rows and 250 tasks to test performance.

Responsive (Mobile View): Demonstrates the stacked mobile layout.

🛠️ Technologies
React

TypeScript

Tailwind CSS

Storybook

Vite

@dnd-kit/core (for drag-and-drop)

date-fns (for date calculations)

👤 Contact
Abhijeet Ethiraj - https://github.com/abhijeetethiraj




```

## 🚀 Live Storybook

https://timeline-component-abhijeet.vercel.app/?path=/docs/components-timelineview--docs

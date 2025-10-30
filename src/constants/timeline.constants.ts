// src/constants/timeline.constants.ts

// These values are from the "Time Scale Requirements" table in the PDF [cite: 199]
export const VIEW_MODE_CONFIG = {
  day: {
    pixelsPerDay: 40, // 40px column width
    columnWidth: '40px',
  },
  week: {
    pixelsPerDay: 80 / 7, // 80px per week / 7 days
    columnWidth: '80px',
  },
  month: {
    pixelsPerDay: 120 / 30, // 120px per month / ~30 days (avg)
    columnWidth: '120px',
  },
};
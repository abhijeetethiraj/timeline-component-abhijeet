// src/utils/position.utils.ts

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Calculate pixel position from date
 * From PDF [cite: 455-466]
 */
export const calculatePosition = (
  date: Date,
  startDate: Date,
  pixelsPerDay: number,
): number => {
  const daysSinceStart = (date.getTime() - startDate.getTime()) / MS_PER_DAY;
  return Math.round(daysSinceStart * pixelsPerDay);
};

/**
 * Calculate duration in pixels
 * From PDF [cite: 467-478]
 */
export const calculateDuration = (
  startDate: Date,
  endDate: Date,
  pixelsPerDay: number,
): number => {
  const durationDays = (endDate.getTime() - startDate.getTime()) / MS_PER_DAY;
  return Math.round(durationDays * pixelsPerDay);
};

/**
 * Calculate date from pixel position
 * From PDF [cite: 479-489]
 */
export const calculateDateFromPosition = (
  position: number,
  startDate: Date,
  pixelsPerDay: number,
): Date => {
  const days = Math.round(position / pixelsPerDay);
  const result = new Date(startDate);
  result.setDate(result.getDate() + days);
  return result;
};
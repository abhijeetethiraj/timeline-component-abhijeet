// src/utils/date.utils.ts
import {
  differenceInDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  format,
  getWeek,
} from 'date-fns';

/**
 * Calculates the number of days between two dates.
 */
export const getDaysBetween = (startDate: Date, endDate: Date): number => {
  return differenceInDays(endDate, startDate);
};

/**
 * Gets the week number, handling ISO week.
 * From PDF 
 */
export const getWeekNumber = (date: Date): number => {
  // Using date-fns getWeek, which is simpler than the PDF's manual one
  return getWeek(date, { weekStartsOn: 1 }); // Assuming week starts on Monday
};

/**
 * Generates the labels for the time scale based on view mode.
 * Adapted from PDF [cite: 490-521]
 */
export const generateTimeScale = (
  startDate: Date,
  endDate: Date,
  viewMode: 'day' | 'week' | 'month',
) => {
  let scale: Array<{ date: Date; label: string }> = [];

  if (viewMode === 'day') {
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    scale = days.map((day) => ({
      date: day,
      label: format(day, 'EEE d'), // Format "Mon 24"
    }));
  } else if (viewMode === 'week') {
    const weeks = eachWeekOfInterval({ start: startDate, end: endDate });
    scale = weeks.map((week) => ({
      date: week,
      label: `Week ${getWeekNumber(week)}`, // Format "Week 43"
    }));
  } else if (viewMode === 'month') {
    const months = eachMonthOfInterval({ start: startDate, end: endDate });
    scale = months.map((month) => ({
      date: month,
      label: format(month, 'MMM yyyy'), // Format "Oct 2024"
    }));
  }
  return scale;
};
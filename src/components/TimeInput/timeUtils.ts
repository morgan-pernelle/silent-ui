export interface TimeParts {
  hour: number;
  minute: number;
}

export function isValidTimeParts(hour: number, minute: number): boolean {
  return (
    Number.isInteger(hour) &&
    Number.isInteger(minute) &&
    hour >= 0 &&
    hour <= 23 &&
    minute >= 0 &&
    minute <= 59
  );
}

export function parseTime(value: string): TimeParts | null {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  return isValidTimeParts(hour, minute) ? { hour, minute } : null;
}

export function toTimeString(parts: TimeParts): string {
  const h = String(parts.hour).padStart(2, "0");
  const m = String(parts.minute).padStart(2, "0");
  return `${h}:${m}`;
}

export function clampTimeParts(hour: number, minute: number): TimeParts {
  return {
    hour: Math.min(23, Math.max(0, hour)),
    minute: Math.min(59, Math.max(0, minute)),
  };
}

export function partsFromDate(date: Date): TimeParts {
  return { hour: date.getHours(), minute: date.getMinutes() };
}

export function segmentsToTimeParts(
  hourStr: string,
  minuteStr: string,
): TimeParts | null {
  if (hourStr.length !== 2 || minuteStr.length !== 2) return null;
  const hour = Number(hourStr);
  const minute = Number(minuteStr);
  if (!isValidTimeParts(hour, minute)) return null;
  return { hour, minute };
}

export function isWithinTimeRange(
  parts: TimeParts,
  min?: string,
  max?: string,
): boolean {
  const value = toTimeString(parts);
  if (min && value < min) return false;
  if (max && value > max) return false;
  return true;
}

export const MINUTE_STEP = 5;

export function snapMinuteToStep(minute: number): number {
  const snapped = Math.round(minute / MINUTE_STEP) * MINUTE_STEP;
  return Math.min(55, Math.max(0, snapped));
}

export function getHourRange(): number[] {
  return Array.from({ length: 24 }, (_, i) => i);
}

export function getMinuteRange(): number[] {
  return Array.from({ length: 60 / MINUTE_STEP }, (_, i) => i * MINUTE_STEP);
}

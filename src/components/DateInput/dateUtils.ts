export interface DateParts {
  day: number;
  month: number;
  year: number;
}

export function daysInMonth(month: number, year: number): number {
  if (month < 1 || month > 12) return 31;
  return new Date(year, month, 0).getDate();
}

export function isValidDateParts(day: number, month: number, year: number): boolean {
  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
    return false;
  }
  if (year < 1000 || year > 9999 || month < 1 || month > 12 || day < 1) {
    return false;
  }
  return day <= daysInMonth(month, year);
}

export function parseISODate(iso: string): DateParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const parts = {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
  return isValidDateParts(parts.day, parts.month, parts.year) ? parts : null;
}

export function toISODate(parts: DateParts): string {
  const y = String(parts.year).padStart(4, "0");
  const m = String(parts.month).padStart(2, "0");
  const d = String(parts.day).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function clampParts(day: number, month: number, year: number): DateParts {
  const y = Math.min(9999, Math.max(1000, year));
  const m = Math.min(12, Math.max(1, month));
  const d = Math.min(daysInMonth(m, y), Math.max(1, day));
  return { day: d, month: m, year: y };
}

export function partsFromDate(date: Date): DateParts {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

export function dateFromParts(parts: DateParts): Date {
  return new Date(parts.year, parts.month - 1, parts.day);
}

export function isWithinRange(
  parts: DateParts,
  min?: string,
  max?: string,
): boolean {
  const iso = toISODate(parts);
  if (min && iso < min) return false;
  if (max && iso > max) return false;
  return true;
}

export function parseSegment(
  raw: string,
  maxLen: number,
  maxVal: number,
): string {
  const digits = raw.replace(/\D/g, "").slice(0, maxLen);
  if (!digits) return "";
  const n = Number(digits);
  if (n > maxVal) return String(maxVal);
  return digits;
}

export function segmentsToParts(
  dayStr: string,
  monthStr: string,
  yearStr: string,
): DateParts | null {
  if (dayStr.length < 1 || monthStr.length < 1 || yearStr.length < 4) {
    return null;
  }
  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);
  if (!isValidDateParts(day, month, year)) return null;
  return { day, month, year };
}

/** Calendar grid: weeks start Monday */
export function getYearRange(min?: string, max?: string): number[] {
  const now = new Date().getFullYear();
  let start = now - 60;
  let end = now + 10;

  if (min) {
    const p = parseISODate(min);
    if (p) start = Math.max(start, p.year);
  }
  if (max) {
    const p = parseISODate(max);
    if (p) end = Math.min(end, p.year);
  }

  if (start > end) return [now];

  const years: number[] = [];
  for (let y = start; y <= end; y++) years.push(y);
  return years;
}

export function getCalendarDays(viewYear: number, viewMonth: number): (Date | null)[] {
  const first = new Date(viewYear, viewMonth - 1, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const totalDays = daysInMonth(viewMonth, viewYear);
  const cells: (Date | null)[] = [];

  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) {
    cells.push(new Date(viewYear, viewMonth - 1, d));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

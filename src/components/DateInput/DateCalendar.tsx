import { motion } from "framer-motion";
import { useMemo } from "react";
import { usePopMotion } from "../../motion/reducedMotion";
import { cn } from "../../utils/cn";
import {
  getCalendarDays,
  partsFromDate,
  toISODate,
  type DateParts,
} from "./dateUtils";
import styles from "./DateCalendar.module.css";
import { YearScroller } from "./YearScroller";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface DateCalendarProps {
  id?: string;
  viewParts: DateParts;
  selected?: DateParts | null;
  onSelect: (parts: DateParts) => void;
  onViewChange: (parts: DateParts) => void;
  min?: string;
  max?: string;
}

function isDayDisabled(date: Date, min?: string, max?: string) {
  const iso = toISODate(partsFromDate(date));
  if (min && iso < min) return true;
  if (max && iso > max) return true;
  return false;
}

export function DateCalendar({
  id,
  viewParts,
  selected,
  onSelect,
  onViewChange,
  min,
  max,
}: DateCalendarProps) {
  const cells = useMemo(
    () => getCalendarDays(viewParts.year, viewParts.month),
    [viewParts.year, viewParts.month],
  );

  const prevMonth = () => {
    const m = viewParts.month <= 1 ? 1 : viewParts.month - 1;
    onViewChange({ ...viewParts, month: m });
  };

  const nextMonth = () => {
    const m = viewParts.month >= 12 ? 12 : viewParts.month + 1;
    onViewChange({ ...viewParts, month: m });
  };

  const setYear = (year: number) => {
    onViewChange({ ...viewParts, year });
  };

  const selectedISO = selected ? toISODate(selected) : null;
  const todayISO = toISODate(partsFromDate(new Date()));
  const pop = usePopMotion();

  return (
    <motion.div
      id={id}
      className={styles.calendar}
      role="dialog"
      aria-label="Choose date"
      initial={pop.initial}
      animate={pop.animate}
      exit={pop.exit}
      transition={pop.transition}
    >
      <div className={styles.body}>
        <div className={styles.main}>
          <div className={styles.header}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={prevMonth}
              disabled={viewParts.month <= 1}
              aria-label="Previous month"
            >
              ‹
            </button>
            <span className={styles.monthLabel}>
              {MONTHS[viewParts.month - 1]}
            </span>
            <button
              type="button"
              className={styles.navBtn}
              onClick={nextMonth}
              disabled={viewParts.month >= 12}
              aria-label="Next month"
            >
              ›
            </button>
          </div>
          <div className={styles.weekdays}>
            {WEEKDAYS.map((d) => (
              <span key={d} className={styles.weekday}>
                {d}
              </span>
            ))}
          </div>
          <div className={styles.grid}>
            {cells.map((date, i) => {
              if (!date) {
                return (
                  <span key={`empty-${i}`} className={cn(styles.day, styles.dayOutside)} />
                );
              }
              const iso = toISODate(partsFromDate(date));
              const disabled = isDayDisabled(date, min, max);
              return (
                <button
                  key={iso}
                  type="button"
                  className={cn(
                    styles.day,
                    selectedISO === iso && styles.daySelected,
                    todayISO === iso && styles.dayToday,
                  )}
                  disabled={disabled}
                  onClick={() => onSelect(partsFromDate(date))}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
        <YearScroller
          year={viewParts.year}
          min={min}
          max={max}
          onYearChange={setYear}
        />
      </div>
    </motion.div>
  );
}

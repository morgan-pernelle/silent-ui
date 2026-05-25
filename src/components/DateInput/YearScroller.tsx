import { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";
import { getYearRange } from "./dateUtils";
import styles from "./DateCalendar.module.css";

export interface YearScrollerProps {
  year: number;
  min?: string;
  max?: string;
  onYearChange: (year: number) => void;
}

export function YearScroller({ year, min, max, onYearChange }: YearScrollerProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const years = getYearRange(min, max);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector(`[data-year="${year}"]`);
    if (active) {
      active.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, [year]);

  return (
    <div className={styles.yearColumn}>
      <div className={styles.yearFadeTop} aria-hidden />
      <div ref={listRef} className={styles.yearList} role="listbox" aria-label="Year">
        {years.map((y) => (
          <button
            key={y}
            type="button"
            role="option"
            data-year={y}
            aria-selected={y === year}
            className={cn(styles.yearItem, y === year && styles.yearItemSelected)}
            onClick={() => onYearChange(y)}
          >
            {y}
          </button>
        ))}
      </div>
      <div className={styles.yearFadeBottom} aria-hidden />
    </div>
  );
}

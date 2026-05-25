import { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";
import styles from "./TimePicker.module.css";

export interface TimeColumnProps {
  values: number[];
  selected: number;
  onSelect: (value: number) => void;
  label: string;
  format?: (value: number) => string;
}

export function TimeColumn({
  values,
  selected,
  onSelect,
  label,
  format = (v) => String(v).padStart(2, "0"),
}: TimeColumnProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector(`[data-value="${selected}"]`);
    if (active) {
      active.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, [selected]);

  return (
    <div className={styles.column}>
      <div className={styles.fadeTop} aria-hidden />
      <div ref={listRef} className={styles.list} role="listbox" aria-label={label}>
        {values.map((v) => (
          <button
            key={v}
            type="button"
            role="option"
            data-value={v}
            aria-selected={v === selected}
            className={cn(styles.item, v === selected && styles.itemSelected)}
            onClick={() => onSelect(v)}
          >
            {format(v)}
          </button>
        ))}
      </div>
      <div className={styles.fadeBottom} aria-hidden />
    </div>
  );
}

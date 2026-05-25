import { motion } from "framer-motion";
import { usePopMotion } from "../../motion/reducedMotion";
import { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";
import type { SelectOption } from "./Select";
import styles from "./SelectMenu.module.css";

export interface SelectMenuProps {
  id?: string;
  options: SelectOption[];
  value?: string;
  focusedIndex: number;
  onSelect: (value: string) => void;
  onFocusIndex: (index: number) => void;
}

export function SelectMenu({
  id,
  options,
  value,
  focusedIndex,
  onSelect,
  onFocusIndex,
}: SelectMenuProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const pop = usePopMotion();

  useEffect(() => {
    const list = listRef.current;
    if (!list || focusedIndex < 0) return;
    const row = list.children[focusedIndex] as HTMLElement | undefined;
    const focusable =
      row?.querySelector<HTMLElement>("button") ?? row;
    if (typeof focusable?.scrollIntoView === "function") {
      focusable.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  return (
    <motion.div
      id={id}
      className={styles.menu}
      role="listbox"
      aria-label="Options"
      initial={pop.initial}
      animate={pop.animate}
      exit={pop.exit}
      transition={pop.transition}
    >
      <ul ref={listRef} className={styles.list}>
        {options.map((opt, index) => (
          <li key={opt.value}>
            <button
              type="button"
              role="option"
              aria-selected={opt.value === value}
              disabled={opt.disabled}
              className={cn(
                styles.item,
                opt.value === value && styles.itemSelected,
                index === focusedIndex && styles.itemFocused,
              )}
              onMouseEnter={() => onFocusIndex(index)}
              onClick={() => onSelect(opt.value)}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

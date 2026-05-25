import { AnimatePresence, motion } from "framer-motion";
import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import { usePopMotion } from "../../motion/reducedMotion";
import { cn } from "../../utils/cn";
import styles from "./Dropdown.module.css";

export interface DropdownItem {
  id: string;
  label: string;
  disabled?: boolean;
  dividerBefore?: boolean;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  onSelect: (id: string) => void;
  selectedId?: string;
  align?: "start" | "end";
  className?: string;
}

export function Dropdown({
  trigger,
  items,
  onSelect,
  selectedId,
  align = "start",
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const pop = usePopMotion({ opacity: 0, y: -6, scale: 0.98 }, 0.2);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: globalThis.MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const toggle = () => setOpen((o) => !o);

  const triggerNode = isValidElement(trigger)
    ? cloneElement(trigger as ReactElement<Record<string, unknown>>, {
        onClick: (e: ReactMouseEvent<HTMLElement>) => {
          (trigger.props as { onClick?: (ev: ReactMouseEvent<HTMLElement>) => void })
            .onClick?.(e);
          toggle();
        },
        onKeyDown: (e: ReactKeyboardEvent<HTMLElement>) => {
          (trigger.props as { onKeyDown?: (ev: ReactKeyboardEvent<HTMLElement>) => void })
            .onKeyDown?.(e);
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        },
        "aria-haspopup": "menu",
        "aria-expanded": open,
        "aria-controls": menuId,
      })
    : (
        <button
          type="button"
          className={styles.fallbackTrigger}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={toggle}
        >
          {trigger}
        </button>
      );

  return (
    <div ref={rootRef} className={cn(styles.root, className)}>
      {triggerNode}
      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            className={cn(
              styles.menu,
              align === "end" ? styles.alignEnd : styles.alignStart,
            )}
            initial={pop.initial}
            animate={pop.animate}
            exit={pop.exit}
            transition={pop.transition}
          >
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.id}>
                  {item.dividerBefore && <div className={styles.divider} />}
                  <button
                    type="button"
                    role="menuitem"
                    className={cn(
                      styles.item,
                      selectedId === item.id && styles.itemSelected,
                    )}
                    disabled={item.disabled}
                    onClick={() => {
                      onSelect(item.id);
                      close();
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

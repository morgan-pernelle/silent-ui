import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useHeightMotion } from "../../motion/reducedMotion";
import { cn } from "../../utils/cn";
import styles from "./Accordion.module.css";

type AccordionType = "single" | "multiple";

interface AccordionContextValue {
  open: string[];
  toggle: (id: string) => void;
  type: AccordionType;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps {
  type?: AccordionType;
  defaultValue?: string | string[];
  children: ReactNode;
  className?: string;
}

export function Accordion({
  type = "single",
  defaultValue = [],
  children,
  className,
}: AccordionProps) {
  const initial = Array.isArray(defaultValue)
    ? defaultValue
    : defaultValue
      ? [defaultValue]
      : [];
  const [open, setOpen] = useState<string[]>(initial);

  const toggle = (id: string) => {
    setOpen((prev) => {
      const isOpen = prev.includes(id);
      if (type === "single") return isOpen ? [] : [id];
      return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  return (
    <AccordionContext.Provider value={{ open, toggle, type }}>
      <div className={cn(styles.accordion, className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  const ctx = useContext(AccordionContext)!;
  const isOpen = ctx.open.includes(value);

  return (
    <div className={cn(styles.item, isOpen && styles.open)} data-value={value}>
      {children}
    </div>
  );
}

export function AccordionTrigger({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  const ctx = useContext(AccordionContext)!;
  const isOpen = ctx.open.includes(value);

  return (
    <button
      type="button"
      className={styles.trigger}
      aria-expanded={isOpen}
      onClick={() => ctx.toggle(value)}
    >
      {children}
      <span className={styles.icon} aria-hidden>
        +
      </span>
    </button>
  );
}

export function AccordionContent({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  const ctx = useContext(AccordionContext)!;
  const isOpen = ctx.open.includes(value);
  const heightMotion = useHeightMotion();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          className={styles.content}
          initial={heightMotion.initial}
          animate={heightMotion.animate}
          exit={heightMotion.exit}
          transition={heightMotion.transition}
        >
          <div className={styles.inner}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

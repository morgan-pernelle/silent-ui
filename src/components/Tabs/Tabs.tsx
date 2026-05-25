import { motion } from "framer-motion";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useMotionTransition } from "../../motion/reducedMotion";
import { cn } from "../../utils/cn";
import styles from "./Tabs.module.css";

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({
  defaultValue,
  value: controlled,
  onValueChange,
  children,
  className,
}: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const value = controlled ?? internal;

  const setValue = (v: string) => {
    setInternal(v);
    onValueChange?.(v);
  };

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn(styles.tabs, className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div role="tablist" className={cn(styles.list, className)}>{children}</div>;
}

export interface TabProps {
  value: string;
  children: ReactNode;
}

export function Tab({ value, children }: TabProps) {
  const ctx = useContext(TabsContext)!;
  const active = ctx.value === value;
  const indicatorTransition = useMotionTransition({
    duration: 0.4,
    ease: [0.16, 1, 0.3, 1],
  });

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      data-active={active}
      className={styles.tab}
      onClick={() => ctx.setValue(value)}
    >
      {children}
      {active && (
        <motion.span
          className={styles.indicator}
          layoutId="silent-tab-indicator"
          transition={indicatorTransition}
        />
      )}
    </button>
  );
}

export function TabPanel({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(TabsContext)!;
  if (ctx.value !== value) return null;

  return (
    <div role="tabpanel" className={cn(styles.panel, className)} tabIndex={0}>
      {children}
    </div>
  );
}

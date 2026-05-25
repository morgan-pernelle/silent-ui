import { motion } from "framer-motion";
import { usePopMotion } from "../../motion/reducedMotion";
import { useMemo } from "react";
import { TimeColumn } from "./TimeColumn";
import {
  getHourRange,
  getMinuteRange,
  snapMinuteToStep,
  type TimeParts,
} from "./timeUtils";
import styles from "./TimePicker.module.css";

export interface TimePickerProps {
  viewParts: TimeParts;
  onViewChange: (parts: TimeParts) => void;
  onSelect: (parts: TimeParts) => void;
}

export function TimePicker({ viewParts, onViewChange, onSelect }: TimePickerProps) {
  const hours = useMemo(() => getHourRange(), []);
  const minutes = useMemo(() => getMinuteRange(), []);

  const setHour = (hour: number) => {
    const next = { ...viewParts, hour };
    onViewChange(next);
    onSelect(next);
  };

  const setMinute = (minute: number) => {
    const next = { ...viewParts, minute };
    onViewChange(next);
    onSelect(next);
  };

  const pop = usePopMotion();

  return (
    <motion.div
      className={styles.picker}
      role="dialog"
      aria-label="Choose time"
      initial={pop.initial}
      animate={pop.animate}
      exit={pop.exit}
      transition={pop.transition}
    >
      <div className={styles.body}>
        <TimeColumn
          values={hours}
          selected={viewParts.hour}
          onSelect={setHour}
          label="Hour"
        />
        <span className={styles.sep} aria-hidden>
          :
        </span>
        <TimeColumn
          values={minutes}
          selected={snapMinuteToStep(viewParts.minute)}
          onSelect={setMinute}
          label="Minute"
        />
      </div>
    </motion.div>
  );
}

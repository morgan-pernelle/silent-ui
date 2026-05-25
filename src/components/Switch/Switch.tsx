import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import styles from "./Switch.module.css";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch({ label, className, id, ...props }, ref) {
    const inputId = id ?? `switch-${label?.replace(/\s/g, "-")}`;

    return (
      <label className={cn(styles.switch, className)} htmlFor={inputId}>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          className={styles.input}
          {...props}
        />
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  },
);

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, className, id, ...props }, ref) {
    const inputId = id ?? `checkbox-${label?.replace(/\s/g, "-")}`;

    return (
      <label className={cn(styles.checkbox, className)} htmlFor={inputId}>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={styles.input}
          {...props}
        />
        <span className={styles.box}>
          <span className={styles.check} aria-hidden>
            ✓
          </span>
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  },
);

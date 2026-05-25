import {
  createContext,
  forwardRef,
  useContext,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import styles from "./Radio.module.css";

interface RadioGroupContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  name: string;
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  children: ReactNode;
  className?: string;
}

export function RadioGroup({
  name,
  value,
  onValueChange,
  label,
  children,
  className,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange: onValueChange }}>
      <div role="radiogroup" className={cn(styles.group, className)} aria-label={label}>
        {label && <div className={styles.groupLabel}>{label}</div>}
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "name"> {
  value: string;
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  function Radio({ value, label, className, id, ...props }, ref) {
    const ctx = useContext(RadioGroupContext);
    const inputId = id ?? `radio-${value}`;

    if (!ctx) {
      throw new Error("Radio must be used within RadioGroup");
    }

    return (
      <label className={cn(styles.radio, className)} htmlFor={inputId}>
        <input
          ref={ref}
          id={inputId}
          type="radio"
          name={ctx.name}
          value={value}
          checked={ctx.value === value}
          onChange={() => ctx.onChange(value)}
          className={styles.input}
          {...props}
        />
        <span className={styles.circle}>
          <span className={styles.dot} aria-hidden />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  },
);

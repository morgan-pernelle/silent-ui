import { useCallback, type ChangeEvent } from "react";
import { cn } from "../../utils/cn";
import styles from "./QuantityInput.module.css";

export interface QuantityInputProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  className?: string;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function QuantityInput({
  value,
  onValueChange,
  min = 1,
  max = 99,
  step = 1,
  label,
  disabled,
  className,
}: QuantityInputProps) {
  const setValue = useCallback(
    (next: number) => onValueChange(clamp(next, min, max)),
    [min, max, onValueChange],
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw === "") return;
    setValue(Number(raw));
  };

  return (
    <div className={cn(styles.field, className)}>
      {label && <span className={styles.label}>{label}</span>}
      <div
        className={cn(styles.control, disabled && styles.controlDisabled)}
        role="group"
        aria-label={label ?? "Quantity"}
      >
        <button
          type="button"
          className={styles.btn}
          disabled={disabled || value <= min}
          aria-label="Decrease quantity"
          onClick={() => setValue(value - step)}
        >
          −
        </button>
        <input
          type="text"
          inputMode="numeric"
          className={styles.input}
          value={value}
          disabled={disabled}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          onChange={onInputChange}
        />
        <button
          type="button"
          className={styles.btn}
          disabled={disabled || value >= max}
          aria-label="Increase quantity"
          onClick={() => setValue(value + step)}
        >
          +
        </button>
      </div>
    </div>
  );
}

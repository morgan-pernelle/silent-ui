import { cn } from "../../utils/cn";
import styles from "./Rating.module.css";

export interface RatingProps {
  value: number;
  onValueChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

export function Rating({
  value,
  onValueChange,
  max = 5,
  readOnly = false,
  size = "md",
  label,
  className,
}: RatingProps) {
  const interactive = !readOnly && onValueChange != null;

  return (
    <div
      className={cn(
        styles.rating,
        styles[size],
        readOnly && styles.readonly,
        className,
      )}
      role={interactive ? undefined : "img"}
      aria-label={label ?? `${value} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= Math.round(value);
        return (
          <button
            key={starValue}
            type="button"
            className={cn(styles.star, filled && styles.starFilled)}
            disabled={!interactive}
            aria-label={interactive ? `Rate ${starValue} stars` : undefined}
            aria-hidden={!interactive}
            tabIndex={interactive ? 0 : -1}
            onClick={() => onValueChange?.(starValue)}
          >
            ★
          </button>
        );
      })}
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}

import { cn } from "../../utils/cn";
import styles from "./Chip.module.css";

export interface ChipProps {
  label: string;
  onRemove?: () => void;
  disabled?: boolean;
  variant?: "soft" | "outline";
  className?: string;
}

export function Chip({
  label,
  onRemove,
  disabled,
  variant = "soft",
  className,
}: ChipProps) {
  return (
    <span
      className={cn(
        styles.chip,
        variant === "outline" && styles.outline,
        disabled && styles.disabled,
        className,
      )}
    >
      <span className={styles.label}>{label}</span>
      {onRemove && (
        <button
          type="button"
          className={styles.remove}
          disabled={disabled}
          aria-label={`Remove ${label}`}
          onClick={onRemove}
        >
          ×
        </button>
      )}
    </span>
  );
}

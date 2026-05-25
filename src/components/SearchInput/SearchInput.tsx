import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import fieldStyles from "../../styles/fieldControl.module.css";
import type { FieldProps } from "../Input/Input";
import styles from "./SearchInput.module.css";

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
    FieldProps {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      label,
      hint,
      error,
      className,
      id,
      value,
      defaultValue,
      onClear,
      disabled,
      placeholder = "Search...",
      ...props
    },
    ref,
  ) {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-") ?? "search";
    const currentValue = value ?? defaultValue ?? "";
    const hasValue = String(currentValue).length > 0;

    return (
      <div className={cn(styles.field, className)}>
        <label
          htmlFor={inputId}
          className={cn(
            fieldStyles.controlWrap,
            styles.controlInner,
            error && fieldStyles.controlError,
            disabled && fieldStyles.controlWrapDisabled,
          )}
        >
          {label && <span className={fieldStyles.controlLabel}>{label}</span>}
          <span className={styles.inner}>
            <span className={styles.icon} aria-hidden>
              ⌕
            </span>
            <input
              ref={ref}
              id={inputId}
              type="search"
              role="searchbox"
              className={styles.input}
              placeholder={placeholder}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
              aria-invalid={!!error}
              {...props}
            />
            {hasValue && onClear && (
              <button
                type="button"
                className={styles.clear}
                data-field-action
                onClick={onClear}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </span>
        </label>
        {error && (
          <span className={styles.errorText} role="alert">
            {error}
          </span>
        )}
        {hint && !error && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  },
);

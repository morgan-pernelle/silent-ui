import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import fieldStyles from "../../styles/fieldControl.module.css";
import styles from "./Input.module.css";

export interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
}

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    FieldProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, hint, error, className, id, disabled, ...props }, ref) {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn(styles.field, className)}>
        <label
          htmlFor={inputId}
          className={cn(
            fieldStyles.controlWrap,
            error && fieldStyles.controlError,
            disabled && fieldStyles.controlWrapDisabled,
          )}
        >
          {label && <span className={fieldStyles.controlLabel}>{label}</span>}
          <input
            ref={ref}
            id={inputId}
            className={styles.input}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </label>
        {error && (
          <span id={`${inputId}-error`} className={styles.errorText} role="alert">
            {error}
          </span>
        )}
        {hint && !error && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  },
);

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    FieldProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, hint, error, className, id, disabled, ...props }, ref) {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn(styles.field, className)}>
        <label
          htmlFor={inputId}
          className={cn(
            fieldStyles.controlWrap,
            styles.textareaWrap,
            error && fieldStyles.controlError,
            disabled && fieldStyles.controlWrapDisabled,
          )}
        >
          {label && <span className={fieldStyles.controlLabel}>{label}</span>}
          <textarea
            ref={ref}
            id={inputId}
            className={styles.textarea}
            disabled={disabled}
            aria-invalid={!!error}
            {...props}
          />
        </label>
        {error && <span className={styles.errorText} role="alert">{error}</span>}
        {hint && !error && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  },
);

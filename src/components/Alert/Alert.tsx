import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import styles from "./Alert.module.css";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  onClose?: () => void;
  children: ReactNode;
}

export function Alert({
  variant = "info",
  title,
  onClose,
  className,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(styles.alert, styles[variant], className)}
      {...props}
    >
      <div>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
      {onClose && (
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          ×
        </button>
      )}
    </div>
  );
}

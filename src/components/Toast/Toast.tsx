import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { usePopMotion, useReducedMotion } from "../../motion/reducedMotion";
import styles from "./Toast.module.css";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toast: (item: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const MAX_TOASTS = 5;

let toastId = 0;

function subscribeNoop() {
  return () => {};
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (item: Omit<ToastItem, "id">) => {
      const id = `toast-${++toastId}`;
      const entry: ToastItem = { ...item, id };
      setToasts((prev) => {
        const next = [...prev, entry];
        return next.length > MAX_TOASTS ? next.slice(-MAX_TOASTS) : next;
      });
      const duration = item.duration ?? 4000;
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div className={styles.container} aria-live="polite">
            <AnimatePresence>
              {toasts.map((t) => (
                <ToastMotion key={t.id} item={t} onDismiss={() => dismiss(t.id)} />
              ))}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

function ToastMotion({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: () => void;
}) {
  const reduced = useReducedMotion();
  const enter = usePopMotion({ opacity: 0, y: 16, scale: 0.96 });
  const exitState = reduced
    ? { opacity: 0 }
    : { opacity: 0, x: 24 };

  return (
    <motion.div
      className={styles.toast}
      initial={enter.initial}
      animate={enter.animate}
      exit={exitState}
      transition={enter.transition}
    >
      <div className={styles.body}>
        <div className={styles.title}>{item.title}</div>
        {item.description && (
          <div className={styles.desc}>{item.description}</div>
        )}
      </div>
      <button
        type="button"
        className={styles.close}
        onClick={onDismiss}
        aria-label="Close"
      >
        ×
      </button>
    </motion.div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

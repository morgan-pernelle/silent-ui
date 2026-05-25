import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import {
  useFadeOverlayMotion,
  useSlidePanelMotion,
} from "../../motion/reducedMotion";
import { fadeVariants } from "../../motion/variants";
import { cn } from "../../utils/cn";
import { Heading } from "../Text/Text";
import styles from "./Drawer.module.css";

const panelMotion = {
  right: {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  },
  left: {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  },
} as const;

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  side?: "left" | "right";
  width?: number | string;
  footer?: ReactNode;
  /** Removes body padding and enables flex fill for full-height nav panels */
  bodyFlush?: boolean;
  children: ReactNode;
}

export function Drawer({
  open,
  onClose,
  title,
  side = "right",
  width,
  footer,
  bodyFlush,
  children,
}: DrawerProps) {
  const panelRef = useRef<HTMLElement>(null);
  const fadeOverlay = useFadeOverlayMotion();
  const slidePanel = useSlidePanelMotion();
  useFocusTrap(open, panelRef);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  const panelStyle: CSSProperties | undefined = width
    ? { width: typeof width === "number" ? `${width}px` : width }
    : undefined;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.backdrop}
            variants={fadeVariants}
            initial={fadeOverlay.initial}
            animate={fadeOverlay.animate}
            exit={fadeOverlay.exit}
            transition={fadeOverlay.transition}
            onClick={onClose}
            role="presentation"
          />
          <motion.aside
            ref={panelRef}
            className={cn(
              styles.panel,
              side === "left" ? styles.left : styles.right,
            )}
            style={panelStyle}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelMotion[side]}
            transition={slidePanel.transition}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "drawer-title" : undefined}
          >
            <div className={styles.header}>
              {title ? (
                <Heading level={3} id="drawer-title">
                  {title}
                </Heading>
              ) : (
                <span />
              )}
              <button
                type="button"
                className={styles.close}
                onClick={onClose}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className={cn(styles.body, bodyFlush && styles.bodyFlush)}>
              {children}
            </div>
            {footer && <div className={styles.footer}>{footer}</div>}
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

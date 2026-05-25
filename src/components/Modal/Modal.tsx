import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import {
  useFadeOverlayMotion,
  useScalePanelMotion,
} from "../../motion/reducedMotion";
import { fadeVariants, scaleVariants } from "../../motion/variants";
import { Heading } from "../Text/Text";
import styles from "./Modal.module.css";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const fadeOverlay = useFadeOverlayMotion();
  const scalePanel = useScalePanelMotion();
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

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          variants={fadeVariants}
          initial={fadeOverlay.initial}
          animate={fadeOverlay.animate}
          exit={fadeOverlay.exit}
          transition={fadeOverlay.transition}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={panelRef}
            className={styles.panel}
            variants={scaleVariants}
            initial={scalePanel.initial}
            animate={scalePanel.animate}
            exit={scalePanel.exit}
            transition={scalePanel.transition}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
          >
            <div className={styles.header}>
                {title ? (
                  <Heading level={3} id="modal-title">
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
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

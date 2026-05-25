import { motion } from "framer-motion";
import { useEffect, useState, type HTMLAttributes, type ImgHTMLAttributes, type ReactNode } from "react";
import { useReducedMotion, useScrollRevealMotion } from "../../motion/reducedMotion";
import { scaleVariants } from "../../motion/variants";
import radiusStyles from "../../styles/radius.module.css";
import type { SilentRadius } from "../../styles/radius";
import { cn } from "../../utils/cn";
import styles from "./Card.module.css";

const radiusClass: Record<SilentRadius, string> = {
  none: radiusStyles.none,
  sm: radiusStyles.sm,
  md: radiusStyles.md,
  lg: radiusStyles.lg,
  full: radiusStyles.full,
};

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  compact?: boolean;
  /** Optional corner radius override. */
  radius?: SilentRadius;
}

export function Card({
  interactive,
  compact,
  radius,
  className,
  children,
  ...props
}: CardProps) {
  const reveal = useScrollRevealMotion();
  const reducedMotion = useReducedMotion();
  return (
    <motion.article
      data-silent-card
      className={cn(
        styles.card,
        radius && radiusClass[radius],
        interactive && styles.interactive,
        compact && styles.compact,
        className,
      )}
      variants={scaleVariants}
      initial={reveal.initial}
      whileInView={reveal.whileInView}
      viewport={reveal.viewport ?? { once: true, margin: "-40px" }}
      whileHover={
        interactive && !reducedMotion ? { y: -2 } : undefined
      }
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      }
      {...(props as object)}
    >
      {children}
    </motion.article>
  );
}

const CARD_MEDIA_FALLBACK =
  "https://picsum.photos/seed/silent-ui-card/800/500";

export function CardMedia({
  src,
  alt,
  onError,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div className={styles.media}>
      <img
        src={imgSrc}
        alt={alt ?? ""}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={(e) => {
          onError?.(e);
          if (imgSrc !== CARD_MEDIA_FALLBACK) setImgSrc(CARD_MEDIA_FALLBACK);
        }}
        {...props}
      />
      <div className={styles.overlay} aria-hidden />
    </div>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(styles.body, className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(styles.footer, className)}>{children}</div>;
}

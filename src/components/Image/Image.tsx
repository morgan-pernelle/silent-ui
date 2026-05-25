import { motion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ImgHTMLAttributes,
  type SyntheticEvent,
} from "react";
import { useScrollRevealMotion } from "../../motion/reducedMotion";
import { fadeVariants } from "../../motion/variants";
import radiusStyles from "../../styles/radius.module.css";
import type { SilentRadius } from "../../styles/radius";
import { cn } from "../../utils/cn";
import styles from "./Image.module.css";

const DEFAULT_FALLBACK =
  "https://picsum.photos/seed/silent-ui-fallback/800/600";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  aspect?: "wide" | "square" | "portrait";
  /** object-fit: cover — always on when `aspect` is set; optional without aspect. */
  cover?: boolean;
  reveal?: boolean;
  fallbackSrc?: string;
  radius?: SilentRadius;
}

const aspectClass = {
  wide: styles.aspectWide,
  square: styles.aspectSquare,
  portrait: styles.aspectPortrait,
} as const;

const radiusClass: Record<SilentRadius, string> = {
  none: radiusStyles.none,
  sm: radiusStyles.sm,
  md: radiusStyles.md,
  lg: radiusStyles.lg,
  full: radiusStyles.full,
};

export function Image({
  aspect,
  cover,
  reveal = true,
  fallbackSrc = DEFAULT_FALLBACK,
  radius,
  className,
  onLoad,
  onError,
  src,
  alt = "",
  style,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);
  const framed = Boolean(aspect);
  const revealMotion = useScrollRevealMotion();

  useEffect(() => {
    setImgSrc(src);
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [imgSrc]);

  const markLoaded = (e: SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true);
    onLoad?.(e);
  };

  return (
    <motion.div
      className={cn(
        styles.wrapper,
        framed ? styles.framed : styles.intrinsic,
        framed && aspect && aspectClass[aspect],
        !framed && cover && styles.cover,
        reveal && styles.reveal,
        loaded && styles.loaded,
        radius && radiusClass[radius],
        className,
      )}
      style={style}
      variants={fadeVariants}
      initial={reveal ? revealMotion.initial : false}
      whileInView={reveal ? revealMotion.whileInView : undefined}
      viewport={
        reveal
          ? (revealMotion.viewport ?? { once: true, amount: 0.15 })
          : undefined
      }
    >
      <img
        ref={imgRef}
        alt={alt}
        src={imgSrc}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={markLoaded}
        onError={(e) => {
          onError?.(e);
          if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
          }
        }}
        {...props}
      />
    </motion.div>
  );
}

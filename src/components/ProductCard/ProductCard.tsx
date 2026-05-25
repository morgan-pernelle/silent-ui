import { motion } from "framer-motion";
import {
  useReducedMotion,
  useScrollRevealMotion,
} from "../../motion/reducedMotion";
import { scaleVariants } from "../../motion/variants";
import type { SilentRadius } from "../../styles/radius";
import radiusStyles from "../../styles/radius.module.css";
import { cn } from "../../utils/cn";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { Image } from "../Image/Image";
import { Rating } from "../Rating/Rating";
import styles from "./ProductCard.module.css";

const radiusClass: Record<SilentRadius, string> = {
  none: radiusStyles.none,
  sm: radiusStyles.sm,
  md: radiusStyles.md,
  lg: radiusStyles.lg,
  full: radiusStyles.full,
};

export interface ProductCardProps {
  title: string;
  price: string;
  imageSrc: string;
  imageAlt?: string;
  href?: string;
  compareAtPrice?: string;
  badge?: string;
  rating?: number;
  /** Called when "Add" is clicked; omit to hide the button */
  onAddToCart?: () => void;
  addLabel?: string;
  interactive?: boolean;
  radius?: SilentRadius;
  className?: string;
}

export function ProductCard({
  title,
  price,
  imageSrc,
  imageAlt,
  href,
  compareAtPrice,
  badge,
  rating,
  onAddToCart,
  addLabel = "Add",
  interactive = true,
  radius,
  className,
}: ProductCardProps) {
  const reveal = useScrollRevealMotion();
  const reducedMotion = useReducedMotion();
  const content = (
    <>
      <div className={styles.mediaWrap}>
        {badge && (
          <Badge variant="solid" className={styles.badge}>
            {badge}
          </Badge>
        )}
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          aspect="portrait"
          reveal={false}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.prices}>
          <span className={styles.price}>{price}</span>
          {compareAtPrice && (
            <span className={styles.compareAt}>{compareAtPrice}</span>
          )}
        </div>
      </div>
    </>
  );

  return (
    <motion.article
      className={cn(
        styles.card,
        interactive && styles.interactive,
        radius && radiusClass[radius],
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
    >
      {href ? (
        <a href={href} className={styles.link}>
          {content}
        </a>
      ) : (
        content
      )}
      {(rating != null || onAddToCart) && (
        <div className={styles.footer}>
          {rating != null ? (
            <Rating value={rating} readOnly size="sm" className={styles.rating} />
          ) : (
            <span />
          )}
          {onAddToCart && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart();
              }}
            >
              {addLabel}
            </Button>
          )}
        </div>
      )}
    </motion.article>
  );
}

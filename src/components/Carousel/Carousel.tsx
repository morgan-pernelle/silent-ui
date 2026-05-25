import {
  Children,
  useCallback,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import styles from "./Carousel.module.css";

export interface CarouselProps {
  children: ReactNode;
  /** Show prev/next arrows */
  arrows?: boolean;
  /** Show dot indicators */
  dots?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Carousel({
  children,
  arrows = true,
  dots = true,
  className,
  style,
}: CarouselProps) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  if (count === 0) return null;

  return (
    <div
      className={cn(styles.carousel, className)}
      style={style}
      role="region"
      aria-roledescription="carousel"
      aria-label="Gallery"
    >
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
            >
              <div className={styles.slideInner}>{slide}</div>
            </div>
          ))}
        </div>
        {arrows && count > 1 && (
          <>
            <button
              type="button"
              className={cn(styles.nav, styles.prev)}
              aria-label="Previous slide"
              onClick={() => go(index - 1)}
            >
              ‹
            </button>
            <button
              type="button"
              className={cn(styles.nav, styles.next)}
              aria-label="Next slide"
              onClick={() => go(index + 1)}
            >
              ›
            </button>
          </>
        )}
      </div>
      {dots && count > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Slides">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              className={cn(styles.dot, i === index && styles.dotActive)}
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === index}
              onClick={() => go(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useFadeOverlayMotion } from "../../motion/reducedMotion";
import { fadeVariants } from "../../motion/variants";
import { cn } from "../../utils/cn";
import { Carousel } from "../Carousel/Carousel";
import { Grid } from "../Layout/Layout";
import { Image } from "../Image/Image";
import styles from "./ProductGallery.module.css";

export interface ProductGalleryImage {
  src: string;
  alt?: string;
}

export type ProductGalleryLayout =
  | "grid-2x2"
  | "grid"
  | "main-thumbs"
  | "carousel";

export interface ProductGalleryProps {
  images: ProductGalleryImage[];
  layout?: ProductGalleryLayout;
  /** Thumbnail columns when layout is main-thumbs */
  thumbCols?: 2 | 3 | 4;
  aspect?: "wide" | "square" | "portrait";
  selectedIndex?: number;
  defaultSelectedIndex?: number;
  onSelect?: (index: number) => void;
  /** Open fullscreen viewer on image click */
  lightbox?: boolean;
  className?: string;
  style?: CSSProperties;
}

interface LightboxProps {
  open: boolean;
  images: ProductGalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

function GalleryLightbox({
  open,
  images,
  index,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const count = images.length;
  const fadeOverlay = useFadeOverlayMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + count) % count);
      if (e.key === "ArrowRight") onIndexChange((index + 1) % count);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, index, count, onClose, onIndexChange]);

  if (typeof document === "undefined" || count === 0) return null;

  const current = images[index];

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.lightboxBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label="Product image gallery"
          variants={fadeVariants}
          initial={fadeOverlay.initial}
          animate={fadeOverlay.animate}
          exit={fadeOverlay.exit}
          transition={fadeOverlay.transition}
          onClick={onClose}
        >
          <div
            className={styles.lightboxInner}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.lightboxClose}
              aria-label="Close gallery"
              onClick={onClose}
            >
              ×
            </button>
            {count > 1 && (
              <>
                <button
                  type="button"
                  className={cn(styles.lightboxNav, styles.lightboxPrev)}
                  aria-label="Previous image"
                  onClick={() => onIndexChange((index - 1 + count) % count)}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className={cn(styles.lightboxNav, styles.lightboxNext)}
                  aria-label="Next image"
                  onClick={() => onIndexChange((index + 1) % count)}
                >
                  ›
                </button>
                <span className={styles.lightboxCounter}>
                  {index + 1} / {count}
                </span>
              </>
            )}
            <Image
              src={current.src}
              alt={current.alt ?? `Image ${index + 1}`}
              aspect="square"
              reveal={false}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function ProductGallery({
  images,
  layout = "main-thumbs",
  thumbCols = 4,
  aspect = "square",
  selectedIndex: controlledIndex,
  defaultSelectedIndex = 0,
  onSelect,
  lightbox = false,
  className,
  style,
}: ProductGalleryProps) {
  const [internalIndex, setInternalIndex] = useState(defaultSelectedIndex);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const isControlled = controlledIndex !== undefined;
  const selectedIndex = isControlled ? controlledIndex : internalIndex;

  const setIndex = useCallback(
    (index: number) => {
      if (!isControlled) setInternalIndex(index);
      onSelect?.(index);
    },
    [isControlled, onSelect],
  );

  const openLightbox = (index: number) => {
    setIndex(index);
    setLightboxOpen(true);
  };

  if (!images.length) return null;

  const wrapClick = (index: number, child: ReactNode) => {
    if (!lightbox) return child;
    return (
      <button
        type="button"
        className={styles.gridCell}
        aria-label={`View ${images[index].alt ?? `image ${index + 1}`}`}
        onClick={() => openLightbox(index)}
      >
        {child}
      </button>
    );
  };

  const renderImage = (img: ProductGalleryImage, index: number, key?: string) => (
    <Image
      key={key ?? img.src}
      src={img.src}
      alt={img.alt ?? `Product image ${index + 1}`}
      aspect={aspect}
      reveal={false}
    />
  );

  let content: ReactNode;

  if (layout === "carousel") {
    content = (
      <Carousel arrows dots>
        {images.map((img, i) =>
          lightbox ? (
            <button
              key={img.src}
              type="button"
              className={styles.gridCell}
              aria-label={`View ${img.alt ?? `image ${i + 1}`}`}
              onClick={() => openLightbox(i)}
            >
              {renderImage(img, i)}
            </button>
          ) : (
            renderImage(img, i, img.src)
          ),
        )}
      </Carousel>
    );
  } else if (layout === "grid-2x2" || layout === "grid") {
    const list = layout === "grid-2x2" ? images.slice(0, 4) : images;
    content = (
      <Grid cols={2} gap={2}>
        {list.map((img, i) =>
          wrapClick(i, renderImage(img, i, `${img.src}-${i}`)),
        )}
      </Grid>
    );
  } else {
    const thumbClass =
      thumbCols === 2
        ? styles.thumbsCols2
        : thumbCols === 3
          ? styles.thumbsCols3
          : styles.thumbsCols4;

    content = (
      <>
        <div className={styles.main}>
          {lightbox ? (
            <button
              type="button"
              className={styles.gridCell}
              aria-label={`View ${images[selectedIndex]?.alt ?? "selected image"}`}
              onClick={() => openLightbox(selectedIndex)}
            >
              {renderImage(images[selectedIndex], selectedIndex)}
            </button>
          ) : (
            renderImage(images[selectedIndex], selectedIndex)
          )}
        </div>
        {images.length > 1 && (
          <div className={cn(styles.thumbs, thumbClass)}>
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                className={cn(
                  styles.thumb,
                  i === selectedIndex && styles.thumbSelected,
                )}
                aria-label={`Show ${img.alt ?? `image ${i + 1}`}`}
                aria-current={i === selectedIndex}
                onClick={() => setIndex(i)}
              >
                <Image
                  src={img.src}
                  alt=""
                  aspect="square"
                  reveal={false}
                />
              </button>
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <div className={cn(styles.root, className)} style={style}>
      {content}
      <GalleryLightbox
        open={lightbox && lightboxOpen}
        images={images}
        index={selectedIndex}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setIndex}
      />
    </div>
  );
}

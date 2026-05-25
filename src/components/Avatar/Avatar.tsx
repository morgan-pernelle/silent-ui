import { useEffect, useState, type ImgHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import styles from "./Avatar.module.css";

const AVATAR_FALLBACK = "https://picsum.photos/seed/silent-ui-avatar/400/400";

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: "sm" | "md" | "lg" | "xl";
  fallback?: string;
  name?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Avatar({
  size = "md",
  src,
  alt,
  fallback,
  name,
  className,
  onError,
  ...props
}: AvatarProps) {
  const initials = fallback ?? (name ? getInitials(name) : "?");
  const [imgSrc, setImgSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setFailed(false);
  }, [src]);

  const showImage = imgSrc && !failed;

  return (
    <span className={cn(styles.avatar, styles[size], className)} role="img" aria-label={alt ?? name}>
      {showImage ? (
        <img
          className={styles.img}
          src={imgSrc}
          alt={alt ?? name ?? ""}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(e) => {
            onError?.(e);
            if (imgSrc !== AVATAR_FALLBACK) {
              setImgSrc(AVATAR_FALLBACK);
            } else {
              setFailed(true);
            }
          }}
          {...props}
        />
      ) : (
        initials
      )}
    </span>
  );
}

export function AvatarGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(styles.group, className)}>{children}</div>;
}

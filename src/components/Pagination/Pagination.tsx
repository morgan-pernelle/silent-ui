import { useMemo } from "react";
import { cn } from "../../utils/cn";
import styles from "./Pagination.module.css";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Pages shown on each side of current page */
  siblingCount?: number;
  className?: string;
}

function getPageItems(
  page: number,
  totalPages: number,
  siblingCount: number,
): (number | "ellipsis")[] {
  if (totalPages <= 0) return [];
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: (number | "ellipsis")[] = [1];
  const start = Math.max(2, page - siblingCount);
  const end = Math.min(totalPages - 1, page + siblingCount);

  if (start > 2) items.push("ellipsis");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < totalPages - 1) items.push("ellipsis");

  if (totalPages > 1) items.push(totalPages);
  return items;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const pages = useMemo(
    () => getPageItems(page, totalPages, siblingCount),
    [page, totalPages, siblingCount],
  );

  if (totalPages < 1) return null;

  return (
    <nav className={cn(styles.pagination, className)} aria-label="Pagination">
      <button
        type="button"
        className={cn(styles.btn, styles.nav)}
        disabled={page <= 1}
        aria-label="Previous page"
        onClick={() => onPageChange(page - 1)}
      >
        ‹
      </button>
      <div className={styles.pages}>
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <span key={`e-${i}`} className={styles.ellipsis} aria-hidden>
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={cn(styles.btn, p === page && styles.active)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          ),
        )}
      </div>
      <button
        type="button"
        className={cn(styles.btn, styles.nav)}
        disabled={page >= totalPages}
        aria-label="Next page"
        onClick={() => onPageChange(page + 1)}
      >
        ›
      </button>
    </nav>
  );
}

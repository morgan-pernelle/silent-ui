import { cn } from "../../utils/cn";
import { Image } from "../Image/Image";
import { QuantityInput } from "../QuantityInput/QuantityInput";
import { defaultFormatPrice } from "./cartUtils";
import styles from "./CartItem.module.css";

export interface CartItemProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  /** Unit price (numeric). Line total = unitPrice × quantity when quantity > 1. */
  unitPrice: number;
  formatPrice?: (amount: number) => string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove?: () => void;
  min?: number;
  max?: number;
  className?: string;
}

export function CartItem({
  imageSrc,
  imageAlt,
  title,
  unitPrice,
  formatPrice = defaultFormatPrice,
  quantity,
  onQuantityChange,
  onRemove,
  min = 1,
  max = 99,
  className,
}: CartItemProps) {
  const showLineTotal = quantity > 1;
  const unitLabel = formatPrice(unitPrice);
  const lineTotalLabel = formatPrice(unitPrice * quantity);

  return (
    <article className={cn(styles.item, className)}>
      <div className={styles.media}>
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          aspect="square"
          reveal={false}
        />
      </div>
      <div className={styles.details}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.prices}>
          <span className={styles.unitPrice}>
            {showLineTotal ? `${unitLabel} each` : unitLabel}
          </span>
          {showLineTotal && (
            <span className={styles.lineTotal}>{lineTotalLabel}</span>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        <QuantityInput
          value={quantity}
          onValueChange={onQuantityChange}
          min={min}
          max={max}
        />
        {onRemove && (
          <button
            type="button"
            className={styles.remove}
            onClick={onRemove}
            aria-label={`Remove ${title}`}
          >
            Remove
          </button>
        )}
      </div>
    </article>
  );
}

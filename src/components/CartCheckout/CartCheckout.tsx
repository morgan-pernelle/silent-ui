import { defaultFormatPrice } from "../CartItem/cartUtils";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import { Stack } from "../Layout/Layout";

export interface CartCheckoutProps {
  total: number;
  onCheckout: () => void;
  formatPrice?: (amount: number) => string;
  /** Show subtotal line above the button */
  showSubtotal?: boolean;
  itemCount?: number;
  disabled?: boolean;
}

export function CartCheckout({
  total,
  onCheckout,
  formatPrice = defaultFormatPrice,
  showSubtotal = false,
  itemCount,
  disabled,
}: CartCheckoutProps) {
  const formatted = formatPrice(total);
  const label =
    itemCount != null
      ? `Checkout (${itemCount}) — ${formatted}`
      : `Checkout — ${formatted}`;

  return (
    <Stack gap={3}>
      {showSubtotal && (
        <Text variant="sm" tone="muted" style={{ textAlign: "right" }}>
          Subtotal — {formatted}
        </Text>
      )}
      <Button variant="primary" fullWidth onClick={onCheckout} disabled={disabled}>
        {label}
      </Button>
    </Stack>
  );
}

import type { ReactElement } from "react";
import { ButtonPlayground } from "../components/ButtonPlayground";
import { CardPlayground } from "../components/CardPlayground";
import { SelectPlayground } from "../components/SelectPlayground";

export const playgrounds: Record<string, () => ReactElement> = {
  button: ButtonPlayground,
  select: SelectPlayground,
  card: CardPlayground,
};

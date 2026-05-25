import type { PropDef } from "../components/PropsTable";

export interface ComponentDocMeta {
  id: string;
  name: string;
  category: string;
  description: string;
  importLine: string;
  code: string;
  props: PropDef[];
  /** Hide live preview (e.g. scroll containers — use sidebar as reference) */
  hidePreview?: boolean;
}

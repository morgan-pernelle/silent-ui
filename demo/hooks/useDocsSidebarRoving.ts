import { useCallback, type KeyboardEvent, type RefObject } from "react";

const ITEM_SELECTOR = ".docs-sidebar-link, .docs-sidebar-anchor";

export function useDocsSidebarRoving(navRef: RefObject<HTMLElement | null>) {
  return useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const nav = navRef.current;
      if (!nav) return;

      const items = Array.from(
        nav.querySelectorAll<HTMLElement>(ITEM_SELECTOR),
      );
      if (items.length === 0) return;

      const current = items.indexOf(document.activeElement as HTMLElement);
      let next = current;

      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
          event.preventDefault();
          next = current < 0 ? 0 : (current + 1) % items.length;
          break;
        case "ArrowUp":
        case "ArrowLeft":
          event.preventDefault();
          next =
            current < 0
              ? items.length - 1
              : (current - 1 + items.length) % items.length;
          break;
        case "Home":
          event.preventDefault();
          next = 0;
          break;
        case "End":
          event.preventDefault();
          next = items.length - 1;
          break;
        default:
          return;
      }

      items[next]?.focus();
    },
    [navRef],
  );
}

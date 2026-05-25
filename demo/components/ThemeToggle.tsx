import { useSilentTheme } from "@silent-ui/react";

export function ThemeToggle() {
  const { theme, setTheme } = useSilentTheme();
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      Go {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}

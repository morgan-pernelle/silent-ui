import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SilentTheme } from "./types";
import "../styles/global.css";

interface SilentProviderProps {
  children: ReactNode;
  theme?: SilentTheme;
  defaultTheme?: SilentTheme;
  className?: string;
}

interface SilentContextValue {
  theme: SilentTheme;
  setTheme: (theme: SilentTheme) => void;
}

const SilentContext = createContext<SilentContextValue | null>(null);

export function SilentProvider({
  children,
  theme: controlledTheme,
  defaultTheme = "light",
  className,
}: SilentProviderProps) {
  const [internalTheme, setInternalTheme] = useState<SilentTheme>(defaultTheme);
  const theme = controlledTheme ?? internalTheme;

  useEffect(() => {
    document.documentElement.setAttribute("data-silent-theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: setInternalTheme,
    }),
    [theme],
  );

  return (
    <SilentContext.Provider value={value}>
      <div
        className={["silent-ui-root", className].filter(Boolean).join(" ")}
        data-silent-theme={theme}
      >
        {children}
      </div>
    </SilentContext.Provider>
  );
}

export function useSilentTheme() {
  const ctx = useContext(SilentContext);
  if (!ctx) {
    throw new Error("useSilentTheme must be used within SilentProvider");
  }
  return ctx;
}

import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "theme";
const THEMES = {
  DARK: "dark",
  LIGHT: "light",
};

function readThemeFromStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (storedValue === THEMES.DARK || storedValue === THEMES.LIGHT) {
      return storedValue;
    }
  } catch (error) {
    // ignore storage issues
  }
  return null;
}

function getInitialTheme() {
  if (typeof window === "undefined") {
    return THEMES.DARK;
  }

  const storedTheme = readThemeFromStorage();
  if (storedTheme) {
    return storedTheme;
  }

  if (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return THEMES.DARK;
  }

  return THEMES.LIGHT;
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      // ignore storage issues
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) =>
      currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
    );
  }, []);

  return useMemo(
    () => ({ theme, toggleTheme, isDarkMode: theme === THEMES.DARK }),
    [theme, toggleTheme]
  );
}
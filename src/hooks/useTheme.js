import { useCallback, useEffect, useState } from 'react';

export const THEME_STORAGE_KEY = 'raahzcard-theme';

/** Dark is the fallback, matching the look the card shipped with. */
export const DEFAULT_THEME = 'dark';

function isTheme(value) {
  return value === 'light' || value === 'dark';
}

/**
 * Reads the saved theme, falling back to the operating system preference.
 * The inline script in index.html does the same thing before first paint, so
 * the card never flashes the wrong palette.
 */
function readInitialTheme() {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME;
  }

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(stored)) {
      return stored;
    }
  } catch (error) {
    // localStorage can be blocked (private mode, sandboxed iframe)
  }

  if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
    return 'light';
  }

  return DEFAULT_THEME;
}

/**
 * Light/dark theme state, applied as `data-theme` on <html> so the CSS custom
 * properties in src/styles/base.css cascade.
 */
export function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      // Persisting is a nicety; a failure must not break rendering
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' };
}

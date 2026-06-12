/**
 * ThemeLanguageContext.jsx
 * Premium Context Provider for nawh.ai
 *
 * Manages:
 * - Theme (Dark/Light mode) with smooth transitions
 * - Language (Arabic RTL / English LTR) with full layout mirroring
 * - Persistent storage via LocalStorage
 *
 * @author nawh.ai
 * @version 1.0.0
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Define the context shape
const ThemeLanguageContext = createContext(null);

// LocalStorage keys for persistence
const STORAGE_KEYS = {
  THEME: 'nawh_ai_theme',
  LANGUAGE: 'nawh_ai_language',
};

// Supported languages configuration
const LANGUAGES = {
  ar: {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl',
    font: 'Cairo, sans-serif',
  },
  en: {
    code: 'en',
    name: 'English',
    dir: 'ltr',
    font: 'Inter, sans-serif',
  },
};

/**
 * ThemeLanguageProvider Component
 * Wraps the application to provide theme and language state
 */
export function ThemeLanguageProvider({ children }) {
  // Initialize state from LocalStorage or defaults
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    return stored || 'light';
  });

  const [language, setLanguage] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return stored || 'ar'; // Default to Arabic
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  /**
   * Toggle between dark and light themes
   * Applies smooth transition effect
   */
  const toggleTheme = useCallback(() => {
    setIsTransitioning(true);
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 300);
  }, []);

  /**
   * Toggle between Arabic and English
   * Automatically adjusts document direction and font
   */
  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  /**
   * Set specific language programmatically
   */
  const setLanguageCode = useCallback((code) => {
    if (LANGUAGES[code]) {
      setLanguage(code);
    }
  }, []);

  // Get current language configuration
  const currentLang = LANGUAGES[language];

  // Apply theme and language changes to document
  useEffect(() => {
    // Apply theme class to html element for Tailwind dark mode
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Persist theme preference
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;

    // Apply direction and language
    root.setAttribute('dir', currentLang.dir);
    root.setAttribute('lang', currentLang.code);

    // Apply font family
    root.style.fontFamily = currentLang.font;

    // Persist language preference
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  }, [language, currentLang]);

  // Context value with all state and handlers
  const value = {
    // Theme state
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme,
    isTransitioning,

    // Language state
    language,
    isRTL: currentLang.dir === 'rtl',
    isLTR: currentLang.dir === 'ltr',
    currentLang,
    toggleLanguage,
    setLanguageCode,
    LANGUAGES,
  };

  return (
    <ThemeLanguageContext.Provider value={value}>
      {children}
    </ThemeLanguageContext.Provider>
  );
}

/**
 * Custom hook to access theme and language context
 * @returns {Object} Theme and language state and handlers
 */
export function useThemeLanguage() {
  const context = useContext(ThemeLanguageContext);

  if (!context) {
    throw new Error('useThemeLanguage must be used within ThemeLanguageProvider');
  }

  return context;
}

/**
 * Hook specifically for theme operations
 * @returns {Object} Theme state and handlers
 */
export function useTheme() {
  const { theme, isDark, isLight, toggleTheme, isTransitioning } = useThemeLanguage();
  return { theme, isDark, isLight, toggleTheme, isTransitioning };
}

/**
 * Hook specifically for language operations
 * @returns {Object} Language state and handlers
 */
export function useLanguage() {
  const {
    language,
    isRTL,
    isLTR,
    currentLang,
    toggleLanguage,
    setLanguageCode,
    LANGUAGES,
  } = useThemeLanguage();

  return { language, isRTL, isLTR, currentLang, toggleLanguage, setLanguageCode, LANGUAGES };
}

export default ThemeLanguageContext;

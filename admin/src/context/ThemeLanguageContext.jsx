import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeLanguageContext = createContext();

export function ThemeLanguageProvider({ children }) {
  // جلب الإعدادات المحفوظة من المتصفح أو اعتماد الإعدادات الافتراضية
  const [theme, setTheme] = useState(() => localStorage.getItem('admin_theme') || 'light');
  const [language, setLanguage] = useState(() => localStorage.getItem('admin_lang') || 'ar');

  const isRTL = language === 'ar';
  const isDark = theme === 'dark';

  // تطبيق التغييرات على عنصر الـ HTML الرئيسي لـ Tailwind CSS والمحاذاة
  useEffect(() => {
    const root = window.document.documentElement;
    
    // ضبط الاتجاه واللغة
    root.dir = isRTL ? 'rtl' : 'ltr';
    root.lang = language;

    // ضبط المظهر الداكن
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // حفظ الخيارات في المتصفح
    localStorage.setItem('admin_theme', theme);
    localStorage.setItem('admin_lang', language);
  }, [theme, language, isRTL, isDark]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  const toggleLanguage = () => setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));

  return (
    <ThemeLanguageContext.Provider value={{ theme, toggleTheme, language, toggleLanguage, isRTL, isDark }}>
      {children}
    </ThemeLanguageContext.Provider>
  );
}

export const useThemeLanguage = () => {
  const context = useContext(ThemeLanguageContext);
  if (!context) {
    throw new Error('useThemeLanguage must be used within a ThemeLanguageProvider');
  }
  return context;
};

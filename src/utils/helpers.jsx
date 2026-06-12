/**
 * helpers.jsx
 * Utility functions for nawh.ai
 *
 * @author nawh.ai
 * @version 1.0.0
 */

/**
 * Get time-based greeting
 * @param {string} lang - Current language code
 * @returns {string} Appropriate greeting based on time of day
 */
export function getTimeGreeting(lang = 'ar') {
  const hour = new Date().getHours();
  const greetings = {
    ar: {
      morning: 'صباح الخير',
      afternoon: 'مساء الخير',
      evening: 'مساء الخير',
      night: 'تصبح على خير',
    },
    en: {
      morning: 'Good Morning',
      afternoon: 'Good Afternoon',
      evening: 'Good Evening',
      night: 'Good Night',
    },
  };

  const currentGreetings = greetings[lang] || greetings.ar;

  if (hour >= 5 && hour < 12) {
    return currentGreetings.morning;
  } else if (hour >= 12 && hour < 17) {
    return currentGreetings.afternoon;
  } else if (hour >= 17 && hour < 21) {
    return currentGreetings.evening;
  } else {
    return currentGreetings.night;
  }
}

/**
 * Format large numbers with abbreviations
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Generate random ID
 * @returns {string} Random unique ID
 */
export function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Debounce function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Class name utility for conditional classes
 * @param  {...any} classes - Class names or conditionals
 * @returns {string} Combined class string
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Simulate API delay
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after delay
 */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Local storage helpers with JSON parsing
 */
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
};

/**
 * Animation variants for framer-motion-like transitions
 * Used with Tailwind transition classes
 */
export const animations = {
  fadeIn: {
    initial: 'opacity-0',
    animate: 'opacity-100',
    exit: 'opacity-0',
  },
  slideUp: {
    initial: 'opacity-0 translate-y-4',
    animate: 'opacity-100 translate-y-0',
    exit: 'opacity-0 translate-y-4',
  },
  slideIn: {
    initialRtl: 'opacity-0 translate-x-4',
    initialLtr: 'opacity-0 -translate-x-4',
    animate: 'opacity-100 translate-x-0',
  },
  scale: {
    initial: 'opacity-0 scale-95',
    animate: 'opacity-100 scale-100',
    exit: 'opacity-0 scale-95',
  },
};

/**
 * Format date based on locale
 * @param {Date} date - Date object
 * @param {string} lang - Language code
 * @returns {string} Formatted date string
 */
export function formatDate(date, lang = 'ar') {
  const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

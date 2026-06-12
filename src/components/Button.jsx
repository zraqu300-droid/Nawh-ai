/**
 * Button.jsx
 * Premium reusable button component for nawh.ai
 *
 * Features:
 * - Multiple variants (primary, secondary, outline, ghost, danger)
 * - Multiple sizes (sm, md, lg)
 * - RTL/LTR aware icon positioning
 * - Loading state with spinner
 * - Smooth hover and active transitions
 *
 * @author nawh.ai
 * @version 1.0.0
 */

import { useLanguage } from '../context/ThemeLanguageContext.jsx';

/**
 * Loading Spinner Component
 */
function Spinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <svg
      className={`animate-spin ${sizeClasses[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C6.267 0 0 6.267 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

/**
 * Button Component
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Button content
 * @param {string} props.variant - Button style variant
 * @param {string} props.size - Button size
 * @param {string} props.icon - Icon element to display
 * @param {string} props.iconPosition - Icon position (start/end)
 * @param {boolean} props.loading - Show loading spinner
 * @param {boolean} props.disabled - Disable button
 * @param {boolean} props.fullWidth - Full width button
 * @param {string} props.className - Additional classes
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'start',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) {
  const { isRTL } = useLanguage();

  // Base button classes
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-xl
    transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transform active:scale-[0.98]
  `;

  // Variant styles
  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700
      text-white shadow-lg shadow-blue-500/25
      hover:from-blue-700 hover:to-blue-800
      hover:shadow-xl hover:shadow-blue-500/30
      focus:ring-blue-500
      dark:from-blue-500 dark:to-blue-600
      dark:hover:from-blue-600 dark:hover:to-blue-700
    `,
    secondary: `
      bg-gray-100 dark:bg-gray-800
      text-gray-900 dark:text-white
      hover:bg-gray-200 dark:hover:bg-gray-700
      focus:ring-gray-400
    `,
    outline: `
      border-2 border-gray-300 dark:border-gray-600
      text-gray-700 dark:text-gray-200
      hover:bg-gray-50 dark:hover:bg-gray-800
      focus:ring-gray-400
    `,
    ghost: `
      text-gray-600 dark:text-gray-300
      hover:bg-gray-100 dark:hover:bg-gray-800
      focus:ring-gray-400
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700
      focus:ring-red-500
      dark:bg-red-500 dark:hover:bg-red-600
    `,
    gradient: `
      bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500
      text-white
      hover:from-purple-600 hover:via-pink-600 hover:to-orange-600
      focus:ring-pink-500
      shadow-lg shadow-pink-500/25
    `,
  };

  // Size styles
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  // Determine icon position based on RTL
  const effectiveIconPosition = isRTL ? (iconPosition === 'start' ? 'end' : 'start') : iconPosition;

  const combinedClasses = [
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={combinedClasses} disabled={disabled || loading} {...props}>
      {loading && <Spinner size={size} />}
      {!loading && icon && effectiveIconPosition === 'start' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      {children}
      {!loading && icon && effectiveIconPosition === 'end' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
}

export default Button;

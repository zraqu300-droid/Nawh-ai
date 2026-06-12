/**
 * Input.jsx
 * Premium reusable input component for nawh.ai
 *
 * Features:
 * - Label with optional required indicator
 * - Left and right icon support
 * - Error and success states
 * - RTL/LTR aware styling
 * - Dark mode support
 *
 * @author nawh.ai
 * @version 1.0.0
 */

import { useLanguage } from '../context/ThemeLanguageContext.jsx';

/**
 * Input Component
 *
 * @param {string} label - Input label
 * @param {string} type - Input type
 * @param {ReactNode} leftIcon - Left icon element
 * @param {ReactNode} rightIcon - Right icon element
 * @param {string} error - Error message
 * @param {string} success - Success message
 * @param {boolean} required - Show required indicator
 * @param {string} className - Additional classes
 */
function Input({
  label,
  type = 'text',
  leftIcon,
  rightIcon,
  error,
  success,
  required = false,
  className = '',
  ...props
}) {
  const { isRTL } = useLanguage();

  // Base input classes
  const baseInputClasses = `
    w-full px-4 py-3 rounded-xl
    bg-gray-50 dark:bg-gray-800
    border-2 transition-all duration-200
    text-gray-900 dark:text-white
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    focus:outline-none focus:ring-0
  `;

  // State-based border styles
  const stateClasses = error
    ? 'border-red-500 focus:border-red-500'
    : success
      ? 'border-green-500 focus:border-green-500'
      : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400';

  // Icon padding adjustments (swap for RTL)
  const effectiveLeft = isRTL ? rightIcon : leftIcon;
  const effectiveRight = isRTL ? leftIcon : rightIcon;
  const paddingLeft = effectiveLeft ? 'pl-12' : 'pl-4';
  const paddingRight = effectiveRight ? 'pr-12' : 'pr-4';

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ms-1">*</span>}
        </label>
      )}

      {/* Input wrapper with icons */}
      <div className="relative">
        {/* Left Icon (adjusts for RTL) */}
        {effectiveLeft && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400 dark:text-gray-500">
            {effectiveLeft}
          </div>
        )}

        {/* Input Field */}
        <input
          type={type}
          className={[baseInputClasses, stateClasses, paddingLeft, paddingRight]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />

        {/* Right Icon (adjusts for RTL) */}
        {effectiveRight && (
          <div className="absolute inset-y-0 end-0 flex items-center pe-4 pointer-events-none text-gray-400 dark:text-gray-500">
            {effectiveRight}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="flex items-center gap-1 text-sm text-red-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {/* Success Message */}
      {success && (
        <p className="flex items-center gap-1 text-sm text-green-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {success}
        </p>
      )}
    </div>
  );
}

/**
 * TextArea Component - Extended Input for multiline
 */
function TextArea({
  label,
  rows = 4,
  error,
  success,
  required = false,
  className = '',
  ...props
}) {
  const baseClasses = `
    w-full px-4 py-3 rounded-xl
    bg-gray-50 dark:bg-gray-800
    border-2 transition-all duration-200 resize-none
    text-gray-900 dark:text-white
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    focus:outline-none focus:ring-0
  `;

  const stateClasses = error
    ? 'border-red-500 focus:border-red-500'
    : success
      ? 'border-green-500 focus:border-green-500'
      : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400';

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ms-1">*</span>}
        </label>
      )}

      <textarea
        rows={rows}
        className={[baseClasses, stateClasses].filter(Boolean).join(' ')}
        {...props}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-500">{success}</p>}
    </div>
  );
}

export { Input, TextArea };
export default Input;

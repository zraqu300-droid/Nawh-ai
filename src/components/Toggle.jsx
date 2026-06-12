/**
 * Toggle.jsx
 * Premium toggle switch component for nawh.ai
 *
 * Features:
 * - Smooth sliding animation
 * - RTL/LTR aware direction
 * - Dark mode support
 * - Accessible keyboard navigation
 *
 * @author nawh.ai
 * @version 1.0.0
 */

import { useLanguage } from '../context/ThemeLanguageContext.jsx';

/**
 * Toggle Component
 *
 * @param {boolean} checked - Toggle state
 * @param {Function} onChange - Change handler
 * @param {string} label - Toggle label
 * @param {string} description - Optional description
 * @param {boolean} disabled - Disable toggle
 * @param {string} className - Additional classes
 */
function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
}) {
  const { isRTL } = useLanguage();

  return (
    <label
      className={`
        flex items-center gap-3 cursor-pointer select-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {/* Toggle Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`
          relative w-14 h-8 rounded-full
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          ${checked
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25'
            : 'bg-gray-200 dark:bg-gray-700'
          }
        `}
      >
        {/* Toggle Knob */}
        <span
          className={`
            absolute top-1 ${isRTL ? 'right-1' : 'left-1'}
            w-6 h-6 rounded-full bg-white
            shadow-md transition-all duration-300 ease-in-out
            ${checked ? (isRTL ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'}
          `}
        >
          {/* Optional check mark */}
          {checked && (
            <svg
              className={`w-full h-full p-1.5 text-blue-500 ${isRTL ? 'scale-x-[-1]' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </span>
      </button>

      {/* Label and Description */}
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <span className="block text-sm font-medium text-gray-900 dark:text-white">
              {label}
            </span>
          )}
          {description && (
            <span className="block text-xs text-gray-500 dark:text-gray-400">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}

export default Toggle;

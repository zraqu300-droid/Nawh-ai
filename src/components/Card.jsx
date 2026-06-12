/**
 * Card.jsx
 * Premium reusable card component for nawh.ai
 *
 * Features:
 * - Multiple variants (default, glass, gradient, outline)
 * - Hover effects with smooth transitions
 * - Dark mode support
 * - Flexible padding options
 *
 * @author nawh.ai
 * @version 1.0.0
 */

/**
 * Card Component
 *
 * @param {ReactNode} children - Card content
 * @param {string} variant - Card style variant
 * @param {string} padding - Padding size
 * @param {boolean} hover - Enable hover effect
 * @param {boolean} interactive - Add interactive cursor
 * @param {string} className - Additional classes
 */
function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  interactive = false,
  className = '',
  ...props
}) {
  // Base card classes
  const baseClasses = 'rounded-2xl transition-all duration-300 ease-out';

  // Variant styles
  const variants = {
    default: `
      bg-white dark:bg-gray-800
      shadow-lg shadow-black/5
      dark:shadow-black/20
    `,
    glass: `
      bg-white/80 dark:bg-gray-800/80
      backdrop-blur-xl
      border border-white/20 dark:border-gray-700/50
    `,
    gradient: `
      bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10
      dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20
      border border-blue-200/30 dark:border-blue-500/20
    `,
    outline: `
      border-2 border-gray-200 dark:border-gray-700
      bg-transparent
    `,
  };

  // Padding styles
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6',
    xl: 'p-8',
  };

  // Hover effect classes
  const hoverClasses = hover
    ? 'hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30 hover:-translate-y-1'
    : '';

  // Interactive cursor
  const interactiveClasses = interactive ? 'cursor-pointer' : '';

  const combinedClasses = [
    baseClasses,
    variants[variant],
    paddings[padding],
    hoverClasses,
    interactiveClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
}

/**
 * Card Header Component
 */
function CardHeader({ children, className = '' }) {
  return (
    <div className={`pb-4 border-b border-gray-100 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Card Title Component
 */
function CardTitle({ children, className = '' }) {
  return (
    <h3
      className={`text-lg font-bold text-gray-900 dark:text-white ${className}`}
    >
      {children}
    </h3>
  );
}

/**
 * Card Body Component
 */
function CardBody({ children, className = '' }) {
  return <div className={`py-4 ${className}`}>{children}</div>;
}

/**
 * Card Footer Component
 */
function CardFooter({ children, className = '' }) {
  return (
    <div
      className={`pt-4 border-t border-gray-100 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}

// Export components
export { Card, CardHeader, CardTitle, CardBody, CardFooter };
export default Card;

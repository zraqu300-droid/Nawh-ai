/**
 * Sidebar.jsx
 * Premium sidebar navigation component for nawh.ai
 *
 * Features:
 * - RTL/LTR aware positioning and icons
 * - Collapsible on mobile
 * - Active state indicators
 * - Dark mode support
 *
 * @author nawh.ai
 * @version 1.0.0
 */

import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  Settings,
  User,
  LogOut,
  MessageSquare,
  Home,
} from 'lucide-react';
import { useLanguage } from '../context/ThemeLanguageContext.jsx';

/**
 * Sidebar Component
 */
function Sidebar() {
  const { language, isRTL } = useLanguage();
  const location = useLocation();

  // Navigation items configuration
  const navItems = [
    {
      path: '/dashboard',
      icon: LayoutDashboard,
      label: language === 'ar' ? 'لوحة التحكم' : 'Dashboard',
    },
    {
      path: '/ai-playground',
      icon: MessageSquare,
      label: language === 'ar' ? 'ساحة الذكاء' : 'AI Playground',
    },
    {
      path: '/settings',
      icon: Settings,
      label: language === 'ar' ? 'الإعدادات' : 'Settings',
    },
  ];

  const bottomItems = [
    {
      path: '/settings',
      icon: User,
      label: language === 'ar' ? 'الملف الشخصي' : 'Profile',
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`
        fixed top-16 bottom-0 w-64
        bg-white dark:bg-gray-900
        border-${isRTL ? 'r' : 'l'} border-gray-200/50 dark:border-gray-700/50
        ${isRTL ? 'left-0' : 'right-0'}
        hidden lg:block
        transition-all duration-300
      `}
    >
      <div className="flex flex-col h-full p-4">
        {/* Main Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-200 group
                  ${active
                    ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2 border-blue-500/20'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                <div
                  className={`
                  p-2 rounded-lg transition-all duration-200
                  ${active
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                  }
                `}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span
                  className={`
                  font-medium transition-colors duration-200
                  ${active
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                  }
                `}
                >
                  {item.label}
                </span>

                {/* Active Indicator */}
                {active && (
                  <div
                    className={`
                    w-2 h-2 rounded-full bg-blue-500
                    absolute ${isRTL ? 'left-2' : 'right-2'}
                    animate-pulse
                  `}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Items */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
          {/* Logout Button */}
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
          >
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-medium">
              {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
            </span>
          </button>
        </div>

        {/* Version Badge */}
        <div className="pt-4 text-center">
          <span className="text-xs text-gray-400 dark:text-gray-600">
            nawh.ai v1.0.0
          </span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

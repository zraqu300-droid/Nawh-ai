/**
 * AdminLayout.jsx
 * Premium Admin Dashboard Layout Component for nawh.ai
 *
 * Features:
 * - Collapsible sidebar with animation
 * - RTL/LTR automatic layout mirroring
 * - Dark/Light mode toggle
 * - Language switcher (Arabic/English)
 * - Notification panel
 * - Admin profile dropdown
 * - Mobile responsive with hamburger menu
 *
 * @author nawh.ai
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  Users,
  Settings,
  Database,
  BarChart3,
  Shield,
  Bell,
  Moon,
  Sun,
  Globe,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Search,
} from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext.jsx';

// ============================================
// Navigation Items Configuration
// ============================================
const getNavItems = (language) => [
  {
    path: '/admin',
    icon: LayoutDashboard,
    label: language === 'ar' ? 'لوحة التحكم' : 'Dashboard',
    exact: true,
  },
  {
    path: '/admin/upload',
    icon: Upload,
    label: language === 'ar' ? 'رفع البيانات' : 'Upload Data',
  },
  {
    path: '/admin/users',
    icon: Users,
    label: language === 'ar' ? 'إدارة المستخدمين' : 'User Management',
  },
  {
    path: '/admin/data',
    icon: Database,
    label: language === 'ar' ? 'قاعدة البيانات' : 'Database',
  },
  {
    path: '/admin/analytics',
    icon: BarChart3,
    label: language === 'ar' ? 'التحليلات' : 'Analytics',
  },
  {
    path: '/admin/settings',
    icon: Settings,
    label: language === 'ar' ? 'الإعدادات' : 'Settings',
  },
];

// ============================================
// AdminLayout Component
// ============================================
function AdminLayout() {
  const { theme, toggleTheme, language, toggleLanguage, isRTL, isDark } = useThemeLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Navigation items with current language
  const navItems = getNavItems(language);

  // Check if path is active
  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setIsProfileOpen(false);
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: language === 'ar' ? 'مستخدم جديد' : 'New User',
      message: language === 'ar' ? 'انضم أحمد للمنصة' : 'Ahmed joined the platform',
      time: language === 'ar' ? 'منذ 5 دقائق' : '5 mins ago',
      unread: true,
    },
    {
      id: 2,
      title: language === 'ar' ? 'تحديث النظام' : 'System Update',
      message: language === 'ar' ? 'تم تحديث الإصدار' : 'Version updated successfully',
      time: language === 'ar' ? 'منذ ساعة' : '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      title: language === 'ar' ? 'نسخ احتياطي' : 'Backup Complete',
      message: language === 'ar' ? 'تم إنشاء نسخة احتياطية' : 'Backup created successfully',
      time: language === 'ar' ? 'منذ 3 ساعات' : '3 hours ago',
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* ============================================ */}
      {/* Mobile Sidebar Overlay */}
      {/* ============================================ */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* ============================================ */}
      {/* Sidebar */}
      {/* ============================================ */}
      <aside
        className={`
          fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full z-50
          bg-white dark:bg-gray-800 border-${isRTL ? 'l' : 'r'} border-gray-200 dark:border-gray-700
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'w-64' : 'w-20'}
          ${isMobileSidebarOpen ? 'translate-x-0' : isRTL ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          {/* Logo */}
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25 flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            {(isSidebarOpen || isMobileSidebarOpen) && (
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
                nawh.ai
              </span>
            )}
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-180px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl
                  transition-all duration-200 group relative
                  ${active
                    ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                {/* Active Indicator */}
                {active && (
                  <div
                    className={`
                      absolute ${isRTL ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2
                      w-1 h-8 rounded-full bg-gradient-to-b from-blue-500 to-purple-500
                    `}
                  />
                )}

                {/* Icon */}
                <div
                  className={`
                    w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    transition-all duration-200
                    ${active
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Label - Only show when sidebar is expanded */}
                {(isSidebarOpen || isMobileSidebarOpen) && (
                  <span className="font-medium whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          {/* Collapse Toggle - Desktop Only */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`
              hidden lg:flex items-center justify-center w-full gap-2 px-3 py-2.5
              rounded-xl bg-gray-100 dark:bg-gray-700
              hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors
              ${isRTL ? 'flex-row-reverse' : ''}
            `}
          >
            {isSidebarOpen ? (
              <>
                <ChevronLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'طي' : 'Collapse'}
                </span>
              </>
            ) : (
              <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            )}
          </button>

          {/* Version */}
          {(isSidebarOpen || isMobileSidebarOpen) && (
            <p className="text-xs text-center text-gray-400 mt-3">
              nawh.ai Admin v1.0.0
            </p>
          )}
        </div>
      </aside>

      {/* ============================================ */}
      {/* Main Content Area */}
      {/* ============================================ */}
      <div
        className={`
          transition-all duration-300
          ${isSidebarOpen ? (isRTL ? 'mr-64' : 'ml-64') : (isRTL ? 'mr-20' : 'ml-20')}
          lg:block
        `}
      >
        {/* ============================================ */}
        {/* Top Navbar */}
        {/* ============================================ */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
          <div className="h-full px-4 flex items-center justify-between gap-4">
            {/* Left Section - Mobile Menu & Search */}
            <div className="flex items-center gap-4 flex-1">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>

              {/* Search Bar */}
              <div className="relative flex-1 max-w-md hidden sm:block">
                <Search
                  className={`
                    absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400
                    ${isRTL ? 'right-3' : 'left-3'}
                  `}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
                  className={`
                    w-full py-2 px-10 rounded-xl
                    bg-gray-100 dark:bg-gray-700
                    border-2 border-transparent
                    focus:border-blue-500 dark:focus:border-blue-400
                    text-gray-900 dark:text-white
                    placeholder:text-gray-400
                    transition-all duration-200
                  `}
                />
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                title={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
              >
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 hidden sm:inline">
                  {language === 'ar' ? 'EN' : 'ع'}
                </span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Notifications */}
              <div className="relative dropdown-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setIsProfileOpen(false);
                  }}
                  className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
                >
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <div
                    className={`
                      absolute top-full ${isRTL ? 'left-0' : 'right-0'} mt-2
                      w-80 bg-white dark:bg-gray-800
                      rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700
                      overflow-hidden z-50
                      animate-slide-down
                    `}
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {language === 'ar' ? 'الإشعارات' : 'Notifications'}
                      </h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`
                            p-4 border-b border-gray-100 dark:border-gray-700 last:border-0
                            hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer
                            ${notification.unread ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}
                          `}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`
                                w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                                ${notification.unread
                                  ? 'bg-blue-100 dark:bg-blue-900/30'
                                  : 'bg-gray-100 dark:bg-gray-700'
                                }
                              `}
                            >
                              <Bell
                                className={`
                                  w-5 h-5
                                  ${notification.unread
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-400'
                                  }
                                `}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 dark:text-white text-sm">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                      <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        {language === 'ar' ? 'عرض الكل' : 'View All'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative dropdown-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileOpen(!isProfileOpen);
                    setIsNotificationsOpen(false);
                  }}
                  className={`
                    flex items-center gap-3 p-1.5 pe-3 rounded-xl
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                    ${isRTL ? 'flex-row-reverse' : ''}
                  `}
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className={`hidden sm:block text-start ${isRTL ? 'text-end' : ''}`}>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {language === 'ar' ? 'المشرف' : 'Admin'}
                    </p>
                    <p className="text-xs text-gray-500">admin@nawh.ai</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 hidden sm:block ${isRTL ? 'rotate-90' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div
                    className={`
                      absolute top-full ${isRTL ? 'left-0' : 'right-0'} mt-2
                      w-56 bg-white dark:bg-gray-800
                      rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700
                      overflow-hidden z-50
                      animate-slide-down
                    `}
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <p className="font-bold text-gray-900 dark:text-white">
                        {language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed'}
                      </p>
                      <p className="text-sm text-gray-500">admin@nawh.ai</p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/admin/profile"
                        className={`
                          flex items-center gap-3 px-4 py-2.5 rounded-xl
                          hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                          ${isRTL ? 'flex-row-reverse' : ''}
                        `}
                      >
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
                        </span>
                      </Link>
                      <Link
                        to="/admin/settings"
                        className={`
                          flex items-center gap-3 px-4 py-2.5 rounded-xl
                          hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                          ${isRTL ? 'flex-row-reverse' : ''}
                        `}
                      >
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {language === 'ar' ? 'الإعدادات' : 'Settings'}
                        </span>
                      </Link>
                    </div>
                    <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => navigate('/auth')}
                        className={`
                          flex items-center gap-3 w-full px-4 py-2.5 rounded-xl
                          hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors
                          text-red-600 dark:text-red-400
                          ${isRTL ? 'flex-row-reverse' : ''}
                        `}
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">
                          {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ============================================ */}
        {/* Page Content */}
        {/* ============================================ */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

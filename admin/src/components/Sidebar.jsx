import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Shield, X } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext.jsx';
// استيراد كاباسيتور للتحكم بأزرار الهاتف
import { App as CapacitorApp } from '@capacitor/app';

function Sidebar({ isOpen, setIsOpen, sidebarRef }) {
  const { language, isRTL } = useThemeLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  // التحكم برز الرجوع الخاص بالهاتف لإغلاق السايدبار إذا كان مفتوحاً
  useEffect(() => {
    let backButtonListener;

    const setupBackButton = async () => {
      backButtonListener = await CapacitorApp.addListener('backButton', (data) => {
        if (isOpen) {
          setIsOpen(false); // إغلاق القائمة بدلاً من الخروج من التطبيق
        }
      });
    };

    setupBackButton();

    return () => {
      if (backButtonListener) {
        backButtonListener.remove();
      }
    };
  }, [isOpen, setIsOpen]);

  const navItems = [
    { 
      id: 'dashboard', 
      title: language === 'ar' ? 'لوحة التحكم المركزية' : 'Central Dashboard', 
      icon: LayoutDashboard, 
      path: '/admin' 
    }
  ];

  return (
    <aside
      ref={sidebarRef}
      className={`
        fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-64 z-50 
        bg-white dark:bg-gray-800 border-${isRTL ? 'l' : 'r'} border-gray-200 dark:border-gray-700 
        shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* هيدر القائمة الجانبية */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
            nawh.ai
          </span>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* عناصر القائمة الجانبية */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin/');
          
          return (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-500/10 to-pink-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
              <span>{item.title}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;

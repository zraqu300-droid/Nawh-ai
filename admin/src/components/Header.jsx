import React, { useState } from 'react';
import { Menu, Search, Globe, Sun, Moon, Bell, LogOut } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext.jsx';

function Header({ onMenuClick }) {
  const { toggleTheme, language, toggleLanguage, isRTL, isDark } = useThemeLanguage();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, text: language === 'ar' ? 'تم تحديث السيرفر بنجاح' : 'Server updated successfully', time: '5m ago' },
    { id: 2, text: language === 'ar' ? 'نسخة احتياطية جديدة جاهزة' : 'New backup is ready', time: '1h ago' }
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 lg:px-6">
      
      {/* زر الهامبرغر للموبايل */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* حقل البحث التجاري */}
      <div className="hidden md:flex items-center gap-2 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-1.5 w-64 focus-within:border-blue-500 transition-colors">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={language === 'ar' ? 'بحث سريع...' : 'Quick search...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-xs outline-none w-full border-none focus:ring-0 p-0"
        />
      </div>

      {/* أزرار التحكم */}
      <div className="flex items-center gap-2 lg:gap-3">
        
        {/* زر تبديل اللغة */}
        <button
          onClick={toggleLanguage}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1 text-sm font-bold border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
        >
          <Globe className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-mono">{language === 'ar' ? 'EN' : 'ع'}</span>
        </button>

        {/* زر تبديل الثيم */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
        >
          {isDark ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-gray-600" />}
        </button>

        {/* قائمة الإشعارات */}
        <div className="relative">
          <button
            onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsProfileOpen(false); }}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
          >
            <Bell className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-md" />
          </button>

          {isNotificationsOpen && (
            <div className={`absolute top-12 ${isRTL ? 'left-0' : 'right-0'} w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl py-2 z-50`}>
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <span className="font-bold text-xs">{language === 'ar' ? 'الإشعارات الحية' : 'Live Alerts'}</span>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer border-b border-gray-50 dark:border-gray-700/30 last:border-none">
                    <p className="text-xs font-medium text-gray-800 dark:text-gray-200">{n.text}</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* بروفايل الآدمن */}
        <div className="relative">
          <button
            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationsOpen(false); }}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-pink-600 flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
          </button>

          {isProfileOpen && (
            <div className={`absolute top-12 ${isRTL ? 'left-0' : 'right-0'} w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl py-2 z-50`}>
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                <p className="text-xs font-bold text-gray-900 dark:text-white">Admin Root</p>
                <p className="text-[10px] text-gray-400 mt-0.5">root@nawh.ai</p>
              </div>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 font-medium transition-colors text-start mt-1">
                <LogOut className="w-4 h-4" />
                <span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout System'}</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;

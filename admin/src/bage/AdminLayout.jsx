import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Upload, Users, Database, BarChart3, Settings,
  Shield, Bell, Moon, Sun, Globe, Menu, X, Search, User, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';

// استدعاء الـ Context لإدارة المظهر واللغة من المجلد الصحيح
import { useThemeLanguage } from '../context/ThemeLanguageContext.jsx';

// استدعاء حزم Capacitor للتحكم بأزرار الهاتف المادية الحقيقية ونظام التشغيل
import { App as CapacitorApp } from '@capacitor/app';

function AdminLayout() {
  const { theme, toggleTheme, language, toggleLanguage, isRTL, isDark } = useThemeLanguage();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // متغير مرجعي لتتبع توقيت الضغطة الأخيرة لزر الخروج (منع الخروج الفجائي)
  const lastBackButtonPress = useRef(0);

  // ----------------------------------------------------------------------
  // 🎮 محرك الاستماع لأزرار الهاتف الذكي (Hardware Back Button Listener)
  // ----------------------------------------------------------------------
  useEffect(() => {
    let backButtonListener;

    const setupHardwareButtons = async () => {
      try {
        backButtonListener = await CapacitorApp.addListener('backButton', async (data) => {
          
          // 1. إذا كان السايدبار مفتوحاً، أغلقه أولاً
          if (isMobileSidebarOpen) {
            setIsMobileSidebarOpen(false);
            return;
          }

          // 2. إذا كانت قائمة الإشعارات أو البروفايل مفتوحة، أغلقها
          if (isNotificationsOpen || isProfileOpen) {
            setIsNotificationsOpen(false);
            setIsProfileOpen(false);
            return;
          }

          // 3. إذا كان المستخدم في الصفحة الرئيسية /admin، نفذ منطق "اضغط مرتين للخروج"
          if (location.pathname === '/admin' || location.pathname === '/admin/') {
            const currentTime = new Date().getTime();
            
            if (currentTime - lastBackButtonPress.current < 2000) {
              // الضغطة الثانية خلال ثانيتين -> إغلاق التطبيق فوراً
              CapacitorApp.exitApp();
            } else {
              // الضغطة الأولى -> تحديث التوقيت
              lastBackButtonPress.current = currentTime;
              
              // تنبيه في الـ console ومستقر تماماً في الـ Build ولا يتطلب حزم خارجية قد تسبب مشاكل
              console.log(language === 'ar' ? 'اضغط مرة أخرى للخروج' : 'Press back again to exit');
            }
          } else {
            // 4. إذا كان في صفحة داخلية أخرى، يرجعه خطوة للخلف بالـ History
            navigate(-1);
          }
        });
      } catch (error) {
        console.log('Capacitor buttons listener active on native platforms only.');
      }
    };

    setupHardwareButtons();

    // تنظيف المستمع عند تفكيك الكومبوننت لمنع تسريب الذاكرة
    return () => {
      if (backButtonListener && typeof backButtonListener.remove === 'function') {
        backButtonListener.remove();
      }
    };
  }, [location.pathname, isMobileSidebarOpen, isNotificationsOpen, isProfileOpen, language, navigate]);

  // إغلاق القائمة الجانبية للموبايل عند الضغط خارجها بالماوس/اللمس
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMobileSidebarOpen(false);
      }
    }
    if (isMobileSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileSidebarOpen]);

  // إغلاق القائمة الجانبية للموبايل فور تغيير الصفحة (لضمان تجربة مستخدم سلسة)
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location]);

  // دالة جلب عناصر القائمة الجانبية مع دعم الترجمة ثنائية اللغة
  const getNavItems = (lang) => [
    { 
      id: 'dashboard', 
      title: lang === 'ar' ? 'لوحة التحكم المركزية' : 'Central Dashboard', 
      icon: LayoutDashboard, 
      path: '/admin' 
    }
  ];

  const navItems = getNavItems(language);

  // إشعارات تجريبية حية تزيد من القيمة البصرية للمشروع أثناء العرض والبيع
  const notifications = [
    { id: 1, text: language === 'ar' ? 'تم تحديث السيرفر بنجاح' : 'Server updated successfully', time: '5m ago' },
    { id: 2, text: language === 'ar' ? 'نسخة احتياطية جديدة جاهزة' : 'New backup is ready', time: '1h ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      
      {/* 1️⃣ غطاء ضبابي خلفي عند فتح القائمة في الموبايل */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" />
      )}

      {/* 2️⃣ القائمة الجانبية المستقلة (Sidebar) */}
      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-64 z-50 
          bg-white dark:bg-gray-800 border-${isRTL ? 'l' : 'r'} border-gray-200 dark:border-gray-700 
          shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out
          ${isMobileSidebarOpen ? 'translate-x-0' : isRTL ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* هيدر القائمة الجانبية (الشعار والاسم) */}
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
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* أزرار التنقل (Navigation Links) */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin/');
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
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

      {/* 3️⃣ القسم الرئيسي للمحتوى والهيدر العلوي */}
      <div className={`transition-all duration-300 min-h-screen flex flex-col ${isRTL ? 'lg:mr-64' : 'lg:ml-64'}`}>
        
        {/* الشريط العلوي الثابت الذكي (Header) */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 lg:px-6">
          
          {/* زر فتح القائمة للموبايل */}
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* حقل البحث (مظهر تجاري جذاب) */}
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

          {/* أزرار التحكم اليمنى (اللغة، المظهر، الإشعارات، الحساب) */}
          <div className="flex items-center gap-2 lg:gap-3">
            
            {/* زر تبديل اللغة الفوري (ع / EN) */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1 text-sm font-bold border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
              title={language === 'ar' ? 'Change to English' : 'تغيير إلى العربية'}
            >
              <Globe className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-mono">{language === 'ar' ? 'EN' : 'ع'}</span>
            </button>

            {/* زر تبديل المظهر الليلي/النهاري */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
            >
              {isDark ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>

            {/* قائمة الإشعارات المنسدلة */}
            <div className="relative">
              <button
                onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsProfileOpen(false); }}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
              >
                <Bell className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-md" />
              </button>

              {isNotificationsOpen && (
                <div className={`absolute top-12 ${isRTL ? 'left-0' : 'right-0'} w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl py-2 z-50 animate-fade-in`}>
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

            {/* قائمة ملف المشرف الشخصي */}
            <div className="relative">
              <button
                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationsOpen(false); }}
                className="flex items-center gap-2 p-1 lg:p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-pink-600 flex items-center justify-center text-white font-bold text-xs">
                  A
                </div>
              </button>

              {isProfileOpen && (
                <div className={`absolute top-12 ${isRTL ? 'left-0' : 'right-0'} w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl py-2 z-50 animate-fade-in`}>
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

        {/* 4️⃣ محقن عرض الصفحات الداخلية */}
        <main className="flex-1 p-4 lg:p-6 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;

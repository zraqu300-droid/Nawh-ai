import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Upload, Users, Database, BarChart3, Settings,
  Shield, Bell, Moon, Sun, Globe, Menu, X, Search, User, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';

// استدعاء الـ Context لإدارة المظهر واللغة
import { useThemeLanguage } from '../context/ThemeLanguageContext.jsx';

// استدعاء حزم Capacitor للتحكم بأزرار الهاتف
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
  const lastBackButtonPress = useRef(0);

  // 🎮 مستمع أزرار الهاتف الذكي الخلفية
  useEffect(() => {
    let backButtonListener;
    const setupHardwareButtons = async () => {
      try {
        backButtonListener = await CapacitorApp.addListener('backButton', async (data) => {
          if (isMobileSidebarOpen) {
            setIsMobileSidebarOpen(false);
            return;
          }
          if (isNotificationsOpen || isProfileOpen) {
            setIsNotificationsOpen(false);
            setIsProfileOpen(false);
            return;
          }
          if (location.pathname === '/admin' || location.pathname === '/admin/') {
            const currentTime = new Date().getTime();
            if (currentTime - lastBackButtonPress.current < 2000) {
              CapacitorApp.exitApp();
            } else {
              lastBackButtonPress.current = currentTime;
              console.log(language === 'ar' ? 'اضغط مرة أخرى للخروج' : 'Press back again to exit');
            }
          } else {
            navigate(-1);
          }
        });
      } catch (error) {
        console.log('Capacitor buttons listener active on native platforms only.');
      }
    };

    setupHardwareButtons();
    return () => {
      if (backButtonListener && typeof backButtonListener.remove === 'function') {
        backButtonListener.remove();
      }
    };
  }, [location.pathname, isMobileSidebarOpen, isNotificationsOpen, isProfileOpen, language, navigate]);

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

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location]);

  const navItems = [
    { 
      id: 'dashboard', 
      title: language === 'ar' ? 'لوحة التحكم المركزية' : 'Central Dashboard', 
      icon: LayoutDashboard, 
      path: '/admin' 
    }
  ];

  const notifications = [
    { id: 1, text: language === 'ar' ? 'تم تحديث السيرفر بنجاح' : 'Server updated successfully', time: '5m ago' },
    { id: 2, text: language === 'ar' ? 'نسخة احتياطية جديدة جاهزة' : 'New backup is ready', time: '1h ago' }
  ];

  // 🎨 كتل الستايلات المدمجة والذكية لحل مشكلة التداخل وحساب الاتجاهات
  const styles = {
    layoutContainer: {
      direction: isRTL ? 'rtl' : 'ltr',
      minHeight: '100vh',
      backgroundColor: isDark ? '#0f172a' : '#f8fafc',
      color: isDark ? '#f1f5f9' : '#0f172a',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(4px)',
      zIndex: 40
    },
    sidebar: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      right: isRTL ? 0 : 'auto',
      left: isRTL ? 'auto' : 0,
      width: '260px',
      height: '100vh',
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      borderLeft: isRTL ? `1px solid ${isDark ? '#334155' : '#e2e8f0'}` : 'none',
      borderRight: !isRTL ? `1px solid ${isDark ? '#334155' : '#e2e8f0'}` : 'none',
      zIndex: 50,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
      transform: isMobileSidebarOpen ? 'translateX(0)' : `translateX(${isRTL ? '100%' : '-100%'})`,
      transition: 'transform 0.3s ease-in-out',
      // يضمن ظهور السايدبار دائماً في الشاشات الكبيرة تلقائياً دون تداخل
      WebkitTransform: window.innerWidth >= 1024 ? 'translateX(0)' : undefined,
    },
    sidebarHeader: {
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      borderBottom: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`
    },
    mainContentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      paddingRight: isRTL && window.innerWidth >= 1024 ? '260px' : 0,
      paddingLeft: !isRTL && window.innerWidth >= 1024 ? '260px' : 0,
      transition: 'padding 0.3s ease'
    },
    header: {
      sticky: 'top',
      position: 'sticky',
      top: 0,
      height: '64px',
      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(8px)',
      borderBottom: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      zIndex: 30
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: isDark ? '#0f172a' : '#f1f5f9',
      border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
      borderRadius: '12px',
      padding: '6px 12px',
      width: '220px'
    },
    iconBtn: {
      padding: '8px',
      borderRadius: '12px',
      border: '1px solid transparent',
      backgroundColor: 'transparent',
      color: isDark ? '#94a3b8' : '#64748b',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropdown: {
      position: 'absolute',
      top: '52px',
      left: isRTL ? '0' : 'auto',
      right: !isRTL ? '0' : 'auto',
      width: '240px',
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
      borderRadius: '16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
      zIndex: 100,
      padding: '8px 0'
    },
    mainArea: {
      flex: 1,
      padding: window.innerWidth >= 1024 ? '24px' : '16px',
      maxWidth: '1600px',
      width: '100%',
      margin: '0 auto',
      boxSizing: 'border-box'
    }
  };

  // معالجة برمجية ديناميكية لتخطي الـ Media Queries في الـ inline style للشاشات الكبيرة
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isLargeScreen = windowWidth >= 1024;
  const responsiveSidebarStyle = {
    ...styles.sidebar,
    transform: isLargeScreen ? 'translateX(0)' : styles.sidebar.transform,
    position: isLargeScreen ? 'fixed' : 'fixed'
  };

  const responsiveContentStyle = {
    ...styles.mainContentWrapper,
    paddingRight: isRTL && isLargeScreen ? '260px' : 0,
    paddingLeft: !isRTL && isLargeScreen ? '260px' : 0
  };

  return (
    <div style={styles.layoutContainer}>
      
      {/* 1️⃣ الغطاء الضبابي للموبايل */}
      {!isLargeScreen && isMobileSidebarOpen && (
        <div style={styles.overlay} onClick={() => setIsMobileSidebarOpen(false)} />
      )}

      {/* 2️⃣ القائمة الجانبية المعزولة بالكامل */}
      <aside ref={sidebarRef} style={responsiveSidebarStyle}>
        <div style={styles.sidebarHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6, #ec4899)', display: 'flex', alignItems: 'center', justifycontent: 'center', alignItems: 'center', justifyContent: 'center' }}>
              <Shield style={{ width: '20px', height: '20px', color: '#ffffff' }} />
            </div>
            <span style={{ fontSize: '18px', fontWeight: 'bold', background: 'linear-gradient(90deg, #2563eb, #db2777)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              nawh.ai
            </span>
          </div>
          {!isLargeScreen && (
            <button onClick={() => setIsMobileSidebarOpen(false)} style={styles.iconBtn}>
              <X style={{ width: '20px', height: '20px' }} />
            </button>
          )}
        </div>

        <nav style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin/');
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  fontWeight: '500',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textAlign: isRTL ? 'right' : 'left',
                  backgroundColor: isActive ? (isDark ? 'rgba(59, 130, 246, 0.15)' : '#eff6ff') : 'transparent',
                  color: isActive ? (isDark ? '#60a5fa' : '#2563eb') : (isDark ? '#94a3b8' : '#475569'),
                  transition: 'all 0.2s'
                }}
              >
                <Icon style={{ width: '20px', height: '20px', color: isActive ? '#3b82f6' : '#94a3b8' }} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* 3️⃣ الجزء الخاص بالهيدر والمحتوى الداخلي الحاضن */}
      <div style={responsiveContentStyle}>
        
        <header style={styles.header}>
          {/* زر السايدبار للهواتف */}
          {!isLargeScreen && (
            <button onClick={() => setIsMobileSidebarOpen(true)} style={{ ...styles.iconBtn, backgroundColor: isDark ? '#334155' : '#f1f5f9' }}>
              <Menu style={{ width: '20px', height: '20px', color: isDark ? '#ffffff' : '#000000' }} />
            </button>
          )}

          {/* حقل البحث التجاري */}
          <div style={{ ...styles.searchContainer, display: isLargeScreen ? 'flex' : 'none' }}>
            <Search style={{ width: '16px', height: '16px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder={language === 'ar' ? 'بحث سريع...' : 'Quick search...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ bg: 'transparent', border: 'none', outline: 'none', fontSize: '13px', width: '100%', backgroundColor: 'transparent', color: 'inherit' }}
            />
          </div>

          {/* أزرار الإعدادات العلوية */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            
            {/* زر تغيير اللغة */}
            <button onClick={toggleLanguage} style={styles.iconBtn} title={language === 'ar' ? 'Change to English' : 'تغيير إلى العربية'}>
              <Globe style={{ width: '18px', height: '18px', marginLeft: '4px' }} />
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{language === 'ar' ? 'EN' : 'ع'}</span>
            </button>

            {/* زر المظهر */}
            <button onClick={toggleTheme} style={styles.iconBtn}>
              {isDark ? <Sun style={{ width: '18px', height: '18px', color: '#f59e0b' }} /> : <Moon style={{ width: '18px', height: '18px' }} />}
            </button>

            {/* الإشعارات */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsProfileOpen(false); }} style={styles.iconBtn}>
                <Bell style={{ width: '18px', height: '18px' }} />
                <span style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }} />
              </button>

              {isNotificationsOpen && (
                <div style={styles.dropdown}>
                  <div style={{ padding: '8px 16px', borderBottom: `1px solid ${isDark ? '#334155' : '#f1f5f9'}`, fontSize: '12px', fontWeight: 'bold' }}>
                    {language === 'ar' ? 'الإشعارات الحية' : 'Live Alerts'}
                  </div>
                  {notifications.map((n) => (
                    <div key={n.id} style={{ padding: '10px 16px', borderBottom: `1px solid ${isDark ? '#334155' : '#f8fafc'}`, cursor: 'pointer' }}>
                      <p style={{ margin: 0, fontSize: '12px', fontWeight: '500' }}>{n.text}</p>
                      <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginTop: '2px' }}>{n.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* بروفايل المشرف */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationsOpen(false); }} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, #2563eb, #db2777)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: '13px' }}>
                  A
                </div>
              </button>

              {isProfileOpen && (
                <div style={styles.dropdown}>
                  <div style={{ padding: '8px 16px', borderBottom: `1px solid ${isDark ? '#334155' : '#f1f5f9'}` }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>Admin Root</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>root@nawh.ai</p>
                  </div>
                  <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: 'none', backgroundColor: 'transparent', color: '#ef4444', fontSize: '13px', fontWeight: '500', cursor: 'pointer', textAlign: isRTL ? 'right' : 'left' }}>
                    <LogOut style={{ width: '16px', height: '16px' }} />
                    <span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout System'}</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* 4️⃣ مكان حقن وعرض الصفحات الداخلية (مثل الـ Dashboard) */}
        <main style={styles.mainArea}>
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;

/**
 * SettingsPage.jsx
 * Premium settings page for nawh.ai
 *
 * Features:
 * - Language toggle (Arabic/English)
 * - Theme toggle (Dark/Light mode)
 * - Account settings
 * - Support links
 * - RTL/LTR responsive layouts
 * - Beautiful animated toggles
 *
 * @author nawh.ai
 * @version 1.0.0
 */

import { useState } from 'react';
import {
  Moon,
  Sun,
  Globe,
  User,
  Bell,
  Shield,
  HelpCircle,
  Info,
  ChevronRight,
  Mail,
  Lock,
  LogOut,
  MessageSquare,
  FileText,
  Heart,
} from 'lucide-react';
import { useLanguage, useThemeLanguage } from '../context/ThemeLanguageContext.jsx';
import { Card } from '../components/Card.jsx';
import Toggle from '../components/Toggle.jsx';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';

/**
 * Setting Item Component
 */
function SettingItem({ icon: Icon, title, description, action, onClick, language }) {
  const { isRTL } = useLanguage();

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group text-start"
    >
      <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
        <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 dark:text-white">{title}</p>
        {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      <div className="flex-shrink-0">
        {action || (
          <ChevronRight className={`w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors ${isRTL ? 'rotate-180' : ''}`} />
        )}
      </div>
    </button>
  );
}

/**
 * SettingsPage Component
 */
function SettingsPage() {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const { theme, toggleTheme, isDark } = useThemeLanguage();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className={`pt-16 lg:${isRTL ? 'pr-64' : 'pl-64'}`}>
        <Sidebar />

        <main className="p-6 max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {language === 'ar' ? 'الإعدادات' : 'Settings'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {language === 'ar' ? 'خصّص تجربتك مع nawh.ai' : 'Customize your nawh.ai experience'}
            </p>
          </div>

          <div className="space-y-6">
            {/* Appearance Section */}
            <Card>
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  {language === 'ar' ? 'المظهر' : 'Appearance'}
                </h2>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {/* Dark Mode Toggle */}
                <div className="p-4">
                  <Toggle
                    checked={isDark}
                    onChange={toggleTheme}
                    label={language === 'ar' ? 'الوضع الليلي' : 'Dark Mode'}
                    description={
                      isDark
                        ? language === 'ar'
                          ? 'اضغط للتبديل للوضع النهاري'
                          : 'Tap to switch to light mode'
                        : language === 'ar'
                          ? 'اضغط للتبديل للوضع الليلي'
                          : 'Tap to switch to dark mode'
                    }
                  />
                </div>

                {/* Language Toggle */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {language === 'ar' ? 'اللغة' : 'Language'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {language === 'ar' ? 'العربية' : 'English'}
                        </p>
                      </div>
                    </div>

                    {/* Language Switcher */}
                    <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                      <button
                        onClick={() => language !== 'ar' && toggleLanguage()}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          language === 'ar'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        العربية
                      </button>
                      <button
                        onClick={() => language !== 'en' && toggleLanguage()}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          language === 'en'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        English
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Account Section */}
            <Card>
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {language === 'ar' ? 'الحساب' : 'Account'}
                </h2>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                <SettingItem
                  icon={Mail}
                  title={language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  description="user@nawh.ai"
                  language={language}
                />
                <SettingItem
                  icon={Lock}
                  title={language === 'ar' ? 'كلمة المرور' : 'Password'}
                  description={language === 'ar' ? 'آخر تحديث منذ 30 يوم' : 'Last updated 30 days ago'}
                  language={language}
                />
                <SettingItem
                  icon={Bell}
                  title={language === 'ar' ? 'الإشعارات' : 'Notifications'}
                  description={
                    notifications
                      ? language === 'ar'
                        ? 'مفعّلة'
                        : 'Enabled'
                      : language === 'ar'
                        ? 'معطّلة'
                        : 'Disabled'
                  }
                  action={
                    <Toggle checked={notifications} onChange={setNotifications} />
                  }
                />
              </div>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  {language === 'ar' ? 'الخصوصية والأمان' : 'Privacy & Security'}
                </h2>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                <SettingItem
                  icon={Shield}
                  title={language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                  language={language}
                />
                <SettingItem
                  icon={FileText}
                  title={language === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
                  language={language}
                />
              </div>
            </Card>

            {/* Support Section */}
            <Card>
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  {language === 'ar' ? 'المساعدة والدعم' : 'Help & Support'}
                </h2>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                <SettingItem
                  icon={MessageSquare}
                  title={language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  description={language === 'ar' ? 'احصل على المساعدة من فريق الدعم' : 'Get help from our support team'}
                  language={language}
                />
                <SettingItem
                  icon={HelpCircle}
                  title={language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
                  description={language === 'ar' ? 'إجابات للأسئلة المتكررة' : 'Answers to frequently asked questions'}
                  language={language}
                />
                <SettingItem
                  icon={Info}
                  title={language === 'ar' ? 'حول التطبيق' : 'About'}
                  description={`${language === 'ar' ? 'الإصدار' : 'Version'} 1.0.0`}
                  language={language}
                />
              </div>
            </Card>

            {/* Logout */}
            <button
              className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              {language === 'ar' ? 'تسجيل الخروج' : 'Log Out'}
            </button>

            {/* Footer */}
            <div className="text-center pt-6">
              <p className="text-gray-400 dark:text-gray-600 text-sm flex items-center justify-center gap-1">
                {language === 'ar' ? 'صُنع بـ' : 'Made with'} <Heart className="w-4 h-4 text-red-500 fill-current" /> {language === 'ar' ? 'بواسطة nawh.ai' : 'by nawh.ai'}
              </p>
              <p className="text-gray-300 dark:text-gray-700 text-xs mt-2">
                © 2024 nawh.ai. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SettingsPage;

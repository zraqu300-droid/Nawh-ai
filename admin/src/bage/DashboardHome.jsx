import React from 'react';
import { 
  Users, Database, BarChart3, Upload, RefreshCw, 
  ArrowUpRight, CheckCircle, FileText 
} from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext.jsx';

function DashboardHome() {
  const { language } = useThemeLanguage();

  // قاموس الترجمة الخاص بصفحة العرض الكبرى
  const t = {
    title: language === 'ar' ? 'لوحة التحكم المركزية' : 'Central Dashboard',
    subtitle: language === 'ar' ? 'مرحباً بك في قلب نظام nawh.ai' : 'Welcome to the heart of nawh.ai',
    statUsers: language === 'ar' ? 'إجمالي المستخدمين' : 'Total Users',
    statData: language === 'ar' ? 'البيانات المرفوعة' : 'Uploaded Data',
    statStorage: language === 'ar' ? 'حجم قاعدة البيانات' : 'Database Storage',
    quickActions: language === 'ar' ? 'الإجراءات السريعة' : 'Quick Actions',
    recentActivity: language === 'ar' ? 'آخر النشاطات الحية' : 'Live Recent Activities',
    uploadBtn: language === 'ar' ? 'رفع ملف بيانات جديد' : 'Upload New Data File',
    syncBtn: language === 'ar' ? 'تحديث ومزامنة السيرفر' : 'Sync & Refresh Server',
  };

  return (
    <div className="space-y-6">
      {/* بنر الترحيب العلوي الفاخر */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl animate-fade-in">
        <h1 className="text-2xl font-bold mb-1">{t.title}</h1>
        <p className="text-white/85 text-sm">{t.subtitle}</p>
      </div>

      {/* شبكة الكروت الإحصائية الكبرى */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* كارت المستخدمين */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between transition-transform hover:scale-[1.01]">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t.statUsers}</p>
            <h3 className="text-3xl font-bold mt-2 font-mono">1,248</h3>
            <span className="text-xs text-green-500 flex items-center gap-1 mt-2">
              <ArrowUpRight className="w-3 h-3" /> +12% {language === 'ar' ? 'هذا الأسبوع' : 'this week'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* كارت البيانات */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between transition-transform hover:scale-[1.01]">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t.statData}</p>
            <h3 className="text-3xl font-bold mt-2 font-mono">84,512</h3>
            <span className="text-xs text-green-500 flex items-center gap-1 mt-2">
              <ArrowUpRight className="w-3 h-3" /> +5.4% {language === 'ar' ? 'مزامنة مستقرة' : 'Synced'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
        </div>

        {/* كارت قاعدة البيانات */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between transition-transform hover:scale-[1.01]">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t.statStorage}</p>
            <h3 className="text-3xl font-bold mt-2 font-mono">14.2 GB</h3>
            <span className="text-xs text-gray-400 flex items-center gap-1 mt-2">
              {language === 'ar' ? 'الحد الأقصى 50GB' : 'Max capacity 50GB'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/30 text-pink-600 flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* لوحة العمليات والنشاطات الحية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* كارت الإجراءات السريعة */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
          <h2 className="text-lg font-bold border-b border-gray-100 dark:border-gray-700 pb-3">{t.quickActions}</h2>
          
          <button className="w-full py-3.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-xl font-medium transition-colors flex items-center justify-center gap-3">
            <Upload className="w-5 h-5 text-blue-500" />
            <span>{t.uploadBtn}</span>
          </button>

          <button className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-md flex items-center justify-center gap-3">
            <RefreshCw className="w-5 h-5" />
            <span>{t.syncBtn}</span>
          </button>
        </div>

        {/* كارت النشاطات الحية المعروضة للمشتري */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
          <h2 className="text-lg font-bold border-b border-gray-100 dark:border-gray-700 pb-3">{t.recentActivity}</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">{language === 'ar' ? 'توليد حزمة الـ APK نجح' : 'APK Build Success'}</p>
                  <p className="text-xs text-gray-400">GitHub Actions CI/CD</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{language === 'ar' ? 'الآن' : 'Now'}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">{language === 'ar' ? 'تحديث ملف التكوين الرئيسي' : 'Config properties updated'}</p>
                  <p className="text-xs text-gray-400">capacitor.config.json</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">5m ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;

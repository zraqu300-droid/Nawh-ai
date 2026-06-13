import React from 'react';
import { 
  Users, Database, BarChart3, Upload, RefreshCw, 
  ArrowUpRight, CheckCircle, FileText, Activity, Zap, TrendingUp
} from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext.jsx';

function DashboardHome() {
  const { language, isRTL } = useThemeLanguage();

  // قاموس الترجمة الخاص بصفحة العرض الكبرى
  const t = {
    title: language === 'ar' ? 'لوحة التحكم المركزية' : 'Central Dashboard',
    subtitle: language === 'ar' ? 'مرحباً بك في قلب نظام nawh.ai النبضي' : 'Welcome to the heartbeat of nawh.ai system',
    statUsers: language === 'ar' ? 'إجمالي المستخدمين النشطين' : 'Total Active Users',
    statData: language === 'ar' ? 'السجلات والبيانات المرفوعة' : 'Uploaded Records & Data',
    statStorage: language === 'ar' ? 'حجم سعة قاعدة البيانات' : 'Database Storage Capacity',
    quickActions: language === 'ar' ? 'الإجراءات والعمليات السريعة' : 'Quick Operational Actions',
    recentActivity: language === 'ar' ? 'آخر النشاطات الحية والنظام' : 'Live System Recent Activities',
    uploadBtn: language === 'ar' ? 'رفع ملف بيانات سحابي جديد' : 'Upload New Cloud Data File',
    syncBtn: language === 'ar' ? 'تحديث ومزامنة الخادم الفورية' : 'Instant Sync & Refresh Server',
  };

  return (
    <div className="space-y-8 animate-fade-in p-1">
      
      {/* 🔮 بنر الترحيب العلوي الفاخر بتصميم نيون مستقبلي */}
      <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 via-purple-600 to-pink-500 text-white shadow-xl shadow-indigo-500/10 dark:shadow-purple-950/20">
        {/* أشكال خلفية جمالية متوهجة */}
        <div className="absolute top-[-50%] left-[-20%] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-10%] w-80 h-80 bg-pink-400/20 rounded-full blur-2xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wide border border-white/10">
              <Zap className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              <span>v1.0.0 Production Stable</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">{t.title}</h1>
            <p className="text-white/80 text-sm md:text-base font-medium max-w-xl">{t.subtitle}</p>
          </div>
          
          <div className="hidden md:flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
            <Activity className="w-10 h-10 text-white animate-pulse" />
          </div>
        </div>
      </div>

      {/* 📊 شبكة الكروت الإحصائية الكبرى بتأثيرات Hover متقدمة ألوان ناعمة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* كارت المستخدمين - النمط الأزرق */}
        <div className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700/60 flex items-center justify-between transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          <div className="space-y-1">
            <p className="text-xs text-gray-400 dark:text-gray-400 font-bold uppercase tracking-wider">{t.statUsers}</p>
            <h3 className="text-3xl font-black text-gray-800 dark:text-white font-mono tracking-tight mt-1">1,248</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-500 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded-md mt-2">
              <ArrowUpRight className="w-3 h-3" /> +12% {language === 'ar' ? 'هذا الأسبوع' : 'this week'}
            </span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform duration-300">
            <Users className="w-7 h-7" />
          </div>
        </div>

        {/* كارت البيانات - النمط البنفسجي */}
        <div className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700/60 flex items-center justify-between transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          <div className="space-y-1">
            <p className="text-xs text-gray-400 dark:text-gray-400 font-bold uppercase tracking-wider">{t.statData}</p>
            <h3 className="text-3xl font-black text-gray-800 dark:text-white font-mono tracking-tight mt-1">84,512</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 px-2 py-0.5 rounded-md mt-2">
              <TrendingUp className="w-3 h-3" /> +5.4% {language === 'ar' ? 'مزامنة مستقرة' : 'Synced'}
            </span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform duration-300">
            <Database className="w-7 h-7" />
          </div>
        </div>

        {/* كارت قاعدة البيانات - النمط الوردي */}
        <div className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700/60 flex items-center justify-between transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          <div className="space-y-1">
            <p className="text-xs text-gray-400 dark:text-gray-400 font-bold uppercase tracking-wider">{t.statStorage}</p>
            <h3 className="text-3xl font-black text-gray-800 dark:text-white font-mono tracking-tight mt-1">14.2 GB</h3>
            <div className="w-32 bg-gray-100 dark:bg-gray-700 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-full w-[28.4%]" />
            </div>
            <p className="text-[10px] text-gray-400 font-medium mt-1">
              {language === 'ar' ? 'المستهلك 28% من الحد الأقصى 50GB' : '28% used of 50GB Max limit'}
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/40 dark:to-pink-900/20 text-pink-600 dark:text-pink-400 flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform duration-300">
            <BarChart3 className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* ⚡ لوحة العمليات التنفيذية والنشاطات الحية المتقدمة */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* كارت الإجراءات السريعة بتصميم أزرار تفاعلية فخمة */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/60 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2 border-b border-gray-50 dark:border-gray-700/50 pb-4">
              <span className="w-2 h-4 rounded-sm bg-blue-500" />
              {t.quickActions}
            </h2>
            <p className="text-xs text-gray-400 mt-2">
              {language === 'ar' ? 'إجراءات تحكم مباشرة سريعة لبنية التطبيق والنظام السحابي.' : 'Instant action controller for system architecture and app updates.'}
            </p>
          </div>
          
          <div className="space-y-3">
            <button className="w-full py-4 px-5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900/50 dark:hover:bg-gray-700/40 border border-gray-200/60 dark:border-gray-700 rounded-xl font-semibold text-sm transition-all flex items-center justify-between group active:scale-[0.99]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-500 flex items-center justify-center shadow-sm">
                  <Upload className="w-4 h-4" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">{t.uploadBtn}</span>
              </div>
              <span className={`text-xs text-gray-400 transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                {isRTL ? '←' : '→'}
              </span>
            </button>

            <button className="w-full py-4 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-3 group active:scale-[0.99]">
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              <span>{t.syncBtn}</span>
            </button>
          </div>
        </div>

        {/* كارت النشاطات الحية المميز بستايل خطوط المطورين والـ Real-time Logs */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/60 space-y-5">
          <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-700/50 pb-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <span className="w-2 h-4 rounded-sm bg-purple-500" />
              {t.recentActivity}
            </h2>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
          </div>
          
          <div className="space-y-4">
            
            {/* النشاط الأول: نجاح بناء الـ APK والـ CI/CD Pipeline */}
            <div className="group flex items-start justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-50/30 dark:from-gray-900/40 dark:to-gray-900/10 rounded-xl border border-gray-100/70 dark:border-gray-700/30 transition-all hover:bg-white dark:hover:bg-gray-700/30 hover:shadow-md hover:shadow-gray-200/10">
              <div className="flex gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/50 text-green-500 flex items-center justify-center border border-green-100/50 dark:border-green-900/30 mt-0.5">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    {language === 'ar' ? 'توليد حزمة الـ APK نجح ومستقر' : 'APK Build Success & Signed'}
                  </p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">GitHub Actions CI/CD Pipeline</p>
                </div>
              </div>
              <span className="text-[11px] font-medium text-green-500 bg-green-50 dark:bg-green-950/50 px-2 py-0.5 rounded-md font-mono">
                {language === 'ar' ? 'الآن' : 'Now'}
              </span>
            </div>

            {/* النشاط الثاني: تحديث ملف الـ Capacitor */}
            <div className="group flex items-start justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-50/30 dark:from-gray-900/40 dark:to-gray-900/10 rounded-xl border border-gray-100/70 dark:border-gray-700/30 transition-all hover:bg-white dark:hover:bg-gray-700/30 hover:shadow-md hover:shadow-gray-200/10">
              <div className="flex gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-500 flex items-center justify-center border border-purple-100/50 dark:border-purple-900/30 mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    {language === 'ar' ? 'تحديث ملف التكوين الرئيسي بنجاح' : 'Config properties initialized'}
                  </p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">capacitor.config.json</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md font-mono">
                5m ago
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;

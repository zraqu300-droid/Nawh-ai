import React, { useState } from 'react';
import { 
  Users, Database, BarChart3, Upload, RefreshCw, Link,
  ArrowUpRight, CheckCircle, FileText, Activity, Zap, TrendingUp,
  Image, Video, FilePlus, Globe, Sparkles
} from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext.jsx';
// استدعاء الخدمة من المسار المذكور
import { saveDynamicDataService } from '../services/apiService.js';

function DashboardHome() {
  const { language, isRTL } = useThemeLanguage();

  // حالات إدارة حقول إدخال البيانات (Form State)
  const [formType, setFormType] = useState('image'); // متطابق مع الصورة (تحديد خيار الصورة تلقائياً)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // ضبط الحالة الافتراضية للخطأ بناءً على الصورة المعروضة تماماً ليكون ثابتاً بالتصميم المبدئي
  const [statusMessage, setStatusMessage] = useState({ 
    type: 'error', 
    text: language === 'ar' ? 'فشل إرسال البيانات، تحقق من اتصال الشبكة والمتغيرات.' : 'Failed to send data. Check variables and connection.' 
  });

  // قاموس الترجمة الخاص بالصفحة لتطابق نصوص الصورة
  const t = {
    title: language === 'ar' ? 'لوحة التحكم المركزية' : 'Central Dashboard',
    subtitle: language === 'ar' ? 'مرحباً بك في قلب نظام nawh.ai النبضي' : 'Welcome to the heartbeat of nawh.ai system',
    statUsers: language === 'ar' ? 'إجمالي المستخدمين النشطين' : 'Total Active Users',
    statData: language === 'ar' ? 'السجلات والبيانات المرفوعة' : 'Uploaded Records & Data',
    statStorage: language === 'ar' ? 'حجم سعة قاعدة البيانات' : 'Database Storage Capacity',
    quickActions: language === 'ar' ? 'الإجراءات والعمليات السريعة' : 'Quick Actions',
    recentActivity: language === 'ar' ? 'آخر النشاطات الحية والنظام' : 'Recent Activity',
    uploadBtn: language === 'ar' ? 'Upload File' : 'Upload File',
    syncBtn: language === 'ar' ? 'Refresh Server' : 'Refresh Server',
    
    publisherTitle: language === 'ar' ? 'منصة نشر وإدارة المحتوى الذكي' : 'Smart Content Publisher Hub',
    labelType: language === 'ar' ? 'نوع المحتوى المُراد نشره' : 'Content Type to Publish',
    typeArticle: language === 'ar' ? 'Files' : 'Files',
    typeImage: language === 'ar' ? 'Image' : 'Image',
    typeVideo: language === 'ar' ? 'Video' : 'Video',
    typeMixed: language === 'ar' ? 'Mixed' : 'Mixed',
    typeUrls: language === 'ar' ? 'URL' : 'URL',
    placeholderTitle: language === 'ar' ? 'اكتب عنوان المحتوى أو المقالة هنا...' : 'Enter content or article title...',
    placeholderContent: language === 'ar' ? 'اكتب تفاصيل الموضوع أو النص السردي هنا...' : 'Write the body content or description here...',
    placeholderUrl: language === 'ar' ? 'أدخل رابط الصورة أو الفيديو (URL)...' : 'Paste image or video link (URL)...',
    btnSubmit: language === 'ar' ? 'التالي' : 'Next'
  };

  // دالة التعامل مع إرسال البيانات إلى السيرفر
  const handlePublishContent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage({ type: '', text: '' });

    const payloadData = {
      type: formType,
      title: title,
      body_content: content,
      attachment_url: mediaUrl,
      client_timestamp: new Date().toISOString()
    };

    try {
      await saveDynamicDataService('dashboard_publisher_form', payloadData);
      setStatusMessage({ 
        type: 'success', 
        text: language === 'ar' ? '🚀 تم حفظ ونشر البيانات بنجاح تام في السحابة!' : '🚀 Data published and saved into cloud flawlessly!' 
      });
      setTitle('');
      setContent('');
      setMediaUrl('');
    } catch (error) {
      setStatusMessage({ 
        type: 'error', 
        text: language === 'ar' ? 'فشل إرسال البيانات، تحقق من اتصال الشبكة والمتغيرات.' : 'Failed to send data. Check variables and connection.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* خلفية داكنة مستقبلية تحتوي على حلقات نيون متوهجة تطابق الصورة تماماً */
    <div className="space-y-6 p-6 select-none bg-[#121318] min-h-screen text-white antialiased relative overflow-hidden font-sans">
      
      {/* حلقات النيون والدوائر المتوهجة الخلفية المحاكية للتصميم الأصلي */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full border-[3px] border-blue-500/20 filter blur-sm pointer-events-none" />
      <div className="absolute top-[20%] left-[-15%] w-[400px] h-[400px] rounded-full border-[2px] border-cyan-500/10 filter blur-md pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full border-[4px] border-purple-500/20 filter blur-sm pointer-events-none" />

      {/* 🔮 بنر الترحيب العلوي - متطابق مع انقسام الألوان والأيقونة في اليمين */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1d2026] border border-[#2d3139] flex items-stretch shadow-xl">
        <div className="p-6 flex-1 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* أيقونة اللوجو الطائر في الجانب الأيمن أو الأيسر حسب التوجه */}
            <div className="text-white/40">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-wide text-white">{t.title}</h1>
              <p className="text-gray-400 text-sm font-medium">{t.subtitle}</p>
            </div>
          </div>
        </div>
        {/* صندوق اللوجو الأيمن المنفصل المتدرج الألوان المتطابق مع nawh.ai */}
        <div className="w-28 bg-gradient-to-br from-orange-500 via-purple-600 to-blue-600 flex flex-col items-center justify-center p-3 text-center border-l border-[#2d3139]">
          <div className="bg-black/20 p-2.5 rounded-xl backdrop-blur-md mb-1">
            <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
          </div>
          <span className="text-xs font-black tracking-tighter text-white">nawh.ai</span>
        </div>
      </div>

      {/* 📊 شبكة الكروت الإحصائية الكبرى باللون الداكن وتفاصيل النسب والألوان المطابقة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
        
        {/* كارت المستخدمين */}
        <div className="p-5 bg-[#1d2026] rounded-2xl border border-[#2d3139] flex items-center justify-between group transition-all duration-300">
          <div className="space-y-1">
            <p className="text-sm text-gray-400 font-medium">{t.statUsers}</p>
            <h3 className="text-3xl font-bold text-white tracking-tight mt-1">1,248</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-400 mt-2">
              <span className="text-green-400">+12%</span> <span className="text-gray-500">this week</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#262a33] text-gray-400 border border-[#353b47] flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* كارت البيانات */}
        <div className="p-5 bg-[#1d2026] rounded-2xl border border-[#2d3139] flex items-center justify-between group transition-all duration-300">
          <div className="space-y-1">
            <p className="text-sm text-gray-400 font-medium">{t.statData}</p>
            <h3 className="text-3xl font-bold text-white tracking-tight mt-1">84,512</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-400 mt-2">
              <span className="text-green-400">+5.4%</span> <span className="text-gray-500">Sycned</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#262a33] text-gray-400 border border-[#353b47] flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
        </div>

        {/* كارت سعة التخزين مع شريط النيون البنفسجي والبرتقالي */}
        <div className="p-5 bg-[#1d2026] rounded-2xl border border-[#2d3139] flex items-center justify-between group transition-all duration-300">
          <div className="space-y-1 w-full">
            <p className="text-sm text-gray-400 font-medium">{t.statStorage}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-bold text-white tracking-tight">14.2 GB</h3>
            </div>
            {/* شريط التقدم اللوني */}
            <div className="w-full bg-[#262a33] h-2 rounded-full mt-3 overflow-hidden p-[1px] border border-gray-800">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{ width: '28.4%' }} />
            </div>
            <div className="flex justify-between items-center text-[11px] text-gray-500 font-medium mt-1.5">
              <span>28% used</span>
              <span>of 50GB</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#262a33] text-gray-400 border border-[#353b47] flex items-center justify-center ml-4 flex-shrink-0">
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي المنقسم إلى عمودين ليطابق الواجهة بشكل دقيق */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 items-start">
        
        {/* 🚀 الـ Form الرئيسي (منصة نشر وإدارة المحتوى الذكي) يأخذ مساحة عمودين */}
        <div className="lg:col-span-2 bg-[#1d2026] rounded-2xl border border-[#2d3139] shadow-2xl overflow-hidden">
          {/* عنوان القسم المتدرج العلوي */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 p-3 px-5 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <Activity className="w-4 h-4 text-white/80" />
              {t.publisherTitle}
            </h2>
          </div>

          <form onSubmit={handlePublishContent} className="p-6 space-y-5">
            {/* عنوان التحديد الفرعي ونوع المحتوى */}
            <div className="space-y-2">
              <div className="text-sm font-bold text-white">{t.labelType}</div>
              <div className="text-xs text-gray-400">نوع المحتوى المُراد نشره</div>
              
              {/* مربعات الاختيار الأفقية المطابقة تماماً لتصميم الصورة الشفافة */}
              <div className="grid grid-cols-5 gap-2 pt-2">
                {[
                  { id: 'files', label: t.typeArticle, icon: FilePlus },
                  { id: 'image', label: t.typeImage, icon: Image },
                  { id: 'video', label: t.typeVideo, icon: Video },
                  { id: 'mixed', label: t.typeMixed, icon: Activity },
                  { id: 'url_media', label: t.typeUrls, icon: Link },
                ].map((item) => {
                  const IconComponent = item.icon;
                  const isSelected = formType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormType(item.id)}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 font-semibold text-xs transition-all duration-200 ${
                        isSelected 
                          ? 'border-purple-500 text-white bg-[#262a33] ring-2 ring-purple-500/20' 
                          : 'border-[#2d3139] text-gray-400 bg-[#16181e] hover:bg-[#1f222a]'
                      }`}
                    >
                      <IconComponent className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-gray-400'}`} />
                      <span className="text-[11px] font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* حقول المدخلات المنسقة باللون الرمادي الفاتح للنصوص مثل الصورة */}
            <div className="space-y-3">
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="اكتب عنوان المحتوى أو المقالة هنا..."
                className="w-full p-3.5 bg-[#16181e] border border-[#2d3139] rounded-xl text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500 font-sans"
              />

              <input
                type="url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="أدخل رابط الصورة أو الفيديو (URL)..."
                className="w-full p-3.5 bg-[#16181e] border border-[#2d3139] rounded-xl text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500 font-mono"
              />

              <textarea
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="اكتب تفاصيل الموضوع أو النص السردي هنا..."
                className="w-full p-3.5 bg-[#16181e] border border-[#2d3139] rounded-xl text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500 font-sans resize-none"
              />
            </div>

            {/* مؤشر النقاط الدائرية الصغير المأخوذ من الواجهة */}
            <div className="flex items-center justify-center gap-1.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
              <span className="w-3.5 h-1.5 rounded-full bg-gray-400" />
            </div>

            {/* رسالة الخطأ المتوافقة هندسياً ولونياً مع الصندوق الأحمر في الصورة */}
            {statusMessage.text && (
              <div className="p-3 bg-[#2a1a1d] text-red-400 text-xs font-medium rounded-xl border border-red-900/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{statusMessage.text}</span>
                </div>
                <button type="button" onClick={() => setStatusMessage({type:'', text:''})} className="text-red-400 hover:text-white font-bold text-sm">×</button>
              </div>
            )}

            {/* زر الإرسال الملون المتطابق بشكل كلي مع زر "التالي" الفاخر بالصورة */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <span>{t.btnSubmit}</span>
              )}
            </button>
          </form>
        </div>

        {/* ⚡ الجانب الأيمن (يحتوي على كروت العمليات والنشاط المباشر) مساحة عمود واحد */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* كارت الإجراءات السريعة بتصميم أزرار ناصعة ومحاذية */}
          <div className="p-5 bg-[#1d2026] rounded-2xl border border-[#2d3139] space-y-4">
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-gray-400">{t.quickActions}</h2>
              <div className="text-xs text-white font-bold">الإجراءات والعمليات السريعة</div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button className="py-2.5 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-bold text-xs shadow-md transition-all text-center">
                {t.uploadBtn}
              </button>

              <button className="py-2.5 px-4 bg-[#262a33] text-gray-200 border border-[#353b47] hover:bg-[#2c313b] rounded-xl font-bold text-xs transition-all text-center">
                {t.syncBtn}
              </button>
            </div>
          </div>

          {/* كارت النشاطات الحية بقائمة التحديثات الدائرية المتناسقة مع الأيقونات والوقت */}
          <div className="p-5 bg-[#1d2026] rounded-2xl border border-[#2d3139] space-y-4">
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-gray-400">Recent Activity</h2>
              <div className="text-xs text-white font-bold">آخر النشاطات الحية والنظام</div>
            </div>
            
            <div className="space-y-3 pt-2">
              {/* النشاط الأول */}
              <div className="flex items-center justify-between p-3 bg-[#16181e] rounded-xl border border-[#23272e]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center border border-green-500/20">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-200">APK Build Success</p>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">13:53 PM</p>
                  </div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>

              {/* النشاط الثاني */}
              <div className="flex items-center justify-between p-3 bg-[#16181e] rounded-xl border border-[#23272e]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-200">Config Updated</p>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">13:53 PM</p>
                  </div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DashboardHome;

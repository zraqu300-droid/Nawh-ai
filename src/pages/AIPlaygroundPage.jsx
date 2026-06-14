/**
 * AIPlaygroundPage.jsx
 * Premium AI Playground page for nawh.ai
 *
 * Features:
 * - Direct Live Coze Agent Integration with Premium Card Toggle
 * - Clean interface without placeholder inputs or dummy operational charts
 * - RTL/LTR aware layout
 *
 * @author nawh.ai
 * @version 1.2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Browser } from '@capacitor/browser'; // المتصفح الداخلي المدمج لمنع الخروج من التطبيق
import {
  Sparkles,
  MessageSquare,
  Bot,
  User,
  ArrowRight,
  ArrowLeft,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/ThemeLanguageContext.jsx';
import { Card } from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';

function AIPlaygroundPage() {
  const { language, isRTL } = useLanguage();
  const [isChatActive, setIsChatActive] = useState(false);
  const messagesEndRef = useRef(null);

  // الرابط الرسمي والمباشر لمنصة الـ Agent الخاص بك في Coze
  const cozeChatUrl = 'https://www.coze.com/store/agent/7651037957994135557?bot_id=true';

  /**
   * دالة فتح الشات المباشر داخل متصفح التطبيق المدمج فورا
   */
  const handleLaunchCozeChat = async () => {
    try {
      setIsChatActive(true);
      await Browser.open({ 
        url: cozeChatUrl,
        presentationStyle: 'fullscreen', // فتح الواجهة بملء الشاشة فوق التطبيق مع زر "تم" للعودة
        toolbarColor: '#4f46e5' // لون فخم يناسب الهوية اللمسية للتطبيق
      });
    } catch (error) {
      // خيار احتياطي للمتصفحات العادية
      window.open(cozeChatUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className={`pt-16 lg:${isRTL ? 'pr-64' : 'pl-64'}`}>
        <Sidebar />

        <main className="p-6 max-w-3xl mx-auto space-y-6">
          
          {/* الـ Header الرئيسي للمنصة */}
          <div className="text-center space-y-3 py-4">
            <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 items-center justify-center shadow-lg shadow-purple-500/20 mx-auto">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {language === 'ar' ? 'منصة مساعد الذكاء الاصطناعي' : 'AI Assistant Suite'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
              {language === 'ar'
                ? 'مرحباً بك في ساحة العمل الحية. يمكنك الآن إطلاق محادثة مشفرة وفورية مع وكيلك الذكي.'
                : 'Welcome to the operational hub. Launch a direct secure stream with your smart agent.'}
            </p>
          </div>

          {/* كرت التحكم المركزي والزر الواضح المباشر لفتح المحادثة */}
          <Card className="p-8 text-center space-y-6 border-2 border-indigo-100 dark:border-indigo-950/40 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-800/50 shadow-xl rounded-2xl">
            <div className="max-w-sm mx-auto space-y-4">
              <div className="flex justify-center gap-3 text-gray-400 dark:text-gray-600">
                <User className="w-6 h-6" />
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 animate-pulse" />
                <Bot className="w-6 h-6 text-indigo-500" />
              </div>

              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'بدء جلسة اتصال حية' : 'Establish Live Protocol'}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {language === 'ar'
                  ? 'سيتم فتح المساعد في نافذة ذكية مدمجة وآمنة داخل التطبيق لتجربة اتصال حقيقية بالكامل.'
                  : 'The agent will spin up in an inline native view container for zero latent production.'}
              </p>
            </div>

            {/* 🚀 الزر الواضح جدا والمطلوب لفتح كرت المحادثة مباشرة */}
            <div className="flex justify-center pt-2">
              <Button
                variant="gradient"
                size="xl"
                className="font-bold px-8 py-4 text-base rounded-xl shadow-lg shadow-indigo-500/25 hover:scale-[1.02] transition-transform"
                icon={isRTL ? <ArrowLeft className="w-5 h-5 mr-2" /> : <ArrowRight className="w-5 h-5 ml-2" />}
                onClick={handleLaunchCozeChat}
              >
                {language === 'ar' ? 'تحدث مع الذكاء الاصطناعي مباشرة 🚀' : 'Talk with AI Assistant Live 🚀'}
              </Button>
            </div>
          </Card>

          {/* تلميح ذكي وسريع للمستخدم أسفل الكرت البديل */}
          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30 flex items-start gap-3 max-w-xl mx-auto">
            <Info className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
              {language === 'ar'
                ? 'تنبيه: تم إلغاء الأوضاع التجريبية والمدخلات الوهمية. الضغط على الزر بالأعلى يربطك بالذكاء الاصطناعي الفعلي المخصص لـ Nawh-ai.'
                : 'Notice: Placeholder parameters removed. Invoking the button triggers the strict pipeline dedicated to Nawh-ai.'}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default AIPlaygroundPage;

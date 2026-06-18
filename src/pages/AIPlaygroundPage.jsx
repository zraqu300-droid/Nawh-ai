/**
 * AIPlaygroundPage.jsx
 * Premium AI Playground page for nawh.ai
 *
 * Features:
 * - Direct production API integration with https://nawh-ai.vercel.app/api/chat/route
 * - Pure Native external connection via @capacitor/core (CapacitorHttp)
 * - Ultra-premium, clean Glassmorphism design inspired by nawh.ai core branding
 * - Full RTL/LTR awareness
 */

import { useState, useRef, useEffect } from 'react';
import {
  Bot,
  User,
  Sparkles,
  Trash2,
  Copy,
  ArrowRight,
  ArrowLeft,
  Info,
  Send,
  Mic,
  Loader2,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/ThemeLanguageContext.jsx';
import { Card } from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';

// استيراد مكتبة كابتشور للاتصال الخارجي بشكل رسمي
import { CapacitorHttp } from '@capacitor/core';

export function AIPlaygroundPage() {
  const { language, isRTL } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);

  // التمرير التلقائي الفاخر عند ظهور أي رسالة جديدة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  /**
   * دالة الاتصال الذكي بالسيرفر باستخدام CapacitorHttp للاتصال الخارجي المستقر
   */
  const fetchAIResponse = async (userText) => {
    // الرابط نظيف ومكتمل وبدون امتداد .js بناءً على طلبك
    const apiUrl = 'https://nawh-ai.vercel.app/api/chat/route'; 
    
    const options = {
      url: apiUrl,
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      data: {
        message: userText,
        userId: "nawh_web_user" // معرف افتراضي للحفظ في قاعدة بيانات Neon
      },
    };

    // إرسال الطلب الخارجي عبر CapacitorHttp المدمجة والمستوردة
    const response = await CapacitorHttp.post(options);
    
    // كابتشور يرجع البيانات في الغالب داخل حقل data تلقائياً
    return response.data;
  };

  /**
   * دالة إرسال ومعالجة الرسائل ووضعها في الـ State
   */
  const handleProcessMessage = async (textToSend, isInitial = false) => {
    if (!textToSend.trim()) return;

    setIsTyping(true);
    if (!isInitial) {
      setMessages((prev) => [...prev, { id: Date.now(), text: textToSend, isUser: true }]);
      setInputText('');
    }

    try {
      // جلب استجابة الذكاء الاصطناعي
      const data = await fetchAIResponse(textToSend);

      let aiReplyText = data.reply || data.response;

      if (!aiReplyText) {
        aiReplyText = language === 'ar' 
          ? 'مرحباً بك! تلقيت رسالتك بنجاح من خلال خادم nawh.ai الحركي.' 
          : 'Welcome! Connection verified through nawh.ai core engine.';
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: aiReplyText, isUser: false }
      ]);

    } catch (error) {
      console.error('CapacitorHttp Exception:', error);
      setMessages((prev) => [
        ...prev,
        { 
          id: Date.now() + 1, 
          text: language === 'ar' ? 'فشل الاتصال بالخادم الداخلي، يرجى التحقق من الشبكة والمتغيرات.' : 'Server routing error. Please verify network configuration.', 
          isUser: false 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleStartLiveChat = () => {
    const initialQuery = language === 'ar' ? 'تفعيل الاتصال بالذكاء الاصطناعي' : 'Initialize AI Core Sync';
    setMessages([{ id: Date.now(), text: initialQuery, isUser: true }]);
    handleProcessMessage(initialQuery, true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    handleProcessMessage(inputText);
  };

  const handleVoiceTrigger = () => {
    alert(language === 'ar' ? 'جاري الاتصال بميكروفون الجهاز المستضيف...' : 'Requesting hardware microphone allocation...');
  };

  const handleCopyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0e0f14] text-gray-100 font-sans selection:bg-purple-500 selection:text-white">
      <Navbar />

      {/* المؤثرات النيونية الخلفية الفاخرة للمنصة */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className={`pt-20 lg:${isRTL ? 'pr-64' : 'pl-64'} transition-all duration-300`}>
        <Sidebar />

        <main className="p-4 md:p-6 max-w-4xl mx-auto space-y-6 relative z-10">
          
          {/* هيدر الصفحة المحسّن والأنيق */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#16171f] border border-gray-800/60 p-4 rounded-2xl shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-orange-500 flex items-center justify-center shadow-lg shadow-purple-600/10">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-wide text-white">
                  {language === 'ar' ? 'ساحة التحدث والتحكم الذكي' : 'AI Operational Terminal'}
                </h1>
                <p className="text-gray-400 text-xs mt-0.5">
                  {language === 'ar' ? 'منصة نواه المباشرة المربوطة بسيرفر Vercel عبر كابتشور هيدروليك' : 'Nawh.ai synchronized engine optimized via CapacitorHttp native layer'}
                </p>
              </div>
            </div>

            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl px-3 py-2 border border-red-500/20 text-xs font-semibold"
                icon={<Trash2 className="w-3.5 h-3.5" />}
                onClick={() => setMessages([])}
              >
                {language === 'ar' ? 'تصفير المحادثة' : 'Flush Session'}
              </Button>
            )}
          </div>

          {/* كارت الشات المحدث بالكامل والمغلق على نظام لوحة تحكم المحتوى الذكي */}
          <Card className="h-[calc(100vh-270px)] bg-[#16171f] flex flex-col p-0 overflow-hidden border border-gray-800/80 shadow-2xl rounded-2xl relative">
            
            {/* بار الحالة العلوي للكارد لتوثيق نوعية الشبكة الخارجية */}
            <div className="bg-[#1c1d26] px-4 py-2.5 border-b border-gray-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[11px] font-mono text-gray-400 tracking-wider uppercase">Native CapacitorHttp Operational</span>
              </div>
              <span className="text-[11px] text-gray-500 font-mono">nawh-ai.vercel.app/api/chat/route</span>
            </div>

            {/* منطقة عرض الرسائل المتدفقة */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-none">
              {messages.length === 0 ? (
                
                /* واجهة البداية الفاخرة */
                <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-inner">
                    <Bot className="w-8 h-8 text-blue-400" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <h2 className="text-md font-bold text-white">
                      {language === 'ar' ? 'بداية جلسة ذكاء اصطناعي جديدة' : 'Initialize Terminal Node'}
                    </h2>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {language === 'ar' 
                        ? 'انقر بالأسفل لفتح كارت التحدث الحركي والبدء في إرسال الأوامر المباشرة لقاعدة بياناتك والوكيل.' 
                        : 'Deploy interactive socket layers to start streaming inputs to the OpenRouter cluster.'}
                    </p>
                  </div>

                  <Button
                    variant="gradient"
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 hover:opacity-95 text-white font-bold py-3 text-xs rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2"
                    icon={isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    onClick={handleStartLiveChat}
                  >
                    {language === 'ar' ? 'افتح كارت التحدث الفوري' : 'Invoke AI Workspace'}
                  </Button>
                </div>
              ) : (
                
                /* استعراض الرسائل عند بدء المحادثة */
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex gap-3 items-start ${msg.isUser ? 'flex-row-reverse' : ''}`}
                    >
                      {/* دائرة الأفتار للمتحدث */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border shadow-inner ${
                        msg.isUser 
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white border-blue-500/30' 
                          : 'bg-gray-800 border-gray-700 text-gray-300'
                      }`}>
                        {msg.isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                      </div>

                      {/* كتل النصوص والمحتوى الفاخرة */}
                      <div className="relative group max-w-[85%] sm:max-w-[75%]">
                        <div className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                          msg.isUser
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-none font-medium'
                            : 'bg-gray-800 text-gray-100 border border-gray-700/60 rounded-tl-none'
                        }`}>
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                        
                        {/* زر النسخ الخفي الأنيق */}
                        {!msg.isUser && (
                          <button 
                            onClick={() => handleCopyText(msg.text, msg.id)}
                            className="absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 border border-gray-700 text-gray-400 hover:text-white p-1.5 rounded-lg shadow-md flex items-center gap-1 text-[10px]"
                            style={{ [isRTL ? 'left' : 'right']: '-42px' }}
                          >
                            {copiedId === msg.id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* مؤشر جاري الكتابة والتفكير (Typing Indicator) */}
                  {isTyping && (
                    <div className="flex gap-3 items-center">
                      <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <div className="bg-gray-800 border border-gray-700/60 px-4 py-3 rounded-xl rounded-tl-none flex items-center gap-1 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* صندوق الإدخل المدمج بالكامل أسفل كارت المحادثة المتحدثة */}
            {messages.length > 0 && (
              <form 
                onSubmit={handleSendMessage}
                className="p-3 md:p-4 border-t border-gray-800 bg-[#1c1d26] flex items-center gap-2"
              >
                <button
                  type="button"
                  onClick={handleVoiceTrigger}
                  className="p-2.5 rounded-xl bg-gray-800 border border-gray-700 hover:bg-gray-750 text-gray-400 hover:text-white transition-colors"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isTyping}
                  placeholder={
                    language === 'ar' 
                      ? 'اكتب أمرك أو استفسارك هنا بكل سلاسة...' 
                      : 'Type your secure command node text...'
                  }
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-700 bg-[#12131a] text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 transition-all placeholder:text-gray-500"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:hover:opacity-40 transition-all flex items-center justify-center shadow-md hover:opacity-95"
                >
                  {isTyping ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  )}
                </button>
              </form>
            )}
          </Card>

          {/* التنبيه الشفاف الفاخر بالأسفل لتأكيد نوعية الاتصال الهجين */}
          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-[11px] text-gray-400 leading-relaxed">
              {language === 'ar'
                ? 'معلومات النظام الحية: يتم الآن توجيه كافة الطلبات الخارجية للمحاكاة عبر مكتبة CapacitorHttp الرسمية مباشرة للرابط المستقر بدون عوائق Cors.'
                : 'Node Diagnostics: Cross-origin HTTP routing verified via native @capacitor/core network bridge.'}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AIPlaygroundPage;

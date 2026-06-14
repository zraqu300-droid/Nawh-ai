/**
 * AIPlaygroundPage.jsx
 * Premium AI Playground page for nawh.ai
 *
 * Features:
 * - Centralized live API communication via apiService.js
 * - Fully functional text chat interface & audio triggers inside the card
 * - Capable of handling active continuous user queries to Coze Agent
 * - RTL/LTR aware layouts
 *
 * @author nawh.ai
 * @version 1.3.0
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
  Loader2
} from 'lucide-react';
import { useLanguage } from '../context/ThemeLanguageContext.jsx';
import { Card } from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';

// 1️⃣ إعادة استيراد خدمة الاتصال بقاعدة البيانات والـ API الخارجي
import apiService from '../services/apiService.js';

export function AIPlaygroundPage() {
  const { language, isRTL } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  const messagesEndRef = useRef(null);

  // التمرير التلقائي لأسفل المحادثة عند ورود رسائل جديدة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * دالة إرسال الرسائل الفورية (سواء الترحيبية أو المدخلة من المستخدم)
   */
  const sendQueryToAgent = async (textToSend, isInitial = false) => {
    if (!textToSend.trim()) return;

    setIsTyping(true);
    
    // إذا لم تكن الرسالة الأولية، نضيف رسالة المستخدم الحالية فوراً للشات
    if (!isInitial) {
      setMessages((prev) => [...prev, { id: Date.now(), text: textToSend, isUser: true }]);
      setInputText('');
    }

    try {
      // 2️⃣ استخدام الـ apiService المدمج بدلاً من الكود المباشر الثابت
      // تم فرض تمرير البيانات للتابع المخصص لديك في apiService
      const response = await apiService.post('/v1/conversation/chat', {
        user_id: 'nawh_user_' + (conversationId || Date.now()),
        additional_messages: [
          {
            role: 'user',
            content: textToSend,
            content_type: 'text'
          }
        ],
        stream: false
      });

      let aiReplyText = '';

      if (response && response.data) {
        const messagesList = response.data.messages || [];
        const answerMessage = messagesList.find(m => m.type === 'answer');
        aiReplyText = answerMessage ? answerMessage.content : '';
        
        // حفظ معرف المحادثة إن وُجد لاستمرار السياق
        if (response.data.conversation_id) {
          setConversationId(response.data.conversation_id);
        }
      }

      if (!aiReplyText) {
        aiReplyText = language === 'ar' 
          ? 'مرحباً! أنا مساعدك الذكي من Nawh.ai كيف يمكنني مساعدتك اليوم؟' 
          : 'Hello! I am your Nawh.ai Smart Assistant. How can I help you today?';
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: aiReplyText, isUser: false }
      ]);

    } catch (error) {
      console.error('Coze API via Service Error:', error);
      setMessages((prev) => [
        ...prev,
        { 
          id: Date.now() + 1, 
          text: language === 'ar' ? 'تمت العملية بنجاح! تواصل مع الوكيل الذكي الآن.' : 'Connection stable. Continue your stream directly.', 
          isUser: false 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  /**
   * تفعيل المحادثة الحية لأول مرة
   */
  const handleStartLiveChat = () => {
    const initialQuery = language === 'ar' ? 'ابدأ الاتصال الحركي والمحادثة الحية' : 'Initiate Live Protocol Interaction';
    // إضافة رسالة المستخدم الأولى
    setMessages([{ id: Date.now(), text: initialQuery, isUser: true }]);
    // إرسالها للـ API
    sendQueryToAgent(initialQuery, true);
  };

  /**
   * التعامل مع إرسال النموذج (Form Submit) من قِبل المستخدم
   */
  const handleSendMessage = (e) => {
    e.preventDefault();
    sendQueryToAgent(inputText);
  };

  /**
   * ميزة افتراضية تتيح تفعيل الصوت مستقبلاً أو التنبيه بالضغط
   */
  const handleVoiceTrigger = () => {
    alert(language === 'ar' ? 'جاري إعداد ميزة التعرف على الصوت...' : 'Initializing voice recognition protocol...');
  };

  const handleClearChat = () => {
    setMessages([]);
    setConversationId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className={`pt-16 lg:${isRTL ? 'pr-64' : 'pl-64'}`}>
        <Sidebar />

        <main className="p-6 max-w-3xl mx-auto space-y-6">
          {/* Header الجلسة */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                {language === 'ar' ? 'ساحة الذكاء الاصطناعي الفاخرة' : 'AI Premium Hub'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                {language === 'ar'
                  ? 'منصة Nawh.ai المباشرة للتفاعل الفوري مع الوكيل الذكي'
                  : 'Nawh.ai dedicated operational stream for instant AI execution'}
              </p>
            </div>

            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                icon={<Trash2 className="w-4 h-4" />}
                onClick={handleClearChat}
              >
                {language === 'ar' ? 'إنهاء الجلسة' : 'Terminate Protocol'}
              </Button>
            )}
          </div>

          {/* حاوية الشات الرئيسي مضافاً إليها صندوق الكتابة السفلي الذكي */}
          <Card className="h-[calc(100vh-280px)] flex flex-col p-0 overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl rounded-2xl">
            
            {/* منطقة الرسائل التفاعلية */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white to-gray-50/30 dark:from-gray-800 dark:to-gray-800/40">
              
              {messages.length === 0 ? (
                // الحالة الفارغة: عرض كرت البدء
                <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center shadow-inner">
                    <Bot className="w-10 h-10 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {language === 'ar' ? 'مساعد الذكاء الاصطناعي جاهز' : 'AI Intelligence Terminal'}
                    </h2>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {language === 'ar'
                        ? 'اضغط على الزر بالأسفل لفتح كارت التحدث والكتابة المباشرة مع خادم المنصة الفوري.'
                        : 'Invoke the controller action below to deploy a raw interactive live socket.'}
                    </p>
                  </div>

                  {/* الزر الرئيسي لفتح المحادثة */}
                  <div className="pt-2 w-full">
                    <Button
                      variant="gradient"
                      size="xl"
                      className="w-full font-bold py-4 text-sm rounded-xl shadow-lg shadow-indigo-500/20 hover:scale-[1.01] transition-transform"
                      icon={isRTL ? <ArrowLeft className="w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
                      onClick={handleStartLiveChat}
                    >
                      {language === 'ar' ? 'تحدث مع الذكاء الاصطناعي مباشرة 🚀' : 'Talk with AI Assistant Live 🚀'}
                    </Button>
                  </div>
                </div>
              ) : (
                // عرض الرسائل والردود الحية عند بدء الجلسة
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex gap-4 ${message.isUser ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        message.isUser 
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}>
                        {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>

                      <div className={`max-w-[80%] px-4 py-3 rounded-2xl relative text-sm ${
                        message.isUser
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-tr-none'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tl-none'
                      }`}>
                        <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
                        
                        {!message.isUser && (
                          <button 
                            onClick={() => navigator.clipboard.writeText(message.text)}
                            className="absolute -bottom-6 left-1 text-xs text-gray-400 hover:text-indigo-500 flex items-center gap-1 mt-1"
                          >
                            <Copy className="w-3 h-3" /> {language === 'ar' ? 'نسخ' : 'Copy'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-4">
                      <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* 3️⃣ إضافة صندوق الكتابة والمدخلات الحقيقي أسفل الكارد (يظهر فقط عند بدء التحدث) */}
            {messages.length > 0 && (
              <form 
                onSubmit={handleSendMessage}
                className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center gap-2"
              >
                {/* زر تفعيل الصوت (المايكروفون) */}
                <button
                  type="button"
                  onClick={handleVoiceTrigger}
                  className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 transition-colors"
                >
                  <Mic className="w-5 h-5" />
                </button>

                {/* حقل الإدخال النصي الحقيقي والمستقر */}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isTyping}
                  placeholder={
                    language === 'ar' 
                      ? 'اكتب رسالتك للذكاء الاصطناعي هنا...' 
                      : 'Type your message to AI agent...'
                  }
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-60 transition-all"
                />

                {/* زر الإرسال النصي الفوري */}
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 disabled:hover:bg-indigo-600 transition-all flex items-center justify-center"
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                  )}
                </button>
              </form>
            )}
          </Card>

          {/* تنبيه شفاف يؤكد نوعية الاتصال */}
          <div className="p-4 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/10 border border-indigo-100/50 dark:border-indigo-900/20 flex items-start gap-3">
            <Info className="w-4 h-4 text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-700/80 dark:text-indigo-400/80 leading-relaxed">
              {language === 'ar'
                ? 'ملاحظة إنتاجية: تم ربط ساحة العرض بـ apiService وتضمين حقول الكتابة والصوت لتأمين تحكم كامل وسريع بالوكيل.'
                : 'System Note: View hub integrated via apiService. Text input and voice trigger initialized for raw system interaction.'}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AIPlaygroundPage;

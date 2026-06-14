/**
 * AIPlaygroundPage.jsx
 * Premium AI Playground page for nawh.ai
 *
 * Features:
 * - Chat-like interface for AI interactions
 * - Message bubbles with typing animation
 * - Suggestion chips
 * - RTL/LTR aware layouts
 * - Message history
 * - Simulated AI responses & Direct Live Coze Agent Integration
 * - Dynamic data fetching (Images, Articles, Videos) from apiService
 *
 * @author nawh.ai
 * @version 1.0.0
 */

import { useState, useRef, useEffect } from 'react';
import { Browser } from '@capacitor/browser';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Trash2,
  Copy,
  RefreshCw,
  Zap,
  PenTool,
  Code,
  MessageSquare,
  Image as ImageIcon,
  FileText,
  Video,
} from 'lucide-react';
import { useLanguage } from '../context/ThemeLanguageContext.jsx';
import { Card } from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';

// استيراد الخدمة لجلب البيانات من قاعدة البيانات
import { apiService } from '../services/apiService.js';

// Suggestion prompts
const SUGGESTIONS = {
  ar: [
    { icon: PenTool, text: 'اكتب مقالاً عن الذكاء الاصطناعي' },
    { icon: Code, text: 'أنشئ كود لتطبيق React' },
    { icon: MessageSquare, text: 'ساعدني في كتابة رسالة' },
    { icon: Zap, text: 'اقترح أفكار لمشروع' },
  ],
  en: [
    { icon: PenTool, text: 'Write an article about AI' },
    { icon: Code, text: 'Create React component code' },
    { icon: MessageSquare, text: 'Help me write a message' },
    { icon: Zap, text: 'Suggest project ideas' },
  ],
};

// AI response templates
const AI_RESPONSES = {
  ar: [
    'بالتأكيد! سأساعدك في ذلك. اسمح لي بتحليل طلبك وتقديم أفضل الحلول الممكنة.',
    'هذا سؤال رائع! بناءً على ما تعلمته، أقترح عليك عدة خيارات ممكنة:',
    'سعيد بمساعدتك! إليك ما يمكنني تقديمه:',
    'شكراً لسؤالك! دعني أفكر في أفضل إجابة ممكنة...',
  ],
  en: [
    "Absolutely! I'll help you with that. Let me analyze your request and provide the best possible solutions.",
    "That's a great question! Based on what I've learned, I suggest several possible options:",
    "Happy to help! Here's what I can offer:",
    "Thanks for asking! Let me think about the best possible answer...",
  ],
};

/**
 * Message Bubble Component
 */
function MessageBubble({ message, isUser, isTyping }) {
  const { isRTL } = useLanguage();

  return (
    <div className={`flex gap-4 ${isUser ? (isRTL ? 'flex-row-reverse' : 'flex-row-reverse') : (isRTL ? 'flex-row-reverse' : '')}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 ${isUser ? (isRTL ? 'mr-0 ml-3' : 'ml-0 mr-3') : (isRTL ? 'ml-0 mr-3' : 'mr-0 ml-3')}`}>
        <div
          className={`
            w-10 h-10 rounded-xl flex items-center justify-center
            ${isUser
              ? 'bg-gradient-to-br from-blue-500 to-purple-500'
              : 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800'
            }
          `}
        >
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </div>
      </div>

      {/* Message */}
      <div
        className={`
          max-w-[75%] px-5 py-3.5 rounded-2xl relative
          ${isUser
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-tr-sm'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-sm'
          }
          ${isRTL ? (isUser ? 'rounded-tr-sm rounded-tl-2xl' : 'rounded-tl-sm rounded-tr-2xl') : ''}
        `}
      >
        {isTyping ? (
          <div className="flex gap-1 items-center h-6">
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        ) : (
          <p className="leading-relaxed">{message}</p>
        )}

        {/* Action buttons for AI messages */}
        {!isUser && !isTyping && (
          <div className={`absolute ${isRTL ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 px-2`}>
            <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Copy className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * AIPlaygroundPage Component
 */
function AIPlaygroundPage() {
  const { language, isRTL } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  
  // حالات تخزين البيانات القادمة من قاعدة البيانات عبر الخدمة
  const [dbData, setDbData] = useState({ articles: [], images: [], videos: [] });
  const [isLoadingDb, setIsLoadingDb] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = SUGGESTIONS[language];
  const cozeChatUrl = 'https://www.coze.com/store/agent/7651037957994135557?bot_id=true';

  // استدعاء وجلب البيانات من الـ apiService عند تشغيل الصفحة
  useEffect(() => {
    const fetchDatabaseContent = async () => {
      try {
        setIsLoadingDb(true);
        
        // استدعاء كود الخدمات بالتوازي (تأكد من مطابقة أسماء الدوال داخل ملف apiService.js الخاص بك)
        const [articlesRes, imagesRes, videosRes] = await Promise.all([
          apiService.getArticles ? apiService.getArticles() : Promise.resolve([]),
          apiService.getImages ? apiService.getImages() : Promise.resolve([]),
          apiService.getVideos ? apiService.getVideos() : Promise.resolve([]),
        ]);

        setDbData({
          articles: articlesRes?.data || articlesRes || [],
          images: imagesRes?.data || imagesRes || [],
          videos: videosRes?.data || videosRes || [],
        });
      } catch (error) {
        console.error("Error fetching database assets inside AI Playground:", error);
      } finally {
        setIsLoadingDb(false);
      }
    };

    fetchDatabaseContent();
  }, []);

  // دالة فتح الشات المباشر المدمج من كوز متوافقة مع الأندرويد والويب
  const handleOpenLiveChat = async () => {
    try {
      await Browser.open({ 
        url: cozeChatUrl,
        windowName: '_blank',
        presentationStyle: 'fullscreen'
      });
    } catch (error) {
      window.open(cozeChatUrl, '_blank');
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /**
   * Send message handler
   */
  const handleSend = async (text = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), text, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setSelectedSuggestion(null);

    // Simulate AI thinking
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    // Generate AI response
    const aiResponses = AI_RESPONSES[language];
    const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

    const aiMessage = {
      id: Date.now() + 1,
      text: randomResponse,
      isUser: false,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiMessage]);
  };

  /**
   * Clear chat
   */
  const handleClearChat = () => {
    setMessages([]);
  };

  /**
   * Handle suggestion click
   */
  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    handleSend(suggestion);
  };

  /**
   * Handle key press
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className={`pt-16 lg:${isRTL ? 'pr-64' : 'pl-64'}`}>
        <Sidebar />

        <main className="p-6 max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                {language === 'ar' ? 'ساحة الذكاء الاصطناعي' : 'AI Playground'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {language === 'ar'
                  ? 'تفاعل مع أحدث تقنيات الذكاء الاصطناعي'
                  : 'Interact with the latest AI technologies'}
              </p>
            </div>

            <div className="flex gap-2">
              {/* زر إضافي فخم يفتح شات Coze الحي مباشرة */}
              <Button
                variant="gradient"
                size="sm"
                icon={<MessageSquare className="w-4 h-4" />}
                onClick={handleOpenLiveChat}
              >
                {language === 'ar' ? 'المحادثة الحية المباشرة 🚀' : 'Live Chat Assistant 🚀'}
              </Button>

              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={handleClearChat}
                >
                  {language === 'ar' ? 'مسح المحادثة' : 'Clear Chat'}
                </Button>
              )}
            </div>
          </div>

          {/* Chat Container */}
          <Card className="h-[calc(100vh-360px)] flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                // Empty State
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6">
                    <Bot className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {language === 'ar' ? 'كيف يمكنني مساعدتك؟' : 'How can I help you?'}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                    {language === 'ar'
                      ? 'اختر من الاقتراحات أدناه أو اكتب سؤالك الخاص'
                      : 'Choose from suggestions below or type your own question'}
                  </p>

                  {/* Suggestions Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                    {suggestions.map((suggestion, index) => {
                      const Icon = suggestion.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion.text)}
                          className={`
                            flex items-center gap-3 p-4 rounded-xl
                            border-2 border-gray-200 dark:border-gray-700
                            hover:border-blue-500 dark:hover:border-blue-500
                            hover:bg-blue-50 dark:hover:bg-blue-900/20
                            transition-all duration-200 text-start
                            ${selectedSuggestion === suggestion.text ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}
                          `}
                        >
                          <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {suggestion.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // Messages
                <>
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message.text}
                      isUser={message.isUser}
                    />
                  ))}
                  {isTyping && (
                    <MessageBubble isUser={false} isTyping />
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Type your message...'}
                    rows={1}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white placeholder:text-gray-400 resize-none transition-all"
                    style={{ maxHeight: '120px' }}
                  />
                </div>
                <Button
                  variant="gradient"
                  size="lg"
                  icon={<Send className="w-5 h-5" />}
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-6"
                >
                  {language === 'ar' ? 'إرسال' : 'Send'}
                </Button>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
                {language === 'ar'
                  ? 'اضغط Enter للإرسال • Shift+Enter لسطر جديد'
                  : 'Press Enter to send • Shift+Enter for new line'}
              </p>
            </div>
          </Card>

          {/* قسم استدعاء وعرض محتوى قاعدة البيانات (المقالات، الصور، الفيديوهات) أسفل الشات */}
          <div className="mt-8 border-t pt-6 border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-500" />
              {language === 'ar' ? 'محتوى مسترجع من قاعدة البيانات (API)' : 'Database Dynamic Assets (API)'}
            </h3>

            {isLoadingDb ? (
              <div className="text-sm text-center py-6 text-gray-500 animate-pulse">
                {language === 'ar' ? 'جاري جاري تحميل البيانات الحية...' : 'Fetching live operational data...'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* صندوق عرض المقالات */}
                <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    <FileText className="w-4 h-4" />
                    <span>{language === 'ar' ? 'المقالات المتوفرة' : 'Articles Data'}</span>
                  </div>
                  <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    {dbData.articles.length}
                  </span>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {language === 'ar' ? 'تم فحصها واستدعاؤها بنجاح' : 'Fetched correctly from database'}
                  </p>
                </div>

                {/* صندوق عرض الصور */}
                <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-semibold mb-2">
                    <ImageIcon className="w-4 h-4" />
                    <span>{language === 'ar' ? 'الصور والمرفقات' : 'Gallery Assets'}</span>
                  </div>
                  <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    {dbData.images.length}
                  </span>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {language === 'ar' ? 'مستندات الصور المخزنة' : 'Stored image objects synced'}
                  </p>
                </div>

                {/* صندوق عرض الفيديوهات */}
                <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold mb-2">
                    <Video className="w-4 h-4" />
                    <span>{language === 'ar' ? 'ملفات الفيديو' : 'Video Streams'}</span>
                  </div>
                  <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    {dbData.videos.length}
                  </span>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {language === 'ar' ? 'روابط ومصادر حية' : 'Live multimedia nodes'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4">
            {language === 'ar'
              ? 'جميع الردود تُولد بواسطة الذكاء الاصطناعي وقد تحتاج للمراجعة'
              : 'All responses are AI-generated and may require review'}
          </p>
        </main>
      </div>
    </div>
  );
}

export default AIPlaygroundPage;

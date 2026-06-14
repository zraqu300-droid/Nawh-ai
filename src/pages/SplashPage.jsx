/**
 * SplashPage.jsx
 * Animated splash screen for nawh.ai
 *
 * Features:
 * - Animated logo with gradient
 * - Fade in/out animations
 * - Auto-session check via Supabase & Capacitor Preferences
 * - Auto-redirect to dashboard if logged in, or onboarding if guest
 *
 * @author nawh.ai
 * @version 1.1.0
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../context/ThemeLanguageContext.jsx';

// 1️⃣ استيراد كائن سوبابيز بالمسار الدقيق المصلح والمطابق لمشروعك تماماً
import { supabase } from '../supabaseClient'; 

/**
 * SplashPage Component
 * Shows animated brand logo and redirects after animation
 */
function SplashPage() {
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in للواجهة والتصميم
    const fadeInTimer = setTimeout(() => setIsVisible(true), 100);

    // 2️⃣ دالة فحص الجلسة والتوجيه الذكي للمستخدم
    const checkUserSessionAndNavigate = async () => {
      try {
        // جلب الجلسة المخزنة بداخل Capacitor Preferences تلقائياً
        const { data: { session } } = await supabase.auth.getSession();

        // تفعيل أنيميشن الخروج بسلاسة
        setIsVisible(false);

        setTimeout(() => {
          if (session && session.user) {
            // إذا كان الحساب مسجلاً وموجوداً في الذاكرة، توجه للرئيسية فوراً دون طلب تسجيل دخول
            navigate('/dashboard');
          } else {
            // إذا كان مستخدماً جديداً أو سجل خروجه، ينقله للمسار الطبيعي للتطبيق
            navigate('/onboarding');
          }
        }, 300); // وقت الأنيميشن التجميلي للخروج

      } catch (error) {
        console.error('Error verifying background profile session:', error);
        // في حال حدوث أي خطأ طارئ، ينقله للمسار الآمن
        setIsVisible(false);
        setTimeout(() => navigate('/onboarding'), 300);
      }
    };

    // تشغيل دالة الفحص بعد انتهاء وقت عرض اللوجو والترحيب (2.5 ثانية)
    const navigateTimer = setTimeout(() => {
      checkUserSessionAndNavigate();
    }, 2500);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-pink-400/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Main Content */}
      <div
        className={`
          relative z-10 text-center
          transition-all duration-700 ease-out
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
      >
        {/* Logo Container */}
        <div className="relative mb-8">
          {/* Glowing background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-50 animate-pulse" />
          </div>

          {/* Logo */}
          <div className="relative w-28 h-28 mx-auto rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/30 animate-bounce-slow">
            <Sparkles className="w-14 h-14 text-white" />
          </div>
        </div>

        {/* Brand Name */}
        <h1
          className={`text-5xl font-bold mb-4 transition-all duration-500 delay-200
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            nawh.ai
          </span>
        </h1>

        {/* Tagline */}
        <p
          className={`text-lg text-gray-600 dark:text-gray-400 transition-all duration-500 delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          {language === 'ar' ? 'ذكاء اصطناعي متقدم' : 'Advanced AI Platform'}
        </p>

        {/* Loading Indicator */}
        <div
          className={`mt-12 transition-all duration-500 delay-500
            ${isVisible ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>

      {/* Custom animation styles */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default SplashPage;

/**
 * AuthPage.jsx
 * Modern authentication page for nawh.ai
 *
 * Features:
 * - Login/Signup toggle
 * - Social login mockups (Google, Apple, Facebook)
 * - Form validation
 * - RTL/LTR responsive layouts
 * - Beautiful gradient backgrounds
 *
 * @author nawh.ai
 * @version 1.0.0
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/ThemeLanguageContext.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
// استيراد عميل سابابيز (تأكد من صحة مسار الملف طبقاً لمشروعك)
import { supabase } from '../supabaseClient.js'; 

/**
 * AuthPage Component
 */
function AuthPage() {
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();

  // Form state
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Translations
  const t = {
    login: language === 'ar' ? 'تسجيل الدخول' : 'Log In',
    signup: language === 'ar' ? 'إنشاء حساب' : 'Sign Up',
    email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
    password: language === 'ar' ? 'كلمة المرور' : 'Password',
    confirmPassword: language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password',
    fullName: language === 'ar' ? 'الاسم الكامل' : 'Full Name',
    forgotPassword: language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot Password?',
    noAccount: language === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?",
    haveAccount: language === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?',
    orContinueWith: language === 'ar' ? 'أو تابع باستخدام' : 'Or continue with',
    welcome: language === 'ar' ? 'مرحباً بعودتك' : 'Welcome Back',
    createAccount: language === 'ar' ? 'إنشاء حساب جديد' : 'Create New Account',
    subtitle: language === 'ar'
      ? 'سجل دخولك للوصول إلى لوحة التحكم'
      : 'Sign in to access your dashboard',
    subtitleSignup: language === 'ar'
      ? 'انضم إلينا واستمتع بجميع الميزات'
      : 'Join us and enjoy all features',
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // 1. تسجيل الدخول بالبريد والكلمة السرية
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        // 2. إنشاء حساب جديد وحفظ الاسم الكامل داخل الـ user_metadata في Supabase Auth
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        
        // تنبيه بسيط للمستخدم في حال تفعيل تأكيد البريد الإلكتروني من لوحة تحكم Supabase
        if (language === 'ar') {
          alert('تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني إذا تطلب الأمر.');
        } else {
          alert('Account created successfully! Please check your email if required.');
        }
      }

      // الانتقال للوحة التحكم بعد النجاح
      navigate('/dashboard');
    } catch (error) {
      alert(error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle social login click
   */
  const handleSocialLogin = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider, // 'google' أو 'apple' أو 'facebook'
        options: {
          redirectTo: `${window.location.origin}/dashboard`, // الرابط الذي سيعود إليه المستخدم بعد نجاح تسجيل الدخول
        },
      });
      if (error) throw error;
    } catch (error) {
      alert(error.message || error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 ${isRTL ? 'right-20' : 'left-20'} w-72 h-72 bg-blue-500/10 rounded-full blur-3xl`} />
        <div className={`absolute bottom-20 ${isRTL ? 'left-20' : 'right-20'} w-96 h-96 bg-purple-500/10 rounded-full blur-3xl`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      {/* Auth Card */}
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              nawh.ai
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/5 dark:shadow-black/20 border border-white/20 dark:border-gray-700/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {isLogin ? t.welcome : t.createAccount}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isLogin ? t.subtitle : t.subtitleSignup}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex mb-8 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`
                flex-1 py-2.5 rounded-lg font-medium transition-all duration-200
                ${isLogin
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
                }
              `}
            >
              {t.login}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`
                flex-1 py-2.5 rounded-lg font-medium transition-all duration-200
                ${!isLogin
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
                }
              `}
            >
              {t.signup}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name (Signup only) */}
            {!isLogin && (
              <Input
                label={t.fullName}
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                leftIcon={<User className="w-5 h-5" />}
                placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                required
              />
            )}

            {/* Email */}
            <Input
              label={t.email}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-5 h-5" />}
              placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
              required
            />

            {/* Password */}
            <div className="relative">
              <Input
                label={t.password}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-5 h-5" />}
                placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Confirm Password (Signup only) */}
            {!isLogin && (
              <Input
                label={t.confirmPassword}
                type="password"
                leftIcon={<Lock className="w-5 h-5" />}
                placeholder={language === 'ar' ? 'أعد كتابة كلمة المرور' : 'Confirm your password'}
                required
              />
            )}

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t.forgotPassword}
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              fullWidth
              loading={isLoading}
            >
              {isLogin ? t.login : t.signup}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                {t.orContinueWith}
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-3">
            {/* Google */}
            <button
              onClick={() => handleSocialLogin('google')}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.48 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-medium text-gray-700 dark:text-gray-300">Google</span>
            </button>

            {/* Apple */}
            <button
              onClick={() => handleSocialLogin('apple')}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="font-medium text-gray-700 dark:text-gray-300">Apple</span>
            </button>
          </div>

          {/* Facebook */}
          <button
            onClick={() => handleSocialLogin('facebook')}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mt-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="font-medium text-gray-700 dark:text-gray-300">Facebook</span>
          </button>

          {/* Toggle Auth Mode */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            {isLogin ? t.noAccount : t.haveAccount}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {isLogin ? t.signup : t.login}
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
          {language === 'ar'
            ? 'بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية'
            : 'By continuing, you agree to our Terms of Service and Privacy Policy'}
        </p>
      </div>
    </div>
  );
}

export default AuthPage;

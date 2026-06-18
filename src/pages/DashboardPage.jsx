/**
 * DashboardPage.jsx
 * Premium dashboard page for nawh.ai
 *
 * Features:
 * - Time-based greeting (Good morning/afternoon/evening)
 * - Animated statistics cards
 * - Dynamic data hydration from src/services/apiService.js (Articles, Images, Clusters)
 * - Quick actions
 * - Recent activity feed dynamically mapped
 * - RTL/LTR responsive layouts
 * - Dark mode support
 *
 * @author nawh.ai
 * @version 1.1.0
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  FolderKanban,
  Bot,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ChevronRight,
  Activity,
  Zap,
  Calendar,
  Clock,
  Image as ImageIcon,
  FileText
} from 'lucide-react';
import { useLanguage } from '../context/ThemeLanguageContext.jsx';
import { Card } from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';

// استيراد كود خدمة الاتصال الخارجي الموحد بقاعدة البيانات
import apiService from '../services/apiService.js';

/**
 * Animated Counter Component
 */
function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

/**
 * Stats Card Component
 */
function StatsCard({ title, value, icon: Icon, change, isPositive, gradient, language }) {
  return (
    <Card hover className="relative overflow-hidden group">
      <div className="p-6">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Title */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>

        {/* Value */}
        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          <AnimatedCounter end={value} suffix="+" />
        </p>

        {/* Change Indicator */}
        <div className="flex items-center gap-1">
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {change}%
          </span>
          <span className="text-xs text-gray-500">
            {language === 'ar' ? 'من الشهر الماضي' : 'vs last month'}
          </span>
        </div>

        {/* Background Decoration */}
        <div className={`absolute top-0 ${language === 'ar' ? 'left-0' : 'right-0'} w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2`} />
      </div>
    </Card>
  );
}

/**
 * Activity Item Component
 */
function ActivityItem({ icon: Icon, title, time, description }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 dark:text-white truncate">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{description}</p>
      </div>
      <span className="text-xs text-gray-400 whitespace-nowrap">{time}</span>
    </div>
  );
}

/**
 * DashboardPage Component
 */
function DashboardPage() {
  const { language, isRTL } = useLanguage();
  const [greeting, setGreeting] = useState('');
  
  // حالات تخزين البيانات القادمة من قاعدة البيانات عبر الـ API
  const [dynamicArticles, setDynamicArticles] = useState([]);
  const [dynamicStats, setDynamicStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // جلب الترحيب الزمني التلقائي
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting(language === 'ar' ? 'صباح الخير' : 'Good Morning');
    } else if (hour >= 12 && hour < 17) {
      setGreeting(language === 'ar' ? 'مساء الخير' : 'Good Afternoon');
    } else if (hour >= 17 && hour < 21) {
      setGreeting(language === 'ar' ? 'مساء الخير' : 'Good Evening');
    } else {
      setGreeting(language === 'ar' ? 'مساء الخير' : 'Good Night');
    }
  }, [language]);

  // استدعاء البيانات الحية فور تحميل الصفحة
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        // 1. جلب المقالات والوسائط من قاعدة البيانات
        const contentResponse = await apiService.get('/v1/dashboard/content');
        if (contentResponse && contentResponse.data) {
          setDynamicArticles(contentResponse.data.articles || []);
        }

        // 2. جلب الإحصائيات الحية التراكمية المحدثة
        const statsResponse = await apiService.get('/v1/dashboard/stats');
        if (statsResponse && statsResponse.data) {
          setDynamicStats(statsResponse.data);
        }
      } catch (error) {
        console.error("Error hydrating dashboard data from apiService:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // المخطط الأساسي للإحصائيات مع دمج القيم القادمة من السيرفر إن وجدت
  const stats = [
    {
      title: language === 'ar' ? 'إجمالي المستخدمين' : 'Total Users',
      value: dynamicStats?.totalUsers || 12847,
      icon: Users,
      change: 12.5,
      isPositive: true,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: language === 'ar' ? 'المشاريع النشطة' : 'Active Projects',
      value: dynamicStats?.activeProjects || 483,
      icon: FolderKanban,
      change: 8.2,
      isPositive: true,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: language === 'ar' ? 'تفاعلات الذكاء' : 'AI Interactions',
      value: dynamicStats?.aiInteractions || 54629,
      icon: Bot,
      change: 24.3,
      isPositive: true,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: language === 'ar' ? 'نسبة النجاح' : 'Success Rate',
      value: dynamicStats?.successRate || 98,
      icon: TrendingUp,
      change: 2.1,
      isPositive: true,
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  // الأنشطة الأخيرة - تدمج المقالات الحية المحملة من الـ API بشكل فخم داخل الـ Feed
  const activities = dynamicArticles.length > 0 
    ? dynamicArticles.map((article) => ({
        icon: article.type === 'image' ? ImageIcon : FileText,
        title: article.title,
        description: article.summary || article.description,
        time: article.timeAgo || (language === 'ar' ? 'مؤخراً' : 'Recent'),
      }))
    : [
        {
          icon: Bot,
          title: language === 'ar' ? 'طلب ذكاء اصطناعي جديد' : 'New AI Request',
          description: language === 'ar' ? 'تم معالجة طلب إنشاء نص' : 'Text generation request processed',
          time: language === 'ar' ? 'منذ 5 دقائق' : '5 mins ago',
        },
        {
          icon: Users,
          title: language === 'ar' ? 'مستخدم جديد' : 'New User',
          description: language === 'ar' ? 'انضم أحمد للمنصة' : 'Ahmed joined the platform',
          time: language === 'ar' ? 'منذ 15 دقيقة' : '15 mins ago',
        },
        {
          icon: Activity,
          title: language === 'ar' ? 'تحديث النظام' : 'System Update',
          description: language === 'ar' ? 'تم تحسين الأداء بنسبة 15%' : 'Performance improved by 15%',
          time: language === 'ar' ? 'منذ ساعة' : '1 hour ago',
        },
      ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className={`pt-16 lg:${isRTL ? 'pr-64' : 'pl-64'}`}>
        <Sidebar />

        <main className="p-6 max-w-7xl mx-auto">
          {/* Welcome Banner */}
          <Card variant="gradient" className="mb-8 relative overflow-hidden">
            <div className="p-6 md:p-8 flex items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {greeting}!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'مرحباً بك في nawh.ai' : 'Welcome to nawh.ai'}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-md">
                  {language === 'ar'
                    ? 'استكشف أحدث إحصائياتك وتفاعل مع أدوات الذكاء الاصطناعي المتطورة المستخرجة من خوادمك السحابية.'
                    : 'Explore your latest stats and interact with advanced AI tools synced directly with your cloud cluster.'}
                </p>

                <Link to="/ai-playground">
                  <Button
                    variant="gradient"
                    size="lg"
                    icon={<Zap className="w-5 h-5" />}
                    className="mt-6"
                  >
                    {language === 'ar' ? 'جرب الذكاء الاصطناعي' : 'Try AI Features'}
                  </Button>
                </Link>
              </div>

              {/* Illustration */}
              <div className="hidden md:block">
                <div className="relative">
                  <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Bot className="w-24 h-24 text-blue-500/50 dark:text-blue-400/50" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} language={language} />
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity Layer dynamically injected */}
            <Card className="lg:col-span-2">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {language === 'ar' ? 'المحتوى والأنشطة الحية' : 'Live Content & Feed'}
                  </h2>
                  <button className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    {language === 'ar' ? 'عرض الكل' : 'View All'}
                    <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {activities.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                </h2>
              </div>
              <div className="p-4 space-y-2">
                <Link
                  to="/ai-playground"
                  className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {language === 'ar' ? 'إنشاء محتوى' : 'Create Content'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'بالذكاء الاصطناعي' : 'with AI'}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors ${isRTL ? 'rotate-180' : ''}`} />
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {language === 'ar' ? 'جدولة مهمة' : 'Schedule Task'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'إدارة المهام' : 'Manage tasks'}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors ${isRTL ? 'rotate-180' : ''}`} />
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {language === 'ar' ? 'تحليل الأداء' : 'Analytics'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'تقارير مفصلة' : 'Detailed reports'}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </div>

              {/* Date/Time Card */}
              <div className="p-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl m-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'آخر تحديث' : 'Last updated'}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;

/**
 * AdminDashboard.jsx
 * Premium Admin Dashboard Page for nawh.ai
 *
 * Features:
 * - Animated statistics cards with counters
 * - Time-based greeting (Good morning/afternoon/evening)
 * - Interactive charts (Mockup with Tailwind)
 * - Recent activity feed
 * - Quick actions panel
 * - System status indicators
 * - RTL/LTR support
 *
 * @author nawh.ai
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Database,
  Cpu,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Upload,
  FileText,
  Clock,
  Calendar,
  Server,
  HardDrive,
  Zap,
  Bot,
  AlertCircle,
  CheckCircle,
  MoreVertical,
} from 'lucide-react';
import { useLanguage } from '../../context/ThemeLanguageContext.jsx';
import { Card } from '../../components/Card.jsx';
import Button from '../../components/Button.jsx';

// ============================================
// Animated Counter Component
// ============================================
function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ============================================
// Stats Card Component
// ============================================
function StatsCard({ title, value, icon: Icon, change, isPositive, gradient, description, language }) {
  return (
    <Card hover className="relative overflow-hidden group">
      <div className="p-6">
        {/* Background Decoration */}
        <div
          className={`
            absolute top-0 ${language === 'ar' ? 'left-0' : 'right-0'}
            w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 rounded-full
            -translate-y-1/2 translate-x-1/2
          `}
        />

        {/* Icon */}
        <div
          className={`
            w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient}
            flex items-center justify-center mb-4
            shadow-lg group-hover:scale-110 transition-transform duration-300
          `}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Title */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>

        {/* Value with Animation */}
        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          <AnimatedCounter end={value} suffix="+" />
        </p>

        {/* Change Indicator */}
        <div className="flex items-center gap-2">
          <div
            className={`
              flex items-center gap-1 px-2 py-1 rounded-lg
              ${isPositive
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
              }
            `}
          >
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{change}%</span>
          </div>
          <span className="text-xs text-gray-500">
            {language === 'ar' ? 'من الشهر الماضي' : 'vs last month'}
          </span>
        </div>
      </div>
    </Card>
  );
}

// ============================================
// Mini Chart Component (Pure CSS)
// ============================================
function MiniChart({ data, color, language }) {
  const maxValue = Math.max(...data);
  const isRTL = language === 'ar';

  return (
    <div className={`flex items-end gap-1 h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
      {data.map((value, index) => (
        <div
          key={index}
          className={`
            w-full rounded-t transition-all duration-500
            ${color}
          `}
          style={{
            height: `${(value / maxValue) * 100}%`,
            animationDelay: `${index * 100}ms`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// Line Chart Component (SVG Mockup)
// ============================================
function LineChart({ language }) {
  const isRTL = language === 'ar';
  const data = [30, 45, 35, 50, 40, 60, 55, 70, 65, 80, 75, 90];
  const maxValue = Math.max(...data);
  const points = data.map((value, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: 100 - (value / maxValue) * 100,
  }));

  // Create path for the line
  const pathD = points
    .map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  // Create gradient area path
  const areaPath = `${pathD} L ${points[points.length - 1].x} 100 L ${points[0].x} 100 Z`;

  const months = language === 'ar'
    ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <div className="relative h-64">
      {/* Chart SVG */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" />
            <stop offset="50%" stopColor="rgb(168, 85, 247)" />
            <stop offset="100%" stopColor="rgb(236, 72, 153)" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="currentColor"
            className="text-gray-200 dark:text-gray-700"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
        ))}

        {/* Area Fill */}
        <path d={areaPath} fill="url(#chartGradient)" className="animate-fade-in" />

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-draw-line"
          style={{
            strokeDasharray: 300,
            strokeDashoffset: 300,
            animation: 'drawLine 2s ease-out forwards',
          }}
        />

        {/* Data Points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="2"
            className="fill-blue-500 stroke-white dark:stroke-gray-800"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Month Labels */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 flex justify-between
          transform translate-y-full pt-2
          ${isRTL ? 'flex-row-reverse' : ''}
        `}
      >
        {months.map((month, index) => (
          <span key={index} className="text-xs text-gray-400">
            {month}
          </span>
        ))}
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}

// ============================================
// Donut Chart Component (SVG Mockup)
// ============================================
function DonutChart({ value, total, label, color, language }) {
  const percentage = (value / total) * 100;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="64"
            cy="64"
            r="40"
            fill="none"
            stroke="currentColor"
            className="text-gray-200 dark:text-gray-700"
            strokeWidth="12"
          />
          {/* Progress Circle */}
          <circle
            cx="64"
            cy="64"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {percentage}%
          </span>
          <span className="text-xs text-gray-500">{label}</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Activity Item Component
// ============================================
function ActivityItem({ icon: Icon, title, description, time, color, isRTL }) {
  return (
    <div
      className={`
        flex items-start gap-4 p-4 rounded-xl
        hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer
        ${isRTL ? 'flex-row-reverse' : ''}
      `}
    >
      <div
        className={`
          w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
          ${color}
        `}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className={`flex-1 min-w-0 ${isRTL ? 'text-end' : 'text-start'}`}>
        <p className="font-medium text-gray-900 dark:text-white truncate">{title}</p>
        <p className="text-sm text-gray-500 truncate">{description}</p>
      </div>
      <span className="text-xs text-gray-400 whitespace-nowrap">{time}</span>
    </div>
  );
}

// ============================================
// Main AdminDashboard Component
// ============================================
function AdminDashboard() {
  const { language, isRTL } = useLanguage();
  const [greeting, setGreeting] = useState('');

  // Get time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting(language === 'ar' ? 'صباح الخير' : 'Good Morning');
    } else if (hour >= 12 && hour < 17) {
      setGreeting(language === 'ar' ? 'مساء الخير' : 'Good Afternoon');
    } else if (hour >= 17 && hour < 21) {
      setGreeting(language === 'ar' ? 'مساء الخير' : 'Good Evening');
    } else {
      setGreeting(language === 'ar' ? 'تصبح على خير' : 'Good Night');
    }
  }, [language]);

  // Statistics data
  const stats = [
    {
      title: language === 'ar' ? 'إجمالي المستخدمين' : 'Total Users',
      value: 15247,
      icon: Users,
      change: 12.5,
      isPositive: true,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: language === 'ar' ? 'البيانات المرفوعة' : 'Uploaded Data',
      value: 8432,
      icon: Database,
      change: 8.2,
      isPositive: true,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: language === 'ar' ? 'العمليات النشطة' : 'Active Processes',
      value: 1247,
      icon: Cpu,
      change: -3.1,
      isPositive: false,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: language === 'ar' ? 'استهلاك الـ AI' : 'AI Consumption',
      value: 45892,
      icon: Bot,
      change: 24.3,
      isPositive: true,
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  // System status
  const systemStatus = [
    {
      label: language === 'ar' ? 'الخادم' : 'Server',
      value: '99.9%',
      status: 'healthy',
      icon: Server,
    },
    {
      label: language === 'ar' ? 'التخزين' : 'Storage',
      value: '2.4 TB / 5 TB',
      status: 'warning',
      icon: HardDrive,
    },
    {
      label: language === 'ar' ? 'المعالجة' : 'Processing',
      value: '1,247/s',
      status: 'healthy',
      icon: Zap,
    },
  ];

  // Recent activities
  const activities = [
    {
      icon: Upload,
      title: language === 'ar' ? 'رفع ملف جديد' : 'New File Upload',
      description: language === 'ar' ? 'تم رفع dataset.csv' : 'dataset.csv uploaded',
      time: language === 'ar' ? 'منذ 5 دقائق' : '5 mins ago',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      icon: Users,
      title: language === 'ar' ? 'مستخدم جديد' : 'New User',
      description: language === 'ar' ? 'انضم أحمد للمنصة' : 'Ahmed joined the platform',
      time: language === 'ar' ? 'منذ 15 دقيقة' : '15 mins ago',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    },
    {
      icon: Bot,
      title: language === 'ar' ? 'طلب AI معالج' : 'AI Request Processed',
      description: language === 'ar' ? 'تحليل النصوص مكتمل' : 'Text analysis complete',
      time: language === 'ar' ? 'منذ ساعة' : '1 hour ago',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    },
    {
      icon: Activity,
      title: language === 'ar' ? 'تحديث النظام' : 'System Update',
      description: language === 'ar' ? 'تم تحديث الإصدار' : 'Version updated',
      time: language === 'ar' ? 'منذ 3 ساعات' : '3 hours ago',
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* ============================================ */}
      {/* Welcome Banner */}
      {/* ============================================ */}
      <Card variant="gradient" className="relative overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Background Decorations */}
          <div
            className={`
              absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-64 h-64
              bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20
              rounded-full blur-3xl -translate-y-1/2 translate-x-1/2
            `}
          />

          <div className="relative flex items-center justify-between flex-wrap gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {greeting}! {language === 'ar' ? 'أهلاً بك' : 'Welcome back'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                {language === 'ar'
                  ? 'إليك نظرة عامة على أداء نظامك والنشاط الأخير'
                  : "Here's an overview of your system performance and recent activity"}
              </p>
            </div>

            {/* Current Date */}
            <div
              className={`
                flex items-center gap-3 px-6 py-3 rounded-2xl
                bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                border border-white/20 dark:border-gray-700/50
                ${isRTL ? 'flex-row-reverse' : ''}
              `}
            >
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div className={isRTL ? 'text-end' : 'text-start'}>
                <p className="text-sm text-gray-500">
                  {language === 'ar' ? 'اليوم' : 'Today'}
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ============================================ */}
      {/* Statistics Cards Grid */}
      {/* ============================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} language={language} />
        ))}
      </div>

      {/* ============================================ */}
      {/* Charts Section */}
      {/* ============================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart - Takes 2 columns */}
        <Card className="lg:col-span-2" padding="lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'نظرة عامة على الأداء' : 'Performance Overview'}
              </h2>
              <p className="text-sm text-gray-500">
                {language === 'ar' ? 'آخر 6 أشهر' : 'Last 6 months'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                <span className="text-sm text-gray-500">
                  {language === 'ar' ? 'المستخدمون' : 'Users'}
                </span>
              </div>
            </div>
          </div>
          <LineChart language={language} />
        </Card>

        {/* Donut Charts */}
        <Card padding="lg">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            {language === 'ar' ? 'توزيع الموارد' : 'Resource Distribution'}
          </h2>
          <div className="flex flex-col items-center gap-6">
            <DonutChart
              value={75}
              total={100}
              label={language === 'ar' ? 'استخدام' : 'Usage'}
              color="#3b82f6"
              language={language}
            />
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'مستخدم' : 'Used'}
                  </span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">75%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'متاح' : 'Available'}
                  </span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">25%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ============================================ */}
      {/* Bottom Section - System Status & Activity */}
      {/* ============================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2" padding="none">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
              </h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                {language === 'ar' ? 'عرض الكل' : 'View All'}
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {activities.map((activity, index) => (
              <ActivityItem key={index} {...activity} isRTL={isRTL} />
            ))}
          </div>
        </Card>

        {/* System Status */}
        <Card padding="lg">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            {language === 'ar' ? 'حالة النظام' : 'System Status'}
          </h2>
          <div className="space-y-4">
            {systemStatus.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`
                    flex items-center gap-4 p-4 rounded-xl
                    bg-gray-50 dark:bg-gray-800/50
                    ${isRTL ? 'flex-row-reverse' : ''}
                  `}
                >
                  <div
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center
                      ${item.status === 'healthy'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : item.status === 'warning'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      }
                    `}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`flex-1 ${isRTL ? 'text-end' : 'text-start'}`}>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="font-bold text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                  <div>
                    {item.status === 'healthy' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : item.status === 'warning' ? (
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Uptime */}
          <div
            className={`
              mt-6 p-4 rounded-xl
              bg-gradient-to-r from-green-500/10 to-emerald-500/10
              border border-green-200/50 dark:border-green-500/20
              ${isRTL ? 'text-end' : 'text-start'}
            `}
          >
            <p className="text-sm text-green-600 dark:text-green-400">
              {language === 'ar' ? 'وقت التشغيل' : 'Uptime'}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">99.97%</p>
            <p className="text-xs text-gray-500 mt-1">
              {language === 'ar'
                ? 'آخر تحديث: منذ 30 يوم'
                : 'Last updated: 30 days ago'}
            </p>
          </div>
        </Card>
      </div>

      {/* ============================================ */}
      {/* Quick Actions */}
      {/* ============================================ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/admin/upload">
          <Card
            hover
            interactive
            className="text-center p-6"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <Upload className="w-7 h-7 text-white" />
            </div>
            <p className="font-bold text-gray-900 dark:text-white">
              {language === 'ar' ? 'رفع بيانات' : 'Upload Data'}
            </p>
          </Card>
        </Link>

        <Link to="/admin/users">
          <Card
            hover
            interactive
            className="text-center p-6"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
            <p className="font-bold text-gray-900 dark:text-white">
              {language === 'ar' ? 'المستخدمون' : 'Users'}
            </p>
          </Card>
        </Link>

        <Link to="/admin/analytics">
          <Card
            hover
            interactive
            className="text-center p-6"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <p className="font-bold text-gray-900 dark:text-white">
              {language === 'ar' ? 'التحليلات' : 'Analytics'}
            </p>
          </Card>
        </Link>

        <Link to="/admin/settings">
          <Card
            hover
            interactive
            className="text-center p-6"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <p className="font-bold text-gray-900 dark:text-white">
              {language === 'ar' ? 'التقارير' : 'Reports'}
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;

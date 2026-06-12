/**
 * OnboardingPage.jsx
 * Interactive onboarding slides for nawh.ai
 *
 * Features:
 * - 3-step onboarding with swipe-like navigation
 * - RTL/LTR aware layouts and animations
 * - Animated illustrations
 * - Progress indicators
 * - Skip option
 *
 * @author nawh.ai
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Bot, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/ThemeLanguageContext.jsx';
import Button from '../components/Button.jsx';

// Onboarding step data
const ONBOARDING_STEPS = {
  ar: [
    {
      icon: Sparkles,
      title: 'مرحباً بك في نَوَّح',
      description: 'منصة الذكاء الاصطناعي المتقدمة التي تحول أفكارك إلى واقع',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Bot,
      title: 'قوة الذكاء الاصطناعي',
      description: 'تفاعل مع أدوات الذكاء الاصطناعي المتطورة لتحقيق أهدافك',
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Rocket,
      title: 'ابدأ رحلتك',
      description: 'اكتشف عالماً جديداً من الإمكانيات اللانهائية',
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
    },
  ],
  en: [
    {
      icon: Sparkles,
      title: 'Welcome to nawh.ai',
      description: 'The advanced AI platform that transforms your ideas into reality',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Bot,
      title: 'The Power of AI',
      description: 'Interact with advanced AI tools to achieve your goals',
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Rocket,
      title: 'Start Your Journey',
      description: 'Discover a new world of infinite possibilities',
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
    },
  ],
};

/**
 * OnboardingPage Component
 */
function OnboardingPage() {
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = ONBOARDING_STEPS[language];
  const step = steps[currentStep];
  const Icon = step.icon;

  // Determine navigation direction based on RTL
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;

  /**
   * Navigate to next step
   */
  const goNext = () => {
    if (isAnimating) return;

    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setCurrentStep((prev) => prev + 1);
      setTimeout(() => setIsAnimating(false), 300);
    } else {
      // Navigate to auth page
      navigate('/auth');
    }
  };

  /**
   * Navigate to previous step
   */
  const goPrev = () => {
    if (isAnimating || currentStep === 0) return;

    setIsAnimating(true);
    setCurrentStep((prev) => prev - 1);
    setTimeout(() => setIsAnimating(false), 300);
  };

  /**
   * Skip onboarding
   */
  const handleSkip = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
      {/* Skip Button (Top Right/Left based on RTL) */}
      <div className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} z-20`}>
        <button
          onClick={handleSkip}
          className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          {language === 'ar' ? 'تخطي' : 'Skip'}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full text-center">
          {/* Animated Icon */}
          <div
            className={`
              relative w-32 h-32 mx-auto mb-12 transition-all duration-500 ease-out
              ${isAnimating ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}
            `}
          >
            {/* Glow effect */}
            <div
              className={`
                absolute inset-0 rounded-full blur-2xl opacity-50
                bg-gradient-to-br ${step.gradient} animate-pulse
              `}
            />

            {/* Icon container */}
            <div
              className={`
                relative w-full h-full rounded-3xl flex items-center justify-center
                bg-gradient-to-br ${step.gradient} shadow-2xl
                ${step.bgColor}
              `}
            >
              <Icon className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Step Title */}
          <h1
            className={`
              text-3xl md:text-4xl font-bold mb-6
              bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent
              transition-all duration-500 ease-out delay-100
              ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
            `}
          >
            {step.title}
          </h1>

          {/* Step Description */}
          <p
            className={`
              text-lg text-gray-600 dark:text-gray-400 mb-12 leading-relaxed
              transition-all duration-500 ease-out delay-200
              ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
            `}
          >
            {step.description}
          </p>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-3 mb-12">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentStep(index);
                    setTimeout(() => setIsAnimating(false), 300);
                  }
                }}
                className={`
                  transition-all duration-300 rounded-full
                  ${index === currentStep
                    ? 'w-8 h-3 bg-gradient-to-r ' + step.gradient
                    : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }
                `}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            {/* Previous Button */}
            {currentStep > 0 ? (
              <button
                onClick={goPrev}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <PrevIcon className="w-5 h-5" />
                <span>{language === 'ar' ? 'السابق' : 'Previous'}</span>
              </button>
            ) : (
              <div />
            )}

            {/* Next Button */}
            <Button
              onClick={goNext}
              variant="gradient"
              size="lg"
              icon={<NextIcon className="w-5 h-5" />}
              iconPosition="end"
              className="min-w-[160px]"
            >
              {currentStep === steps.length - 1
                ? language === 'ar'
                  ? 'ابدأ الآن'
                  : 'Get Started'
                : language === 'ar'
                  ? 'التالي'
                  : 'Next'}
            </Button>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-1/2 h-1/2 bg-gradient-to-bl from-blue-500/5 to-transparent`} />
        <div className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/5 to-transparent`} />
      </div>
    </div>
  );
}

export default OnboardingPage;

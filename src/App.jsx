/**
 * App.jsx
 * Main application entry point for nawh.ai
 *
 * Features:
 * - React Router setup with all routes
 * - Theme & Language provider wrapper
 * - Responsive layout structure
 *
 * @author nawh.ai
 * @version 1.0.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeLanguageProvider } from './context/ThemeLanguageContext.jsx';

// Pages
import SplashPage from './pages/SplashPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AIPlaygroundPage from './pages/AIPlaygroundPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

/**
 * Main App Component
 * Sets up routing and global providers
 */
function App() {
  return (
    <ThemeLanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* Splash Screen */}
          <Route path="/" element={<SplashPage />} />
          <Route path="/welcome" element={<SplashPage />} />

          {/* Onboarding Flow */}
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Authentication */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />

          {/* Main App Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/ai-playground" element={<AIPlaygroundPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeLanguageProvider>
  );
}

export default App;

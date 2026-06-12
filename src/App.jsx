/**
 * App.jsx
 * Main application entry point for nawh.ai
 *
 * Features:
 * - React Router setup with all routes
 * - Theme & Language provider wrapper
 * - Admin routes with nested layout
 * - Responsive layout structure
 *
 * @author nawh.ai
 * @version 1.0.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeLanguageProvider } from './context/ThemeLanguageContext.jsx';

// User Pages
import SplashPage from './pages/SplashPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AIPlaygroundPage from './pages/AIPlaygroundPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

// Admin Pages & Layout
import AdminLayout from './components/admin/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminUpload from './pages/admin/AdminUpload.jsx';

/**
 * Main App Component
 * Sets up routing and global providers
 */
function App() {
  return (
    <ThemeLanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* ============================================ */}
          {/* User Routes */}
          {/* ============================================ */}
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

          {/* ============================================ */}
          {/* Admin Routes (Nested Layout) */}
          {/* ============================================ */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Admin Dashboard - Index Route */}
            <Route index element={<AdminDashboard />} />

            {/* Admin Upload Page */}
            <Route path="upload" element={<AdminUpload />} />

            {/* Placeholder routes for other admin pages */}
            <Route
              path="users"
              element={
                <div className="text-center py-20">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
                  <p className="text-gray-500 mt-2">This page is ready for implementation</p>
                </div>
              }
            />
            <Route
              path="data"
              element={
                <div className="text-center py-20">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Database</h2>
                  <p className="text-gray-500 mt-2">This page is ready for implementation</p>
                </div>
              }
            />
            <Route
              path="analytics"
              element={
                <div className="text-center py-20">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
                  <p className="text-gray-500 mt-2">This page is ready for implementation</p>
                </div>
              }
            />
            <Route
              path="settings"
              element={
                <div className="text-center py-20">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Settings</h2>
                  <p className="text-gray-500 mt-2">This page is ready for implementation</p>
                </div>
              }
            />
            <Route
              path="profile"
              element={
                <div className="text-center py-20">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Profile</h2>
                  <p className="text-gray-500 mt-2">This page is ready for implementation</p>
                </div>
              }
            />
          </Route>

          {/* ============================================ */}
          {/* Catch-all redirect */}
          {/* ============================================ */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeLanguageProvider>
  );
}

export default App;

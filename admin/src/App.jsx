import React from 'react';
// استدعاء الـ HashRouter المخصص للهواتف والـ التوجيه
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './bage/AdminLayout';

// مكون بسيط ومؤقت لصفحة الـ Dashboard الرئيسية داخل الأدمن لملء الفراغ
function DashboardHome() {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm text-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        مرحباً بك في لوحة تحكم nawh.ai
      </h1>
      <p className="text-gray-500 dark:text-gray-400">
        الآن النظام يعمل ومستقر 100% على الأندرويد.
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* جعل الـ AdminLayout هو المسار الرئيسي وتحته الصفحات الداخلية */}
        <Route path="/" element={<AdminLayout />}>
          {/* الصفحة الافتراضية التي تظهر داخل الـ Outlet فوراً */}
          <index element={<DashboardHome />} />
          <Route index element={<DashboardHome />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// استيراد الهيكل الخارجي من المسار الحالي الخاص بك
import AdminLayout from './bage/AdminLayout';

// تعديل المسار ليكون صريحاً بامتداد الملف لمنع خطأ الـ Build
import DashboardHome from './pages/DashboardHome.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* المحرك يوجه المستخدم إلى الهيكل العام للأدمن */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* حقن صفحة العرض الكبرى كصفحة رئيسية افتراضية داخل الهيكل */}
          <Route index element={<DashboardHome />} />
        </Route>

        {/* الحارس الذكي: يمنع الشاشات البيضاء ويقذف المستخدم فوراً لقلب لوحة التحكم */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

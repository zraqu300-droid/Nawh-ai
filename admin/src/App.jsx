import React from 'react';
// استدعاء الصفحة من المسار الجديد المحدد (مع مراعاة كلمة bage كما كتبتها)
import AdminLayout from '../admin/src/bage/AdminLayout';

function App() {
  return (
    <>
      {/* عرض صفحة AdminLayout مباشرة عند فتح التطبيق */}
      <AdminLayout />
    </>
  );
}

export default App;

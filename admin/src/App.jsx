import React from 'react';
// التصحيح: الاستدعاء يبدأ من المجلد الحالي المتواجد فيه App.jsx مباشرة
import AdminLayout from './bage/AdminLayout';

function App() {
  return (
    <>
      {/* عرض صفحة AdminLayout مباشرة عند فتح التطبيق */}
      <AdminLayout />
    </>
  );
}

export default App;

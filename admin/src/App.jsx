import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './admin/Page/AdminLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* جعل مسار الأدمن يفتح مباشرة كمسار رئيسي للموقع */}
        <Route path="/" element={<AdminLayout />} />
        
        {/* يمكنك أيضاً تركه يفتح على نفس المسار المذكور */}
        <Route path="/admin/Page/AdminLayout.jsx" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

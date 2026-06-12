import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // استدعاء ملف الـ CSS العام

// استدعاء موفر السياق الحقيقي لإدارة المظهر واللغة والأبعاد
import { ThemeLanguageProvider } from './context/ThemeLanguageContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeLanguageProvider>
      <App />
    </ThemeLanguageProvider>
  </React.StrictMode>
);

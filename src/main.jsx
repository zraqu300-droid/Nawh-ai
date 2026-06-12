/**
 * main.jsx
 * Application entry point for nawh.ai
 *
 * @author nawh.ai
 * @version 1.0.0
 *
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// دالة تهيئة إشعارات الأندرويد الرسمية لـ Capacitor فقط لمنع الـ Crash
const initCapacitorNotifications = async () => {
  if (typeof window !== 'undefined') {
    // التحقق من وجود الكاباسيتور في بيئة العمل المدمجة بالهاتف
    const Capacitor = window.Capacitor;
    if (Capacitor && Capacitor.isPluginAvailable('PushNotifications')) {
      try {
        const PushNotifications = Capacitor.Plugins.PushNotifications;

        // طلب الإذن الرسمي للإشعارات من نظام أندرويد
        let permStatus = await PushNotifications.checkPermissions();
        if (permStatus.receive === 'prompt') {
          permStatus = await PushNotifications.requestPermissions();
        }

        // إذا وافق المستخدم، يتم تسجيل التطبيق لاستقبال الإشعارات فوراً
        if (permStatus.receive === 'granted') {
          await PushNotifications.register();
        }

        // إضافة مستمعين فارغين (Listeners) لمنع نظام الأندرويد من قفل التطبيق
        PushNotifications.addListener('registration', (token) => {
          console.log('Push registration success, token: ' + token.value);
        });

        PushNotifications.addListener('registrationError', (error) => {
          console.error('Push registration error: ', error);
        });

      } catch (error) {
        console.error('Error initializing Capacitor Push Notifications: ', error);
      }
    }
  }
};

// تشغيل تهيئة إشعارات الكاباسيتور فوراً عند الإقلاع
initCapacitorNotifications();

// Create root and render application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import { createClient } from '@supabase/supabase-js';
import { Preferences } from '@capacitor/preferences';

const supabaseUrl = 'https://wlbpqnbkbonbbuodmfcq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsYnBxbmJrYm9uYmJ1b2RtZmNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzODExMjIsImV4cCI6MjA5Njk1NzEyMn0.SUgQ3j1o96rAvJjT9roCKPLllq-KkCSDCorq9cz2a1c';

// 1️⃣ إعداد مخزن بيانات مخصص يتصل بذاكرة الموبايل الأصلية عبر كاباسيتور
const capacitorAuthStorage = {
  getItem: async (key) => {
    const { value } = await Preferences.get({ key });
    return value;
  },
  setItem: async (key, value) => {
    await Preferences.set({ key, value });
  },
  removeItem: async (key) => {
    await Preferences.remove({ key });
  },
};

// 2️⃣ تمرير الإعدادات لـ Supabase Client لتفعيل التخزين والمزامنة التلقائية
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: capacitorAuthStorage, // إجبار الحفظ في ذاكرة الجهاز وليس المتصفح الوهمي
    autoRefreshToken: true,        // تحديث مفتاح الدخول تلقائياً لمنع خروج المستخدم مفاجئاً
    persistSession: true,          // استمرار الجلسة حتى بعد إغلاق التطبيق تماماً
    detectSessionInUrl: false      // إيقافها لأنك تعمل ببيئة تطبيق موبايل وليس ويب عادي
  },
});

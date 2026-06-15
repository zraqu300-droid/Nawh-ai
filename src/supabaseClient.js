import { createClient } from '@supabase/supabase-js';
import { Preferences } from '@capacitor/preferences';

// تم تحديث الرابط والمفتاح بالبيانات الجديدة التي زودتني بها
const supabaseUrl = 'https://bifewdnqarrzcdwybfxq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZmV3ZG5xYXJyemNkd3liZnhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NTM0NjQsImV4cCI6MjA5NzEyOTQ2NH0.WB36qyVaISYYG7dIVNwDdtWR5kc_Fo-6jGEIWI4wjh0';

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

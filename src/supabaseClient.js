import { createClient } from '@supabase/supabase-js';
import { Preferences } from '@capacitor/preferences';

// تم تحديث الرابط والمفتاح بالبيانات الجديدة التي زودتني بها
const supabaseUrl = 'https://embbzefopkkvylcqobjm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtYmJ6ZWZvcGtrdnlsY3FvYmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2NDMwNDIsImV4cCI6MjA5NzIxOTA0Mn0.madb-B0LF2HYwUl4q-DpbE5X88cVJaLtWJj1Idxq3rY';

// 1️⃣ إعداد مخزن بيانات مخصص يتصل بذاكرة الموبايل الأصلية عبر كاباسيتور
const capacitorAuthStorage = {
  getItem: async (key) => {
    const { value } = await Preferences.get({ key });
    return value;
  },
  setItem: async (key, value) => {
    await Preferences.set({ key, value });
  },
  removeItem: async (key, value) => {
    await Preferences.remove({ key });
  },
};

// 2️⃣ تمرير الإعدادات لـ Supabase Client لتفعيل التخزين والمزامنة التلقائية
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: capacitorAuthStorage, // إجبار الحفظ في ذاكرة الجهاز وليس المتصفح الوهمي
    autoRefreshToken: true,         // تحديث مفتاح الدخول تلقائياً لمنع خروج المستخدم مفاجئاً
    persistSession: true,          // استمرار الجلسة حتى بعد إغلاق التطبيق تماماً
    detectSessionInUrl: false      // إيقافها لأنك تعمل ببيئة تطبيق موبايل وليس ويب عادي
  },
});

import { CapacitorHttp } from '@capacitor/core';

/**
 * خدمة جلب البيانات باستخدام CapacitorHttp
 * @param {string} [formName] - اختياري: اسم النموذج لفلترة البيانات
 */
export const getDynamicDataService = async (formName = '') => {
  // تم تحديث الرابط ليتوافق مع هيكلية API في Vercel
  let url = 'https://nawhai.vercel.app/api/data';
  
  // إضافة الفلتر إلى الرابط كـ Query Parameter إذا تم تمريره
  if (formName) {
    url += `?form_name=${encodeURIComponent(formName)}`;
  }

  const options = {
    url: url,
    headers: { 
      'Accept': 'application/json' 
    }
  };

  try {
    const response = await CapacitorHttp.get(options);

    if (response.status === 200) {
      console.log('Data fetched successfully via Capacitor:', response.data);
      return response.data; // يحتوي على الأري (data) والعدد (count)
    } else {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error in getDynamicDataService:', error);
    throw error;
  }
};

/**
 * 🛠️ التعديل والتوافق المضاف لحل خطأ الـ Build:
 * ربط الدوال الثلاثة التي تطلبها صفحة الـ AI بـ getDynamicDataService وتمرير الفلاتر المناسبة.
 */

export const getArticles = async () => {
  // جلب المقالات عن طريق تمرير فلتر اسم النموذج الخاص بها
  return await getDynamicDataService('articles');
};

export const getImages = async () => {
  // جلب الصور والمرفقات عن طريق تمرير فلتر اسم النموذج الخاص بها
  return await getDynamicDataService('images');
};

export const getVideos = async () => {
  // جلب الفيديوهات عن طريق تمرير فلتر اسم النموذج الخاص بها
  return await getDynamicDataService('videos');
};

// 🌟 تصدير الكائن المجمع الافتراضي والمسمى الذي تبحث عنه صفحة AIPlaygroundPage
export const apiService = {
  getDynamicDataService,
  getArticles,
  getImages,
  getVideos
};

export default apiService;

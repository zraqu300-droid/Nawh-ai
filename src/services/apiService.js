import { CapacitorHttp } from '@capacitor/core';

/**
 * خدمة جلب البيانات باستخدام CapacitorHttp
 * @param {string} [formName] - اختياري: اسم النموذج لفلترة البيانات
 */
export const getDynamicDataService = async (formName = '') => {
  let url = 'https://venerable-frangipane-5e492b.netlify.app/api/get-data';
  
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

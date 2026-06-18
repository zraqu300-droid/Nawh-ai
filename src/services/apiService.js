import { CapacitorHttp } from '@capacitor/core';

/**
 * خدمة جلب البيانات باستخدام CapacitorHttp لجدول posts
 * مرتبطة بملف الجلب: get-data.js
 */
export const getDynamicDataService = async () => {
  const options = {
    url: 'https://nawh-ai.vercel.app/api/get-data',
    headers: { 'Accept': 'application/json' }
  };

  try {
    const response = await CapacitorHttp.get(options);
    if (response.status === 200) {
      return response.data; // النتيجة تعود بالبيانات كاملة من السيرفر
    } else {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error in getDynamicDataService:', error);
    throw error;
  }
};

/**
 * خدمة حفظ البيانات باستخدام CapacitorHttp لجدول posts
 * مرتبطة بملف الحفظ: save-data.js
 */
export const saveDynamicDataService = async (payload) => {
  const options = {
    url: 'https://nawh-ai.vercel.app/api/save-data',
    headers: { 'Content-Type': 'application/json' },
    // الـ payload يحتوي على حقول الجدول الحقيقية: { type, title, url, description, file_path }
    data: payload 
  };

  try {
    const response = await CapacitorHttp.post(options);
    if (response.status === 200) {
      console.log('Data saved successfully');
      return response.data;
    } else {
      throw new Error(`Failed to save data. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error in saveDynamicDataService:', error);
    throw error;
  }
};

/**
 * خدمة حذف البيانات باستخدام CapacitorHttp عن طريق id المنشور
 * مرتبطة بملف الحذف: delete-data.js
 */
export const deleteDynamicDataService = async (id) => {
  if (!id) throw new Error('ID is required for deletion');

  const options = {
    url: `https://nawh-ai.vercel.app/api/delete-data?id=${parseInt(id, 10)}`, 
    headers: { 'Accept': 'application/json' }
  };

  try {
    const response = await CapacitorHttp.delete(options);
    if (response.status === 200) {
      console.log('Data deleted successfully');
      return response.data;
    } else {
      throw new Error(`Failed to delete data. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error in deleteDynamicDataService:', error);
    throw error;
  }
};

// الدوال المساعدة الموجهة لجلب البيانات الإجمالية للمشاهدة
export const getArticles = async () => await getDynamicDataService();
export const getImages = async () => await getDynamicDataService();
export const getVideos = async () => await getDynamicDataService();

export const apiService = {
  getDynamicDataService,
  saveDynamicDataService,
  deleteDynamicDataService,
  getArticles,
  getImages,
  getVideos
};

export default apiService;

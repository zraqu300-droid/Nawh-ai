import { CapacitorHttp } from '@capacitor/core';

const BASE_URL = 'https://nawh-ai.vercel.app/api';

/**
 * خدمة جلب البيانات باستخدام CapacitorHttp
 */
export const getDynamicDataService = async (section = '') => {
  let url = `${BASE_URL}/get-data`;
  
  // إضافة الفلتر إلى الرابط كـ Query Parameter
  if (section) {
    url += `?section=${encodeURIComponent(section)}`;
  }

  const options = {
    url: url,
    headers: { 'Accept': 'application/json' }
  };

  try {
    const response = await CapacitorHttp.get(options);
    if (response.status === 200) {
      return response.data; // النتيجة في response.data.data
    } else {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error in getDynamicDataService:', error);
    throw error;
  }
};

/**
 * خدمة حفظ البيانات باستخدام CapacitorHttp
 */
export const saveDynamicDataService = async (payload) => {
  const options = {
    url: `${BASE_URL}/save-data`,
    headers: { 'Content-Type': 'application/json' },
    data: payload // payload يجب أن يحتوي على {type, title, content, section, metadata}
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

export const getArticles = async () => await getDynamicDataService('articles');
export const getImages = async () => await getDynamicDataService('images');
export const getVideos = async () => await getDynamicDataService('videos');

export const apiService = {
  getDynamicDataService,
  saveDynamicDataService,
  getArticles,
  getImages,
  getVideos
};

export default apiService;

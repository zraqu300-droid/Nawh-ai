import { CapacitorHttp } from '@capacitor/core';

/**
 * خدمة حفظ البيانات باستخدام CapacitorHttp لجدول posts
 * مرتبطة بملف الحفظ: save-data.js
 */
export const saveDynamicDataService = async (payload) => {
  const options = {
    url: 'https://nawh-ai.vercel.app/api/save-data',
    headers: { 'Content-Type': 'application/json' },
    // الـ payload يحتوي على حقول الجدول: { type, title, url, description, file_path }
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
 * خدمة حذف البيانات باستخدام CapacitorHttp عن طريق الـ id
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

export const apiService = {
  saveDynamicDataService,
  deleteDynamicDataService
};

export default apiService;

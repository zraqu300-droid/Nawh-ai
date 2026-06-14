import { CapacitorHttp } from '@capacitor/core';

/**
 * خدمة حفظ البيانات الديناميكية باستخدام CapacitorHttp
 * @param {string} formName - اسم النموذج أو القالب (مثال: 'onboarding_form')
 * @param {Object} dataPayload - كائن يحتوي على البيانات المراد حفظها
 */
export const saveDynamicDataService = async (formName, dataPayload) => {
  const url = 'https://venerable-frangipane-5e492b.netlify.app/api/save-data';

  const options = {
    url: url,
    headers: { 
      'Content-Type': 'application/json' 
    },
    // في CapacitorHttp نقوم بإرسال الكائن مباشرة في الـ data والمنصة تتكفل بالباقي
    data: {
      form_name: formName,
      data: dataPayload
    }
  };

  try {
    const response = await CapacitorHttp.post(options);
    
    // التحقق من حالة الرد (Status Code)
    if (response.status === 200 || response.status === 201) {
      console.log('Data saved successfully via Capacitor:', response.data);
      return response.data;
    } else {
      throw new Error(`Failed to save data. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error in saveDynamicDataService:', error);
    throw error;
  }
};

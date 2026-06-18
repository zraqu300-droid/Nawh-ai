import { neon } from '@neondatabase/serverless';

export default async function handler(request, response) {
    // إعدادات CORS للسماح بالاتصال من الواجهة الأمامية
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // التعامل مع طلبات الـ OPTIONS المسبقة
    if (request.method === 'OPTIONS') return response.status(200).end();

    // التحقق من نوع الطلب
    if (request.method !== 'POST') {
        return response.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    try {
        // الاتصال بقاعدة بيانات Neon بواسطة المتغير داخل فيرسل
        const sql = neon(process.env.DATABASE_URL);
        
        // استخراج البيانات القادمة من جسم الطلب (Request Body) طبقاً للواجهة
        const { type, title, url, description, file_path } = request.body;

        // التحقق من وجود الحقول الإجبارية لتفادي أخطاء قاعدة البيانات
        if (!type || !title) {
            return response.status(400).json({ 
                success: false, 
                error: 'حقول النوع والعنوان إجبارية لإتمام عملية النشر' 
            });
        }

        // تحضير المتغيرات لضمان معالجتها كـ نصوص أو تركها فارغة بشكل سليم يقبله محرك نيون
        const postType = String(type);
        const postTitle = String(title);
        const postUrl = url ? String(url) : null;
        const postDesc = description ? String(description) : null;
        const postFile = file_path ? String(file_path) : null;

        // تنفيذ استعلام الإدخال السليم والمباشر دون صياغة شروط داخل القالب الزمني
        const result = await sql`
            INSERT INTO posts (
                type, 
                title, 
                url, 
                description, 
                file_path
            ) VALUES (
                ${postType}, 
                ${postTitle}, 
                ${postUrl}, 
                ${postDesc}, 
                ${postFile}
            ) RETURNING id;
        `;

        // إرجاع استجابة النجاح مع المعرف الفريد للمنشور الجديد
        return response.status(200).json({ 
            success: true, 
            message: "تم حفظ بيانات المنشور بنجاح داخل نيون نيو",
            inserted_id: result[0].id
        });

    } catch (error) {
        console.error('CRITICAL DATABASE ERROR:', error);
        return response.status(500).json({ 
            success: false, 
            error: error.message
        });
    }
}

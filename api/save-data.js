import { neon } from '@neondatabase/serverless';

export default async function handler(request, response) {
    // السماح بالطلبات من أي مصدر (CORS)
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    // التأكد من أن نوع الطلب هو POST
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        // الاتصال بقاعدة البيانات باستخدام متغير البيئة SUPABASE_URL
        const sql = neon(process.env.SUPABASE_URL);
        
        // استخراج البيانات من جسم الطلب
        const { type, title, content, section, metadata } = request.body;

        // تنفيذ عملية الإدخال
        // ملاحظة: نستخدم ::jsonb لتحويل الـ metadata إلى صيغة JSONB المطلوبة
        const result = await sql`
            INSERT INTO posts (type, title, content, section, metadata)
            VALUES (
                ${type || 'general'}, 
                ${title || ''}, 
                ${content || ''}, 
                ${section || 'general'}, 
                ${JSON.stringify(metadata || {})}::jsonb
            )
            RETURNING id;
        `;
        
        return response.status(200).json({ 
            success: true, 
            message: "تم حفظ البيانات بنجاح", 
            id: result[0].id 
        });

    } catch (error) {
        console.error("SAVE ERROR:", error);
        return response.status(500).json({ success: false, error: error.message });
    }
}

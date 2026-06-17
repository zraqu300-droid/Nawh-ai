import { neon } from '@neondatabase/serverless';

export default async function handler(request, response) {
    // إعدادات CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') return response.status(200).end();

    // التحقق من نوع الطلب ليكون GET فقط
    if (request.method !== 'GET') {
        return response.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    try {
        const sql = neon(process.env.DATABASE_URL);
        
        // جلب جميع البيانات مرتبة تنازلياً حسب تاريخ الإنشاء
        const data = await sql`SELECT * FROM posts ORDER BY created_at DESC;`;

        return response.status(200).json({ 
            success: true, 
            count: data.length,
            data: data
        });

    } catch (error) {
        console.error('CRITICAL DATABASE ERROR:', error);
        return response.status(500).json({ 
            success: false, 
            error: error.message
        });
    }
}

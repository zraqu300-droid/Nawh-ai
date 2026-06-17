import { neon } from '@neondatabase/serverless';

export default async function handler(request, response) {
    // إعدادات CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') return response.status(200).end();

    // التحقق من نوع الطلب ليكون DELETE
    if (request.method !== 'DELETE') {
        return response.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    try {
        const sql = neon(process.env.DATABASE_URL);
        
        // استخراج الـ id المراد حذفه من الرابط (على سبيل المثال: /api/delete-post?id=5)
        const { id } = request.query;

        if (!id) {
            return response.status(400).json({ 
                success: false, 
                error: 'يجب تمرير المعرف الفريد id لإتمام الحذف' 
            });
        }

        // تنفيذ استعلام الحذف داخل قاعدة البيانات
        const result = await sql`
            DELETE FROM posts 
            WHERE id = ${parseInt(id, 10)}
            RETURNING id;
        `;

        // إذا لم يعثر الاستعلام على السجل المطلوب لحذفه
        if (result.length === 0) {
            return response.status(404).json({ 
                success: false, 
                error: 'لم يتم العثور على هذا المنشور، قد يكون محذوفاً بالفعل' 
            });
        }

        return response.status(200).json({ 
            success: true, 
            message: "تم حذف المنشور من قاعدة البيانات بنجاح"
        });

    } catch (error) {
        console.error('CRITICAL DATABASE ERROR:', error);
        return response.status(500).json({ 
            success: false, 
            error: error.message
        });
    }
}

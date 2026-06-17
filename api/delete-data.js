import { neon } from '@neondatabase/serverless';

export default async function handler(request, response) {
    // إعدادات CORS للسماح بالطلبات من الموبايل
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    // تأكد أن الطلب من نوع DELETE
    if (request.method !== 'DELETE') return response.status(405).json({ error: 'Method not allowed' });
    
    try {
        const { id } = request.body; // توقع استلام id المنشور للحذف

        if (!id) {
            return response.status(400).json({ success: false, error: "ID is required for deletion" });
        }

        // استخدام SUPABASE_URL للاتصال
        const sql = neon(process.env.SUPABASE_URL);

        // تنفيذ عملية الحذف
        const result = await sql`DELETE FROM posts WHERE id = ${id}`;

        return response.status(200).json({ 
            success: true, 
            message: `Post ${id} deleted successfully` 
        });
        
    } catch (error) {
        console.error("DELETE ERROR:", error);
        return response.status(500).json({ success: false, error: error.message });
    }
}

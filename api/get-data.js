import { neon } from '@neondatabase/serverless';

export default async function handler(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    try {
        // تم التحديث لاستخدام SUPABASE_URL
        const sql = neon(process.env.SUPABASE_URL);
        const data = await sql`SELECT * FROM posts ORDER BY created_at DESC`;
        
        return response.status(200).json({ success: true, data });
    } catch (error) {
        console.error("GET ERROR:", error);
        return response.status(500).json({ success: false, error: error.message });
    }
}

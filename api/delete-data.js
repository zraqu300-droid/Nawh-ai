import { neon } from '@neondatabase/serverless';

export default async function handler(request, response) {
    if (request.method !== 'DELETE') return response.status(405).end();
    
    try {
        const sql = neon(process.env.DATABASE_URL);
        const { id } = request.body; // نرسل الـ ID في جسم الطلب

        if (!id) return response.status(400).json({ error: "Missing ID" });

        await sql`DELETE FROM posts WHERE id = ${id}`;
        
        return response.status(200).json({ success: true, message: `Post ${id} deleted` });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}

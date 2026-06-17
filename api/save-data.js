import { neon } from '@neondatabase/serverless';

export default async function handler(request, response) {
    // 1. السماح بالطلبات من أي مصدر (CORS)
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
    
    try {
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl) throw new Error("DATABASE_URL is not defined in environment variables");

        const sql = neon(dbUrl);
        const { type, title, content, section, metadata } = request.body;

        // 2. التنفيذ مع إجبار النوع لـ JSONB
        const result = await sql`
            INSERT INTO posts (type, title, content, section, metadata)
            VALUES (${type || 'text'}, ${title || 'No Title'}, ${content || ''}, ${section || 'general'}, ${JSON.stringify(metadata || {})}::jsonb)
            RETURNING id;
        `;
        
        return response.status(200).json({ success: true, id: result[0].id });
    } catch (error) {
        console.error("CRITICAL API ERROR:", error); // هذا سيظهر في Logs الخاصة بـ Vercel
        return response.status(500).json({ success: false, error: error.message });
    }
}

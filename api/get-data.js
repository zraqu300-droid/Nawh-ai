import { neon } from '@neondatabase/serverless';

export default async function handler(request, response) {
    if (request.method !== 'GET') return response.status(405).end();
    
    try {
        const sql = neon(process.env.DATABASE_URL);
        const { section } = request.query;

        const query = section 
            ? sql`SELECT * FROM posts WHERE section = ${section} ORDER BY created_at DESC`
            : sql`SELECT * FROM posts ORDER BY created_at DESC`;

        const data = await query;
        return response.status(200).json({ success: true, data });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}

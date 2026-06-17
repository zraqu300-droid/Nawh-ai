import { neon } from '@neondatabase/serverless';

export default async function handler(request, response) {
    if (request.method !== 'POST') return response.status(405).end();
    
    try {
        const sql = neon(process.env.DATABASE_URL);
        const { type, title, content, section, metadata } = request.body;

        const result = await sql`
            INSERT INTO posts (type, title, content, section, metadata)
            VALUES (${type}, ${title}, ${content}, ${section || 'general'}, ${JSON.stringify(metadata)})
            RETURNING id;
        `;
        return response.status(200).json({ success: true, id: result[0].id });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}

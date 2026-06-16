import { neon } from '@neondatabase/serverless';

export default async function handler(request, response) {
    // إعدادات CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') return response.status(200).end();

    try {
        // الاتصال بقاعدة البيانات (يتم داخل الدالة في Neon Serverless)
        const sql = neon(process.env.DATABASE_URL);
        
        const body = request.body;
        let dataToSave = Array.isArray(body) ? body : (body.posts || body.data || [body]);

        const results = [];

        for (const item of dataToSave) {
            const content = item.content || item.text || item.body || item.message || JSON.stringify(item); 
            const media_url = item.media_url || item.url || item.image || item.link || '';
            const section = item.section || body.section || 'bouh-display';
            const age = parseInt(item.age || body.age || 0);
            const name = item.name || body.name || 'User';
            const p_type = item.type || (media_url ? 'رابط' : 'نصي');

            const res = await sql`
                INSERT INTO posts (
                    content, media_url, section, type, age, name
                ) VALUES (
                    ${String(content)}, 
                    ${String(media_url)}, 
                    ${String(section)}, 
                    ${String(p_type)}, 
                    ${age}, 
                    ${String(name)}
                ) RETURNING id;
            `;
            results.push(res[0].id);
        }

        return response.status(200).json({ 
            success: true, 
            message: "تم الحفظ بنجاح عبر Neon",
            inserted_ids: results
        });

    } catch (error) {
        console.error('CRITICAL DATABASE ERROR:', error);
        return response.status(500).json({ 
            success: false, 
            error: error.message
        });
    }
}

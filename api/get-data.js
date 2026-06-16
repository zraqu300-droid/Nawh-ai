import pg from 'pg';

const { Pool } = pg;

// تم تحديث المتغير إلى SUPABASE_URL ليتوافق مع إعدادات Vercel لديك
const pool = new Pool({
  connectionString: process.env.SUPABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  // تفعيل الـ CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // استخراج الفلاتر (Query Parameters)
    const formNameFilter = req.query.form_name;

    let query = '';
    let values = [];

    if (formNameFilter) {
      query = `
        SELECT id, form_name, payload, created_at 
        FROM dynamic_payloads 
        WHERE form_name = $1 
        ORDER BY created_at DESC;
      `;
      values = [formNameFilter];
    } else {
      query = `
        SELECT id, form_name, payload, created_at 
        FROM dynamic_payloads 
        ORDER BY created_at DESC;
      `;
    }

    const result = await pool.query(query, values);

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

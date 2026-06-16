const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.SUPABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = async (req, res) => {
  // تفعيل الـ CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { form_name, payload } = req.body;

    if (!form_name || !payload) {
      return res.status(400).json({ success: false, error: 'Missing form_name or payload' });
    }

    const query = `
      INSERT INTO dynamic_payloads (form_name, payload, created_at)
      VALUES ($1, $2, NOW())
      RETURNING id;
    `;
    const values = [form_name, payload];
    
    await pool.query(query, values);

    return res.status(200).json({ success: true, message: 'Data saved successfully!' });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

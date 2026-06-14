import pg from 'pg';

const { Client } = pg;

export const handler = async (event, context) => {
  // السماح بطلب POST فقط
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // الاتصال بقاعدة البيانات باستخدام المتغير الموجود في نتفلاي
  const connectionString = process.env.SUPABASE_DATABASE_URL;

  if (!connectionString) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database connection string is missing.' }),
    };
  }

  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    // استقبال جسم الطلب بالكامل
    const bodyData = JSON.parse(event.body);

    // استخراج اسم النموذج اختياري لو تم إرساله، وإلا نأخذ كل البيانات كـ payload
    const formName = bodyData.form_name || 'generic_form';
    
    // إذا قام المستخدم بإرسال كائن مخصص اسمه data أو payload نأخذه، وإلا نعتبر الـ body بالكامل هو البيانات
    const dynamicData = bodyData.data || bodyData.payload || bodyData;

    await client.connect();

    // الاستعلام العام للحفظ داخل الجدول والعمود المرن payload
    const query = `
      INSERT INTO dynamic_payloads (form_name, payload, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW())
      RETURNING *;
    `;
    
    // تحويل البيانات الديناميكية إلى نص JSON ليتم تخزينها في الـ JSONB
    const values = [formName, JSON.stringify(dynamicData)];
    const result = await client.query(query, values);

    await client.end();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'Data saved smoothly into the generic schema!',
        inserted_row: result.rows[0],
      }),
    };

  } catch (error) {
    try { await client.end(); } catch (e) {}
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
    };
  }
};

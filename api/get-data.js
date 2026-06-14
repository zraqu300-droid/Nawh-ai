import pg from 'pg';

const { Client } = pg;

export const handler = async (event, context) => {
  // السماح بطلبات GET فقط لجلب البيانات
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // جلب رابط سلسلة الاتصال من متغيرات البيئة في Netlify
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
    await client.connect();

    // جلب المعاملات (Query Parameters) من الرابط إذا وُجدت (مثال: ?form_name=user_register)
    const formNameFilter = event.queryStringParameters && event.queryStringParameters.form_name;

    let query = '';
    let values = [];

    if (formNameFilter) {
      // إذا أرسل المستخدم اسم نموذج معين، يتم جلب بيانات هذا النموذج فقط بترتيب من الأحدث للأقدم
      query = `
        SELECT id, form_name, payload, created_at 
        FROM dynamic_payloads 
        WHERE form_name = $1 
        ORDER BY created_at DESC;
      `;
      values = [formNameFilter];
    } else {
      // إذا لم يرسل أي فلتر، يتم جلب كافة البيانات الموجودة في الجدول بترتيب من الأحدث للأقدم
      query = `
        SELECT id, form_name, payload, created_at 
        FROM dynamic_payloads 
        ORDER BY created_at DESC;
      `;
    }

    const result = await client.query(query, values);
    
    // إغلاق الاتصال بنجاح
    await client.end();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        // تفعيل الـ CORS لتتمكن من طلب الـ API من أي مكان في الفرونت إند
        'Access-Control-Allow-Origin': '*', 
      },
      body: JSON.stringify({
        success: true,
        count: result.rows.length,
        data: result.rows,
      }),
    };

  } catch (error) {
    // التأكد من إغلاق الاتصال في حالة حدوث خطأ مفاجئ
    try { await client.end(); } catch (e) {}
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
    };
  }
};

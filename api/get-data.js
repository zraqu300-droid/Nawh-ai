import pg from 'pg';
import { NextResponse } from 'next/server';

const { Pool } = pg;

// إعداد الاتصال باستخدام Pool لضمان كفاءة التعامل مع الطلبات في فيرسل
const pool = new Pool({
  connectionString: process.env.SUPABASE_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function GET(request) {
  try {
    // استخراج الفلاتر (Query Parameters) من الرابط
    const { searchParams } = new URL(request.url);
    const formNameFilter = searchParams.get('form_name');

    let query = '';
    let values = [];

    if (formNameFilter) {
      // جلب بيانات نموذج محدد
      query = `
        SELECT id, form_name, payload, created_at 
        FROM dynamic_payloads 
        WHERE form_name = $1 
        ORDER BY created_at DESC;
      `;
      values = [formNameFilter];
    } else {
      // جلب كافة البيانات
      query = `
        SELECT id, form_name, payload, created_at 
        FROM dynamic_payloads 
        ORDER BY created_at DESC;
      `;
    }

    // تنفيذ الاستعلام
    const result = await pool.query(query, values);

    // إرجاع النتيجة بتنسيق Next.js
    return NextResponse.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    }, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

import pg from 'pg';
import { NextResponse } from 'next/server';

const { Pool } = pg;

// إعداد الاتصال باستخدام Pool
const pool = new Pool({
  connectionString: process.env.SUPABASE_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function POST(request) {
  try {
    // 1. استقبال البيانات المرسلة من الفرونت إند
    const body = await request.json();
    const { form_name, payload } = body;

    // 2. التحقق من وجود البيانات
    if (!form_name || !payload) {
      return NextResponse.json(
        { success: false, error: 'Missing form_name or payload' },
        { status: 400 }
      );
    }

    // 3. إدخال البيانات في قاعدة البيانات
    const query = `
      INSERT INTO dynamic_payloads (form_name, payload, created_at)
      VALUES ($1, $2, NOW())
      RETURNING id;
    `;
    const values = [form_name, payload];
    
    await pool.query(query, values);

    // 4. الرد بنجاح
    return NextResponse.json(
      { success: true, message: 'Data saved successfully!' },
      { 
        status: 200,
        headers: { 'Access-Control-Allow-Origin': '*' }
      }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

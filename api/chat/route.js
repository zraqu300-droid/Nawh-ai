import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import OpenAI from 'openai';

// 1. إعداد الاتصال بقاعدة بيانات Neon Serverless
// يتطلب وجود متغير بيئي باسم DATABASE_URL في Vercel
const sql = neon(process.env.DATABASE_URL);

// 2. إعداد الاتصال بـ OpenRouter باستخدام مفتاحك OPENAI_API_KEY
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1', // توجيه الطلب إلى OpenRouter
  apiKey: process.env.OPENAI_API_KEY,      // المفتاح الذي قمت بتسميته في Vercel
});

export async function POST(request) {
  try {
    const { message, userId } = await request.json();

    // [اختياري]: يمكنك هنا الاستعلام من قاعدة بيانات Neon قبل إرسال الطلب للذكاء الاصطناعي
    // مثال: جلب بيانات المستخدم أو آخر المحادثات
    // const userRows = await sql`SELECT * FROM users WHERE id = ${userId}`;

    // 3. إرسال الطلب إلى موديل الذكاء الاصطناعي عبر OpenRouter
    const aiResponse = await openai.chat.completions.create({
      model: 'meta-llama/llama-3-8b-instruct:free', // الموديل المجاني
      messages: [
        { role: 'user', content: message }
      ],
    });

    const replyText = aiResponse.choices[0].message.content;

    // 4. حفظ رد الذكاء الاصطناعي في قاعدة بيانات Neon فوراً
    // تأكد من وجود جدول للمحادثات (مثلاً اسمه messages) في قاعدة بياناتك
    if (userId) {
      await sql`
        INSERT INTO messages (user_id, prompt, response, created_at)
        VALUES (${userId}, ${message}, ${replyText}, NOW())
      `;
    }

    // 5. إرجاع الرد النهائي إلى الفرونت إند (React)
    return NextResponse.json({ reply: replyText });

  } catch (error) {
    console.error('Database or AI Error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء معالجة الطلب' }, { status: 500 });
  }
}

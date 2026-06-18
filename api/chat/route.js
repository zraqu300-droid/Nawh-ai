import { neon } from '@neondatabase/serverless';
import OpenAI from 'openai';

// ربط قاعدة بيانات Neon
const sql = neon(process.env.DATABASE_URL);

// ربط OpenRouter
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENAI_API_KEY, 
});

// الدالة الأساسية التي يستدعيها Vercel تلقائياً عند طلب الرابط
export default async function handler(request, response) {
  // السماح بطلبات POST فقط
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, userId } = request.body;

    // 1. طلب الرد من الذكاء الاصطناعي
    const aiResponse = await openai.chat.completions.create({
      model: 'meta-llama/llama-3-8b-instruct:free',
      messages: [
        { role: 'user', content: message }
      ],
    });

    const replyText = aiResponse.choices[0].message.content;

    // 2. حفظ في قاعدة البيانات إذا أرسلت الـ userId
    if (userId) {
      await sql`
        INSERT INTO messages (user_id, prompt, response, created_at)
        VALUES (${userId}, ${message}, ${replyText}, NOW())
      `;
    }

    // 3. إرجاع النتيجة
    return response.status(200).json({ reply: replyText });

  } catch (error) {
    console.error('Error:', error);
    return response.status(500).json({ error: 'حدث خطأ في السيرفر' });
  }
}

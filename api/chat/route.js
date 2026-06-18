import { neon } from '@neondatabase/serverless';

// ربط قاعدة بيانات Neon
const sql = neon(process.env.DATABASE_URL);

// الدالة الأساسية التي يستدعيها Vercel تلقائياً عند طلب الرابط
export default async function handler(request, response) {
  // السماح بطلبات POST فقط
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, userId } = request.body;

    // 1. طلب الرد من الذكاء الاصطناعي عبر fetch المدمجة بدون أي مكتبات خارجيّة
    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct:free", // الموديل المجاني من OpenRouter
        messages: [
          { role: "user", content: message }
        ]
      })
    });

    // تحويل استجابة الذكاء الاصطناعي إلى JSON
    const aiData = await openRouterResponse.json();
    
    // استخراج نص الرد
    const replyText = aiData.choices[0].message.content;

    // 2. حفظ في قاعدة البيانات إذا أرسلت الـ userId
    if (userId) {
      await sql`
        INSERT INTO messages (user_id, prompt, response, created_at)
        VALUES (${userId}, ${message}, ${replyText}, NOW())
      `;
    }

    // 3. إرجاع النتيجة الحصريّة للفرونت إند
    return response.status(200).json({ reply: replyText });

  } catch (error) {
    console.error('Error:', error);
    return response.status(500).json({ error: 'حدث خطأ في السيرفر الداخلي' });
  }
}

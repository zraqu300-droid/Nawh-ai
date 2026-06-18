// الدالة الأساسية التي يستدعيها Vercel تلقائياً عند طلب الرابط (شات فقط)
export default async function handler(request, response) {
  // السماح بطلبات POST فقط
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message } = request.body;

    // التحقق من وصول الرسالة لتفادي قراءة قيم فارغة
    if (!message) {
      return response.status(400).json({ error: 'Message payload is required' });
    }

    // 1. طلب الرد من الذكاء الاصطناعي عبر fetch المدمجة
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
    
    // طباعة الاستجابة في السجلات للمراقبة السريعة والتصحيح
    console.log('OpenRouter API Raw Response:', JSON.stringify(aiData));

    // استخراج نص الرد بشكل آمن تماماً يمنع انهيار السيرفر (Safe Reading)
    const replyText = aiData?.choices?.[0]?.message?.content;

    // التحقق مما إذا كان الرد فارغاً أو أن OpenRouter أرجع خطأ في البنية
    if (!replyText) {
      const apiErrorMessage = aiData?.error?.message || "Llama model is currently unreachable or API Key invalid.";
      console.error('OpenRouter failed to reply:', apiErrorMessage);
      return response.status(502).json({ 
        error: 'فشل مزود الذكاء الاصطناعي في الاستجابة',
        details: apiErrorMessage 
      });
    }

    // 2. إرجاع النتيجة الحصريّة والمستقرة للفرونت إند مباشرة
    return response.status(200).json({ reply: replyText });

  } catch (error) {
    console.error('Fatal Route Error:', error);
    return response.status(500).json({ error: 'حدث خطأ في السيرفر الداخلي أثناء معالجة الطلب' });
  }
}

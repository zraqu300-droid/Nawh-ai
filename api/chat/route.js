// api/chat/route.js

export async function GET(request) {
  // 1. قراءة متغيرات البيئة من سيرفر Vercel
  const chatbotId = process.env.NEXT_PUBLIC_CHATBOT_ID;
  const chatbaseHost = process.env.NEXT_PUBLIC_CHATBASE_HOST || "https://www.chatbase.co";

  // 2. التحقق من وجود المعرف (ID) لمنع الأخطاء
  if (!chatbotId) {
    return new Response(
      JSON.stringify({ error: "خطأ: المعرف NEXT_PUBLIC_CHATBOT_ID غير مضاف في إعدادات Vercel" }), 
      {
        status: 400,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }
    );
  }

  // 3. نص كود الجافا سكريبت الذي سيتم تشغيله داخل المتصفح (Client) لإنشاء الشات
  const scriptCode = `
    (function() {
      if (!document.getElementById("chatbase-chatbot-script")) {
        const script = document.createElement("script");
        script.id = "chatbase-chatbot-script";
        script.src = "${chatbaseHost}/embed.min.js";
        script.setAttribute("chatbotId", "${chatbotId}");
        script.setAttribute("domain", "${new URL(chatbaseHost).hostname}");
        script.defer = true;
        document.body.appendChild(script);
      }
    })();
  `;

  // 4. إرسال الكود كملف جافا سكريبت تنفيذي (application/javascript)
  return new Response(scriptCode, {
    status: 200,
    headers: { 
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-store, max-age=0" // لضمان عدم كاش السكريبت عند تغيير الإعدادات
    }
  });
}

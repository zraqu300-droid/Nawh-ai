import { useEffect } from 'react';

export default function ChatbotScript() {
  useEffect(() => {
    // التأكد من أن المتغيرات موجودة قبل تشغيل السكريبت
    const chatbotId = process.env.NEXT_PUBLIC_CHATBOT_ID;
    const chatbaseHost = process.env.NEXT_PUBLIC_CHATBASE_HOST || "https://www.chatbase.co";

    if (!chatbotId) {
      console.error("Chatbot ID is missing! Please check your environment variables.");
      return;
    }

    // إنشاء عنصر السكريبت لتضمين الشات
    const script = document.createElement('script');
    script.src = `${chatbaseHost}/embed.min.js`;
    script.setAttribute('chatbotId', chatbotId);
    script.setAttribute('domain', new URL(chatbaseHost).hostname);
    script.defer = true;

    // إضافة السكريبت إلى جسم الصفحة (body)
    document.body.appendChild(script);

    // تنظيف السكريبت عند إغلاق المكون من الصفحة لمنع التكرار
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null; // هذا المكون لا يحتاج لعرض أي عناصر HTML لأنه يضيف الشات في الخلفية
}

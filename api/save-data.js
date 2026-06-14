// api/save-data.js
import pg from 'pg';
const { Client } = pg;

export async function handler(event, context) {
  // للتأكد من استقبال الطلبات بشكل صحيح وحل مشكلة الـ CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify({ message: "Successful Preflight" }),
    };
  }

  try {
    // كود الاتصال بقاعدة البيانات الخاص بك هنا
    
    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ success: true, message: "Connected and Data Processed Successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}

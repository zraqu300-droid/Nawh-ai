import React from 'react';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#1e1e2f',
      color: '#ffffff',
      fontFamily: 'sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#4edf85' }}>
        🚀 تطبيق nawh.ai يعمل بنجاح!
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#a2a2c2', maxWidth: '500px' }}>
        إذا ظهرت لك هذه الشاشة الملونة الآن، فهذا يعني أن الـ APK سليم تماماً وأن المشكلة السابقة كانت بسبب مسارات الـ Router الافتراضية للهاتف.
      </p>
      <div style={{
        marginTop: '30px',
        padding: '10px 20px',
        backgroundColor: '#2a2a40',
        borderRadius: '10px',
        fontSize: '0.9rem',
        border: '1px solid #444'
      }}>
        بنية الـ APK مستقرة 100%
      </div>
    </div>
  );
}

export default App;

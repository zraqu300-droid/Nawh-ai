import React, { useState } from 'react';
import { 
  TrendingUp, 
  Database, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Layers, 
  Link as LinkIcon,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowLeftRight
} from 'lucide-react';

export default function Dashboard() {
  const [activeType, setActiveType] = useState('Image');

  // كائنات الستايل المدمجة بديلة للـ CSS الخارجي
  const styles = {
    container: {
      direction: 'rtl',
      minHeight: '100vh',
      backgroundColor: '#0e111a',
      color: '#ffffff',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box'
    },
    glowTop: {
      position: 'absolute',
      top: '-10%',
      left: '-10%',
      width: '500px',
      height: '500px',
      borderRadius: '50%',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      filter: 'blur(130px)',
      pointerEvents: 'none'
    },
    glowBottom: {
      position: 'absolute',
      bottom: '-10%',
      right: '-10%',
      width: '600px',
      height: '600px',
      borderRadius: '50%',
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
      filter: 'blur(150px)',
      pointerEvents: 'none'
    },
    wrapper: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      position: 'relative',
      zIndex: 10
    },
    headerRow: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '16px',
      alignItems: 'stretch'
    },
    banner: {
      flex: 1,
      background: 'linear-gradient(90deg, #3d7cff 0%, #9147ff 50%, #ff763b 100%)',
      borderRadius: '16px',
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
    },
    logoBox: {
      backgroundColor: '#161b26',
      border: '1px solid #222938',
      borderRadius: '16px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      itemsCenter: 'center',
      justifyContent: 'center',
      minWidth: '140px',
      textAlign: 'center',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    logoIconCircle: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #3d7cff, #ff763b)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 8px auto',
      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2)'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px'
    },
    statCard: {
      backgroundColor: '#161b26',
      border: '1px solid #222938',
      borderRadius: '16px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    iconWrapper: {
      padding: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mainLayout: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '24px'
    },
    rightSection: {
      gridColumn: 'span 2',
      backgroundColor: '#161b26',
      border: '1px solid #222938',
      borderRadius: '16px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    creatorHeader: {
      background: 'linear-gradient(90deg, #2b3595, #d44b1d)',
      padding: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    creatorBody: {
      padding: '24px',
      backgroundColor: '#f3f4f6',
      color: '#1a202c',
      borderBottomLeftRadius: '16px',
      borderBottomRightRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    typeSelectorGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '8px',
      direction: 'ltr'
    },
    typeBtn: (isActive) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 4px',
      borderRadius: '12px',
      border: isActive ? '2px solid #533bfe' : '1px solid #222938',
      backgroundColor: isActive ? '#1e2538' : '#111520',
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }),
    inputStyle: {
      width: '100%',
      backgroundColor: '#f7fafc',
      border: '1px solid #e2e8f0',
      color: '#1a202c',
      borderRadius: '12px',
      padding: '12px 16px',
      fontSize: '13px',
      outline: 'none',
      boxSizing: 'border-box'
    },
    errorBox: {
      backgroundColor: '#fff5f5',
      border: '1px solid #fed7d7',
      color: '#c53030',
      borderRadius: '12px',
      padding: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '12px',
      fontWeight: '600'
    },
    submitBtn: {
      width: '100%',
      background: 'linear-gradient(90deg, #1d52d4, #ff5722)',
      color: '#ffffff',
      border: 'none',
      fontWeight: 'bold',
      padding: '14px',
      borderRadius: '12px',
      fontSize: '13px',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
    },
    leftSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    lightCard: {
      backgroundColor: '#f7fafc',
      color: '#1a202c',
      borderRadius: '16px',
      padding: '20px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 1
    }
  };

  return (
    <div style={styles.container}>
      {/* تأثيرات الإضاءة النيونية الخلفية */}
      <div style={styles.glowTop}></div>
      <div style={styles.glowBottom}></div>

      <div style={styles.wrapper}>
        
        {/* البانر العلوي والشعار */}
        <div style={styles.headerRow}>
          <div style={styles.banner}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', letterSpacing: '0.5px' }}>لوحة التحكم المركزية</h1>
              <p style={{ margin: 0, color: '#f0f4ff', fontSize: '14px', opacity: 0.9 }}>مرحباً بك في قلب نظام nawh.ai النبضي</p>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>
              <Sparkles style={{ width: '28px', height: '28px' }} />
            </div>
          </div>
          
          <div style={styles.logoBox}>
            <div style={styles.logoIconCircle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#ff763b" stroke="#3d7cff" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#a0aec0' }}>nawh.ai</span>
          </div>
        </div>

        {/* كروت الإحصائيات الثلاثة العلوية */}
        <div style={styles.statsGrid}>
          {/* الكارت الأول */}
          <div style={styles.statCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#a0aec0', fontWeight: '500' }}>إجمالي المستخدمين النشطين</p>
              <div style={{ ...styles.iconWrapper, color: '#3d7cff' }}>
                <TrendingUp style={{ width: '20px', height: '20px', transform: 'rotate(45deg)' }} />
              </div>
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '30px', fontWeight: 'bold' }}>1,248</h3>
              <span style={{ fontSize: '12px', color: '#48bb78', fontWeight: '500' }}>+12% this week</span>
            </div>
          </div>

          {/* الكارت الثاني */}
          <div style={styles.statCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#a0aec0', fontWeight: '500' }}>السجلات والبيانات المرفوعة</p>
              <div style={{ ...styles.iconWrapper, color: '#3d7cff' }}>
                <TrendingUp style={{ width: '20px', height: '20px', transform: 'rotate(-45deg)' }} />
              </div>
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '30px', fontWeight: 'bold' }}>84,512</h3>
              <span style={{ fontSize: '12px', color: '#48bb78', fontWeight: '500' }}>+5.4% Synced</span>
            </div>
          </div>

          {/* الكارت الثالث */}
          <div style={styles.statCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#a0aec0', fontWeight: '500' }}>حجم سعة قاعدة البيانات</p>
              <div style={{ ...styles.iconWrapper, color: '#ff763b' }}>
                <Database style={{ width: '20px', height: '20px' }} />
              </div>
            </div>
            <div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '30px', fontWeight: 'bold' }}>14.2 GB</h3>
              <div style={{ width: '100%', backgroundColor: '#2d3748', height: '6px', borderRadius: '999px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ background: 'linear-gradient(90deg, #6e00ff, #ff00de)', height: '100%', width: '28%', borderRadius: '999px' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#a0aec0' }}>
                <span>28% used</span>
                <span>of 50GB</span>
              </div>
            </div>
          </div>
        </div>

        {/* تخطيط الأقسام السفلية الرئيسية */}
        <div style={styles.mainLayout}>
          
          {/* اليمين: منصة نشر وإدارة المحتوى */}
          <div style={styles.rightSection}>
            <div style={styles.creatorHeader}>
              <ArrowLeftRight style={{ width: '16px', height: '16px', color: '#ffffff', transform: 'rotate(90deg)' }} />
              <h2 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>منصة نشر وإدارة المحتوى الذكي</h2>
            </div>

            <div style={styles.creatorBody}>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#1a202c' }}>نوع المحتوى المُراد نشره</h4>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#718096' }}>نوع المحتوى المُراد نشره</p>
              </div>

              {/* أزرار الاختيار الخمسة */}
              <div style={styles.typeSelectorGrid}>
                <button type="button" onClick={() => setActiveType('Files')} style={styles.typeBtn(activeType === 'Files')}>
                  <FileText style={{ width: '20px', height: '20px', color: '#4299e1', marginBottom: '6px' }} />
                  <span style={{ fontSize: '11px' }}>Files</span>
                </button>
                <button type="button" onClick={() => setActiveType('Image')} style={styles.typeBtn(activeType === 'Image')}>
                  <ImageIcon style={{ width: '20px', height: '20px', color: '#805ad5', marginBottom: '6px' }} />
                  <span style={{ fontSize: '11px' }}>Image</span>
                </button>
                <button type="button" onClick={() => setActiveType('Video')} style={styles.typeBtn(activeType === 'Video')}>
                  <Video style={{ width: '20px', height: '20px', color: '#3182ce', marginBottom: '6px' }} />
                  <span style={{ fontSize: '11px' }}>Video</span>
                </button>
                <button type="button" onClick={() => setActiveType('Mixed')} style={styles.typeBtn(activeType === 'Mixed')}>
                  <Layers style={{ width: '20px', height: '20px', color: '#dd6b20', marginBottom: '6px' }} />
                  <span style={{ fontSize: '11px' }}>Mixed</span>
                </button>
                <button type="button" onClick={() => setActiveType('URL')} style={styles.typeBtn(activeType === 'URL')}>
                  <LinkIcon style={{ width: '20px', height: '20px', color: '#319795', marginBottom: '6px' }} />
                  <span style={{ fontSize: '11px' }}>URL</span>
                </button>
              </div>

              {/* حقول المدخلات */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="text" placeholder="اكتب عنوان المحتوى أو المقالة هنا..." style={styles.inputStyle} />
                <input type="text" placeholder="أدخل رابط الصورة أو الفيديو (URL)..." style={styles.inputStyle} />
                <textarea rows="3" placeholder="اكتب تفاصيل الموضوع أو النص السردي هنا..." style={{ ...styles.inputStyle, resize: 'none' }}></textarea>
              </div>

              {/* النقاط السفلية (Pagination Dots) */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', padding: '4px 0' }}>
                <span style={{ width: '24px', height: '6px', borderRadius: '999px', backgroundColor: '#4a5568' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#cbd5e0' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#cbd5e0' }}></span>
              </div>

              {/* شريط رسالة الخطأ */}
              <div style={styles.errorBox}>
                <span style={{ cursor: 'pointer', opacity: 0.6 }}>✕</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>فشل إرسال البيانات، تحقق من اتصال الشبكة والمتغيرات.</span>
                  <AlertCircle style={{ width: '16px', height: '16px', color: '#e53e3e' }} />
                </div>
              </div>

              <button type="button" style={styles.submitBtn}>التالي</button>
            </div>
          </div>

          {/* اليسار: كروت الإجراءات والنشاطات الأخيرة المدمجة بالكامل */}
          <div style={styles.leftSection}>
            
            {/* كارت العمليات السريعة */}
            <div style={styles.lightCard}>
              <div style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '10px', fontWeight: 'bold', trackingWith: '1px', color: '#718096', display: 'block', textTransform: 'uppercase' }}>Quick Actions</span>
                <h3 style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: 'bold', color: '#2d3748' }}>الإجراءات والعمليات السريعة</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button type="button" style={{ width: '100%', background: 'linear-gradient(90deg, #3d7cff, #ff763b)', color: '#ffffff', border: 'none', fontWeight: '600', padding: '12px', borderRadius: '12px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Upload style={{ width: '16px', height: '16px' }} />
                  Upload File
                </button>
                <button type="button" style={{ width: '100%', backgroundColor: '#edf2f7', border: '1px solid #cbd5e0', color: '#4a5568', fontWeight: '600', padding: '12px', borderRadius: '12px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <RefreshCw style={{ width: '16px', height: '16px' }} />
                  Refresh Server
                </button>
              </div>
            </div>

            {/* كارت الأنشطة الأخيرة */}
            <div style={styles.lightCard}>
              <div style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '10px', fontWeight: 'bold', trackingWith: '1px', color: '#718096', display: 'block', textTransform: 'uppercase' }}>Recent Activity</span>
                <h3 style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: 'bold', color: '#2d3748' }}>آخر النشاطات الحية والنظام</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #edf2f7', paddingBottom: '10px' }}>
                  <span style={{ fontSize: '11px', color: '#718096', fontFamily: 'monospace' }}>13:53 PM</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#2d3748' }}>APK Build Success</span>
                    <CheckCircle2 style={{ width: '16px', height: '16px', color: '#48bb78' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#718096', fontFamily: 'monospace' }}>13:53 PM</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#2d3748' }}>Config Updated</span>
                    <AlertCircle style={{ width: '16px', height: '16px', color: '#3182ce' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* زر المساعدة العائم الثابت أسفل اليسار */}
      <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 50 }}>
        <button type="button" style={{ width: '40px', height: '40px', backgroundColor: '#161b26', border: '1px solid #222938', color: '#a0aec0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifycontent: 'center', cursor: 'pointer', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HelpCircle style={{ width: '20px', height: '20px' }} />
        </button>
      </div>
    </div>
  );
}

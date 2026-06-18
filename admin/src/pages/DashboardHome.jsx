import React, { useState, useRef, useEffect } from 'react';
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
  ArrowLeftRight,
  Trash2
} from 'lucide-react';

// استيراد ملف الخدمة الصحيح والمطابق للدوال المبرمجة
import apiService from '../services/apiService';

export default function Dashboard() {
  const [activeType, setActiveType] = useState('Image');
  
  // حالات إدارة البيانات والمدخلات (Form States)
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  
  // قائمة المنشورات المخزنة لعرضها في خانة الحذف
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // حالات النظام (System Status UI)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef(null);

  // دالة جلب المنشورات تحديثاً للوحة والجدول
  const fetchAllPosts = async () => {
    setIsFetching(true);
    try {
      const response = await apiService.getDynamicDataService();
      if (response && response.success) {
        setPosts(response.data || []);
      }
    } catch (err) {
      console.error("خطأ أثناء جلب المنشورات للجدول:", err);
    } finally {
      setIsFetching(false);
    }
  };

  // جلب البيانات عند تحميل الصفحة لأول مرة
  useEffect(() => {
    fetchAllPosts();
  }, []);

  // دالة التعامل مع اختيار ملف من الجهاز
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // دالة إرسال وتمرير البيانات للـ API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setIsSuccess(false);

    try {
      // ضبط الـ payload بدقة ليتوافق مع الحقول النصية لجدول الـ posts في Neon
      const payload = {
        type: activeType,
        title: title,
        url: url || null,
        description: description || null,
        file_path: selectedFile ? selectedFile.name : null // محاكاة مسار الملف نصياً
      };

      // استدعاء الدالة الحقيقية والمطابقة لملف apiService المحدث
      const response = await apiService.saveDynamicDataService(payload); 
      
      if (response.success) {
        setIsSuccess(true);
        setTitle('');
        setUrl('');
        setDescription('');
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        
        // تحديث جدول الحذف فوراً بعد الإضافة الناجحة
        fetchAllPosts();
      }

    } catch (error) {
      console.error("Error saving dynamic content:", error);
      setErrorMessage(error.message || "فشل إرسال البيانات، تحقق من اتصال الشبكة والمتغيرات.");
    } finally {
      setIsLoading(false);
    }
  };

  // دالة التعامل مع حذف عنصر محدد من الجدول
  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من رغبتك في حذف هذا المنشور نهائياً؟')) return;

    try {
      const response = await apiService.deleteDynamicDataService(id);
      if (response.success) {
        alert('تم حذف السجل بنجاح.');
        fetchAllPosts(); // إعادة جلب البيانات لتحديث الجدول
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      alert('فشل حذف المنشور: ' + error.message);
    }
  };

  // كائنات الستايل المدمجة الأصلية متضمنة إضافات قسم الحذف الهيكلي الجديد
  const styles = {
    container: {
      direction: 'rtl',
      minHeight: '100vh',
      backgroundColor: '#0e111a',
      color: '#ffffff',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflowX: 'hidden',
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
      alignItems: 'center',
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
    successBox: {
      backgroundColor: '#f0fff4',
      border: '1px solid #c6f6d5',
      color: '#22543d',
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
      boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
      opacity: isLoading ? 0.7 : 1,
      transition: 'opacity 0.2s'
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
    },
    // ستايل لوحة التحكم الجديدة المخصصة للحذف والتعديل المباشر
    managementSection: {
      backgroundColor: '#161b26',
      border: '1px solid #222938',
      borderRadius: '16px',
      padding: '20px',
      marginTop: '12px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '12px',
      fontSize: '13px',
      textAlign: 'right'
    },
    th: {
      borderBottom: '2px solid #222938',
      padding: '12px 8px',
      color: '#a0aec0',
      fontWeight: '600'
    },
    td: {
      borderBottom: '1px solid #222938',
      padding: '12px 8px',
      color: '#ffffff'
    }
  };

  return (
    <div style={styles.container}>
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
          <form onSubmit={handleSubmit} style={styles.rightSection}>
            <div style={styles.creatorHeader}>
              <ArrowLeftRight style={{ width: '16px', height: '16px', color: '#ffffff', transform: 'rotate(90deg)' }} />
              <h2 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>منصة نشر وإدارة المحتوى الذكي</h2>
            </div>

            <div style={styles.creatorBody}>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#1a202c' }}>نوع المحتوى المُراد نشره</h4>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#718096' }}>اختر التبويب واكتب البيانات ليتم معالجتها وحفظها فورياً</p>
              </div>

              {/* أزرار الاختيار الخمسة */}
              <div style={styles.typeSelectorGrid}>
                <button type="button" onClick={() => { setActiveType('Files'); setErrorMessage(''); }} style={styles.typeBtn(activeType === 'Files')}>
                  <FileText style={{ width: '20px', height: '20px', color: '#4299e1', marginBottom: '6px' }} />
                  <span style={{ fontSize: '11px' }}>Files</span>
                </button>
                <button type="button" onClick={() => { setActiveType('Image'); setErrorMessage(''); }} style={styles.typeBtn(activeType === 'Image')}>
                  <ImageIcon style={{ width: '20px', height: '20px', color: '#805ad5', marginBottom: '6px' }} />
                  <span style={{ fontSize: '11px' }}>Image</span>
                </button>
                <button type="button" onClick={() => { setActiveType('Video'); setErrorMessage(''); }} style={styles.typeBtn(activeType === 'Video')}>
                  <Video style={{ width: '20px', height: '20px', color: '#3182ce', marginBottom: '6px' }} />
                  <span style={{ fontSize: '11px' }}>Video</span>
                </button>
                <button type="button" onClick={() => { setActiveType('Mixed'); setErrorMessage(''); }} style={styles.typeBtn(activeType === 'Mixed')}>
                  <Layers style={{ width: '20px', height: '20px', color: '#dd6b20', marginBottom: '6px' }} />
                  <span style={{ fontSize: '11px' }}>Mixed</span>
                </button>
                <button type="button" onClick={() => { setActiveType('URL'); setErrorMessage(''); }} style={styles.typeBtn(activeType === 'URL')}>
                  <LinkIcon style={{ width: '20px', height: '20px', color: '#319795', marginBottom: '6px' }} />
                  <span style={{ fontSize: '11px' }}>URL</span>
                </button>
              </div>

              {/* حقول المدخلات الذكية والمتغيرة حسب اختيار الـ Tab */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input 
                  type="text" 
                  placeholder={activeType === 'Files' ? "اكتب اسم الملف أو عنوان المرفق..." : "اكتب عنوان المحتوى أو المقالة هنا..."} 
                  style={styles.inputStyle} 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                
                {activeType !== 'URL' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4a5568' }}>رفع ملف حقيقي من الجهاز (اختياري):</label>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={styles.inputStyle}
                      accept={activeType === 'Image' ? "image/*" : activeType === 'Video' ? "video/*" : "*"}
                    />
                  </div>
                )}

                {(activeType === 'URL' || activeType === 'Image' || activeType === 'Video' || activeType === 'Mixed') && (
                  <input 
                    type="url" 
                    placeholder="أدخل رابط خارجي احتياطي أو أساسي للميديا (URL)..." 
                    style={styles.inputStyle} 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                )}

                <textarea 
                  rows="3" 
                  placeholder="اكتب تفاصيل الموضوع، المقال، أو الوصف السردي هنا..." 
                  style={{ ...styles.inputStyle, resize: 'none' }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              {/* شريط رسالة النجاح */}
              {isSuccess && (
                <div style={styles.successBox}>
                  <span style={{ cursor: 'pointer', opacity: 0.6 }} onClick={() => setIsSuccess(false)}>✕</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>تم حفظ ونشر البيانات بنجاح في السيرفر المركزي الحقيقي!</span>
                    <CheckCircle2 style={{ width: '16px', height: '16px', color: '#38a169' }} />
                  </div>
                </div>
              )}

              {/* شريط رسالة الخطأ */}
              {errorMessage && (
                <div style={styles.errorBox}>
                  <span style={{ cursor: 'pointer', opacity: 0.6 }} onClick={() => setErrorMessage('')}>✕</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{errorMessage}</span>
                    <AlertCircle style={{ width: '16px', height: '16px', color: '#e53e3e' }} />
                  </div>
                </div>
              )}

              <button type="submit" disabled={isLoading} style={styles.submitBtn}>
                {isLoading ? 'جاري معالجة وحفظ البيانات...' : 'نشر وحفظ الآن'}
              </button>
            </div>
          </form>

          {/* اليسار: كروت الإجراءات والنشاطات الأخيرة المدمجة بالكامل */}
          <div style={styles.leftSection}>
            <div style={styles.lightCard}>
              <div style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#718096', display: 'block', textTransform: 'uppercase' }}>Quick Actions</span>
                <h3 style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: 'bold', color: '#2d3748' }}>الإجراءات والعمليات السريعة</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  style={{ width: '100%', background: 'linear-gradient(90deg, #3d7cff, #ff763b)', color: '#ffffff', border: 'none', fontWeight: '600', padding: '12px', borderRadius: '12px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Upload style={{ width: '16px', height: '16px' }} />
                  Upload File Direct
                </button>
                <button type="button" onClick={fetchAllPosts} style={{ width: '100%', backgroundColor: '#edf2f7', border: '1px solid #cbd5e0', color: '#4a5568', fontWeight: '600', padding: '12px', borderRadius: '12px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <RefreshCw style={{ width: '16px', height: '16px' }} />
                  Refresh Server
                </button>
              </div>
            </div>

            <div style={styles.lightCard}>
              <div style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#718096', display: 'block', textTransform: 'uppercase' }}>Recent Activity</span>
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

        {/* القسم المضاف حديثاً: خانة وجدول إدارة وحذف المنشورات المتصل بقاعدة البيانات */}
        <div style={styles.managementSection}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', borderBottom: '1px solid #222938', paddingBottom: '8px' }}>
            <Trash2 style={{ width: '18px', height: '18px', color: '#e53e3e' }} />
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>لوحة التحكم وإلغاء نشر العناصر (حذف البيانات حياً)</h2>
          </div>

          {isFetching ? (
            <p style={{ color: '#a0aec0', fontSize: '13px' }}>جاري تحديث قائمة البيانات الحالية...</p>
          ) : posts.length === 0 ? (
            <p style={{ color: '#a0aec0', fontSize: '13px' }}>لا توجد منشورات متاحة حالياً داخل قاعدة البيانات.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>المعرف (ID)</th>
                    <th style={styles.th}>النوع</th>
                    <th style={styles.th}>العنوان الرئيسي</th>
                    <th style={styles.th}>الوصف والمحتوى</th>
                    <th style={styles.th} style={{ textAlign: 'center' }}>إجراءات الإزالة</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td style={styles.td} style={{ fontFamily: 'monospace', color: '#a0aec0' }}>{post.id}</td>
                      <td style={styles.td}><span style={{ backgroundColor: '#2d3748', padding: '4px 8px', borderRadius: '6px', fontSize: '11px' }}>{post.type}</span></td>
                      <td style={styles.td} style={{ fontWeight: '600' }}>{post.title}</td>
                      <td style={styles.td}>{post.description ? post.description.substring(0, 50) + '...' : '---'}</td>
                      <td style={styles.td} style={{ textAlign: 'center' }}>
                        <button 
                          type="button"
                          onClick={() => handleDelete(post.id)}
                          style={{ backgroundColor: 'transparent', border: 'none', color: '#e53e3e', cursor: 'pointer', transition: 'color 0.2s' }}
                          title="حذف نهائي"
                        >
                          <Trash2 style={{ width: '18px', height: '18px' }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

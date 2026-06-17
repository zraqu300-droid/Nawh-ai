import React from 'react';
import styled from 'styled-components';
// ستحتاج إلى تثبيت هذه المكتبة:
// npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faImage, faPlayCircle, faLink, faExchangeAlt, faExclamationTriangle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
// ستحتاج إلى تثبيت هذه المكتبة لمؤشر التقدم:
// npm install react-circular-progressbar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// --- الأنماط المشتركة والخاصة ---

const Container = styled.div`
  background-color: #1a1e36; /* لون خلفية داكن مشابه للصورة */
  background-image: radial-gradient(circle at 10% 10%, #6e00ff 0%, transparent 40%),
                    radial-gradient(circle at 90% 90%, #ff00de 0%, transparent 40%);
  color: #fff;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* أو أي خط عربي مناسب */
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderBanner = styled.div`
  width: 100%;
  max-width: 1200px;
  background: linear-gradient(90deg, #3d7cff 0%, #ff763b 100%);
  border-radius: 12px;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 2.2rem;
  font-weight: bold;
`;

const HeaderSubtitle = styled.p`
  margin: 5px 0 0 0;
  opacity: 0.9;
  font-size: 1.1rem;
`;

const StarIcon = styled.div`
  font-size: 1.8rem;
  color: #a8dfff;
`;

const LogoSection = styled.div`
  background-color: #2a314b;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
`;

const LogoText = styled.div`
  font-size: 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background-color: #2a314b;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StatTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1rem;
  opacity: 0.8;
  color: #fff;
`;

const StatValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
`;

const StatIconBox = styled.div`
  background: linear-gradient(135deg, #4f7fff 0%, #15d6c8 100%);
  border-radius: 8px;
  padding: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.2rem;
`;

const StatNumber = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
`;

const StatGains = styled.span`
  font-size: 0.9rem;
  color: ${props => props.color || '#66ff7c'};
`;

const ContentCreatorSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const CreatorMainCard = styled.div`
  background-color: #2a314b;
  border-radius: 12px;
  overflow: hidden;
`;

const CreatorHeader = styled.div`
  background: linear-gradient(90deg, #3d7cff 0%, #ff763b 100%);
  padding: 15px 30px;
  color: #fff;
  font-weight: bold;
  font-size: 1.1rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ShareIconWrapper = styled.div`
  font-size: 1rem;
  margin-left: 10px;
`;

const CreatorBody = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TypeSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const TypeButton = styled.div`
  flex: 1;
  background-color: ${props => props.active ? '#4a5682' : '#333c5e'};
  color: #fff;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  border: ${props => props.active ? '1px solid #7138e6' : '1px solid transparent'};
`;

const Input = styled.input`
  width: 100%;
  background-color: #f1f3f6;
  border: 1px solid #e0e6ed;
  border-radius: 6px;
  padding: 12px 15px;
  color: #1a1e36;
  font-size: 1rem;
  box-sizing: border-box;
  &::placeholder {
    color: #9da3ba;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  background-color: #f1f3f6;
  border: 1px solid #e0e6ed;
  border-radius: 6px;
  padding: 12px 15px;
  color: #1a1e36;
  font-size: 1rem;
  box-sizing: border-box;
  min-height: 100px;
  resize: vertical;
  &::placeholder {
    color: #9da3ba;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #3d7cff 0%, #ff763b 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
`;

const QuickActionsCard = styled.div`
  background-color: #f1f3f6; /* خلفية فاتحة */
  border-radius: 12px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: #1a1e36;
`;

const QuickActionButton = styled.button`
  background: ${props => props.primary ? 'linear-gradient(135deg, #3d7cff 0%, #ff763b 100%)' : '#e0e6ed'};
  color: ${props => props.primary ? '#fff' : '#1a1e36'};
  border: ${props => props.primary ? 'none' : '1px solid #d0d7de'};
  border-radius: 6px;
  padding: 10px;
  font-size: 1rem;
  font-weight: ${props => props.primary ? 'bold' : 'normal'};
  cursor: pointer;
`;

const RecentActivityCard = styled.div`
  background-color: #f1f3f6;
  border-radius: 12px;
  padding: 25px;
  color: #1a1e36;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e0e6ed;
  padding: 15px 0;
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ActivityStatus = styled.div`
  color: ${props => props.color || '#1a1e36'};
`;

const ErrorBanner = styled.div`
  background-color: #ffcccc;
  border: 1px solid #ff9999;
  border-radius: 8px;
  padding: 15px;
  color: #cc0000;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const DatabaseSizeChart = styled.div`
  width: 80px;
  height: 80px;
`;

const PaginatorDots = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  margin-top: 10px;
`;

const PaginatorDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#fff' : '#4a5682'};
`;

const HelpButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: #2a314b;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
`;

// --- مكوّن التطبيق الرئيسي ---

const App = () => {
  return (
    <Container>
      {/* 1. شعار الواجهة والترحيب */}
      <HeaderBanner>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <StarIcon><FontAwesomeIcon icon={faPlayCircle} /></StarIcon>
          <HeaderText>
            <HeaderTitle>لوحة التحكم المركزية</HeaderTitle>
            <HeaderSubtitle>مرحباً بك في قلب نظام nawh.ai النبضي</HeaderSubtitle>
          </HeaderText>
        </div>
        <LogoSection>
          <LogoImage src="nawhai_logo_path.png" alt="logo" /> {/* ضع مسار الشعار هنا */}
          <LogoText>nawh.ai</LogoText>
        </LogoSection>
      </HeaderBanner>

      {/* 2. بطاقات الإحصائيات */}
      <StatsGrid>
        <StatCard>
          <StatTitle>إجمالي المستخدمين النشطين</StatTitle>
          <StatValueContainer>
            <StatIconBox><FontAwesomeIcon icon={faFile} /></StatIconBox>
            <StatNumber>1,248</StatNumber>
          </StatValueContainer>
          <StatGains>+12% this week</StatGains>
        </StatCard>
        <StatCard>
          <StatTitle>السجلات والبيانات المرفوعة</StatTitle>
          <StatValueContainer>
            <StatIconBox><FontAwesomeIcon icon={faPlayCircle} /></StatIconBox>
            <StatNumber>84,512</StatNumber>
          </StatValueContainer>
          <StatGains>+5.4% Sycned</StatGains>
        </StatCard>
        <StatCard style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <StatTitle>حجم سعة قاعدة البيانات</StatTitle>
            <StatNumber>14.2 GB</StatNumber>
            <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.7, marginTop: '10px', color: '#fff' }}>
              <span>28% used</span>
              <span>of 50GB</span>
            </div>
          </div>
          <DatabaseSizeChart>
            <CircularProgressbar
              value={28}
              strokeWidth={15}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: 'butt',
                pathColor: '#533bfe',
                trailColor: '#e0e6ed33',
              })}
            />
          </DatabaseSizeChart>
        </StatCard>
      </StatsGrid>

      {/* 3. منطقة منشئ المحتوى والأنشطة الأخيرة */}
      <ContentCreatorSection>
        {/* منشئ المحتوى */}
        <CreatorMainCard>
          <CreatorHeader>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ShareIconWrapper><FontAwesomeIcon icon={faExchangeAlt} rotation={90} /></ShareIconWrapper>
              <span>منصة نشر وإدارة المحتوى الذكي</span>
            </div>
          </CreatorHeader>
          <CreatorBody>
            <div style={{textAlign: 'center', marginBottom: '15px'}}>
              <HeaderTitle style={{fontSize: '1.2rem'}}>نوع المحتوى المُراد نشره</HeaderTitle>
              <HeaderSubtitle style={{fontSize: '1rem', color: '#fff', opacity: 1}}>نوع المحتوى المُراد نشره</HeaderSubtitle>
            </div>
            <TypeSelector>
              <TypeButton>
                <FontAwesomeIcon icon={faFile} style={{fontSize: '1.5rem', color: '#15d6c8'}} />
                <span>Files</span>
              </TypeButton>
              <TypeButton active>
                <FontAwesomeIcon icon={faImage} style={{fontSize: '1.5rem', color: '#7138e6'}} />
                <span>Image</span>
              </TypeButton>
              <TypeButton>
                <FontAwesomeIcon icon={faPlayCircle} style={{fontSize: '1.5rem', color: '#3d7cff'}} />
                <span>Video</span>
              </TypeButton>
              <TypeButton>
                <FontAwesomeIcon icon={faExchangeAlt} style={{fontSize: '1.5rem', color: '#ff763b'}} />
                <span>Mixed</span>
              </TypeButton>
              <TypeButton>
                <FontAwesomeIcon icon={faLink} style={{fontSize: '1.5rem', color: '#b6f8ff'}} />
                <span>URL</span>
              </TypeButton>
            </TypeSelector>
            <Input type="text" placeholder="اكتب عنوان المحتوى أو المقالة هنا..." />
            <Input type="text" placeholder="أدخل رابط الصورة أو الفيديو (URL)..." />
            <Textarea placeholder="اكتب تفاصيل الموضوع أو النص السردي هنا..." />
            <PaginatorDots>
              <PaginatorDot active />
              <PaginatorDot />
              <PaginatorDot />
            </PaginatorDots>
            <ErrorBanner>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <span>&times; فشل إرسال البيانات، تحقق من اتصال الشبكة والمتغيرات.</span>
            </ErrorBanner>
            <ActionButton>التالي</ActionButton>
          </CreatorBody>
        </CreatorMainCard>

        {/* الإجراءات السريعة والأنشطة الأخيرة */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <QuickActionsCard>
            <h3 style={{ margin: 0, fontSize: '1rem', textAlign: 'center', borderBottom: '1px solid #e0e6ed', paddingBottom: '10px' }}>Quick Actionsتفضل، هذا هو كود React لإنشاء صفحة تشبه اللوحة التي قدمتها في الصورة:

```javascript
import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>لوحة التحكم المركزية</h1>
          <p>مرحباً بك في قلب نظام nowh.ol النبضي</p>
          <div className="header-right">
            <span>4 nowh.ol</span>
          </div>
        </div>
        <div className="top-tiles">
          <div className="tile">
            <h2>إجمالي المستخدمين النشطين</h2>
            <p>1,248</p>
            <p>+12% this week</p>
          </div>
          <div className="tile">
            <h2>السجلات والبيانات المرفوعة</h2>
            <p>84,512</p>
            <p>+5.4% Synced</p>
          </div>
          <div className="tile">
            <h2>حجم سعة قاعدة البيانات</h2>
            <p>14.2 GB</p>
            <p>28% used of 50GB</p>
          </div>
        </div>
        <div className="middle-section">
          <div className="content-creation">
            <h3>منصة نشر وإدارة المحتوى الذكي</h3>
            <p>نوع المحتوى المُراد نشره</p>
            <div className="content-types">
              <button>Files</button>
              <button>Image</button>
              <button>Video</button>
              <button>Mixed</button>
              <button>URL</button>
            </div>
            <input type="text" placeholder="اكتب عنوان المحتوى أو المقال هنا..." />
            <input type="text" placeholder="ادخل رابط الصورة أو الفيديو (URL)..." />
            <textarea placeholder="اكتب تفاصيل الموضوع أو النص السردي هنا..."></textarea>
            <button>التالي</button>
          </div>
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <h3>الإجراءات والعمليات السريعة</h3>
            <button>Upload File</button>
            <button>Refresh Server</button>
          </div>
        </div>
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <h3>آخر النشاطات الحية والنظام</h3>
          <ul>
            <li>APK Build Success 13:53 PM</li>
            <li>Config Updated 13:53 PM</li>
          </ul>
        </div>
        <div className="help">
          <button>?</button>
        </div>
      </div>
    );
  }
}

export default Dashboard;

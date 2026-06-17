import React, { useState } from 'react';
import styled from 'styled-components';
// تأكد من تثبيت الـ Icons عبر: npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFile, faImage, faVideo, faLink, faExchangeAlt, 
  faExclamationTriangle, faQuestionCircle, faSync, faUpload, faCheckCircle, faInfoCircle 
} from '@fortawesome/free-solid-svg-icons';

// --- الأنماط والتصميم (Styled Components) ---

const Container = styled.div`
  background-color: #0e111a; 
  background-image: radial-gradient(circle at 5% 20%, rgba(110, 0, 255, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 95% 80%, rgba(255, 0, 222, 0.1) 0%, transparent 50%);
  color: #fff;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 30px;
  box-sizing: border-box;
  direction: rtl; /* لدعم الواجهة العربية بشكل صحيح */
`;

const MainGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HeaderBanner = styled.div`
  width: 100%;
  background: linear-gradient(90deg, #1d52d4 0%, #ff5722 100%);
  border-radius: 14px;
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
`;

const HeaderSubtitle = styled.p`
  margin: 0;
  opacity: 0.85;
  font-size: 0.95rem;
`;

const LogoSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const LogoText = styled.span`
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background-color: #161b26;
  border: 1px solid #222938;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const StatTitle = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  color: #a0aec0;
  font-weight: 500;
`;

const StatIconBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3d7cff;
`;

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
`;

const StatGains = styled.span`
  font-size: 0.85rem;
  color: ${props => props.up ? '#48bb78' : '#a0aec0'};
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 6px;
  background-color: #2d3748;
  border-radius: 3px;
  margin-top: 10px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: 28%;
  height: 100%;
  background: linear-gradient(90deg, #6e00ff, #ff00de);
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CreatorCard = styled.div`
  background-color: #161b26;
  border: 1px solid #222938;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CreatorHeader = styled.div`
  background: linear-gradient(90deg, #2b3595 0%, #d44b1d 100%);
  padding: 12px 20px;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CreatorBody = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SectionCentering = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const SectionMainTitle = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const SectionSubTitle = styled.p`
  margin: 4px 0 0 0;
  font-size: 0.9rem;
  color: #a0aec0;
`;

const TypeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: 10px;
  direction: ltr; /* للحفاظ على ترتيب الأزرار الإنجليزية كما بالصورة */
`;

const TypeButton = styled.button`
  background-color: ${props => props.active ? '#1e2538' : '#111520'};
  color: #fff;
  border: 1px solid ${props => props.active ? '#533bfe' : '#222938'};
  border-radius: 10px;
  padding: 12px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #533bfe;
  }
`;

const IconWrapper = styled.div`
  font-size: 1.2rem;
  color: ${props => props.iconColor || '#fff'};
`;

const Input = styled.input`
  width: 100%;
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 15px;
  color: #1a202c;
  font-size: 0.95rem;
  box-sizing: border-box;
  outline: none;
  text-align: right;

  &::placeholder {
    color: #a0aec0;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 15px;
  color: #1a202c;
  font-size: 0.95rem;
  box-sizing: border-box;
  min-height: 100px;
  resize: none;
  outline: none;
  text-align: right;

  &::placeholder {
    color: #a0aec0;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  margin: 5px 0;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#fff' : '#4a5568'};
`;

const ErrorBanner = styled.div`
  background-color: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 8px;
  padding: 12px 15px;
  color: #c53030;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #1d52d4 0%, #ff5722 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

const SidebarLogs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LightCard = styled.div`
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  color: #1a202c;
`;

const LightCardTitleBlock = styled.div`
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 12px;
  margin-bottom: 15px;
`;

const LightCardTitleEN = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  margin-bottom: 2px;
`;

const LightCardTitleAR = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #2d3748;
`;

const QuickActionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PrimaryActionButton = styled.button`
  background: linear-gradient(90deg, #3d7cff 0%, #ff763b 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const SecondaryActionButton = styled.button`
  background-color: #edf2f7;
  color: #4a5568;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  padding: 12px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #e2e8f0;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #edf2f7;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3748;
`;

const ActivityTime = styled.span`
  font-size: 0.8rem;
  color: #718096;
`;

const FloatingHelp = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: #161b26;
  border: 1px solid #222938;
  color: #a0aec0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);

  &:hover {
    color: #fff;
  }
`;

// --- المكون الرئيسي للملف ---

export default function DashboardHome() {
  const [activeType, setActiveType] = useState('Image');

  return (
    <Container>
      <MainGrid>
        
        {/* 1. البانر العلوي */}
        <HeaderBanner>
          <HeaderText>
            <HeaderTitle>لوحة التحكم المركزية</HeaderTitle>
            <HeaderSubtitle>مرحباً بك في قلب نظام nawh.ai النبضي</HeaderSubtitle>
          </HeaderText>
          <LogoSection>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#ff763b" stroke="#3d7cff" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            <LogoText>nawh.ai</LogoText>
          </LogoSection>
        </HeaderBanner>

        {/* 2. كروت الإحصائيات الثلاثة */}
        <StatsGrid>
          <StatCard>
            <StatHeader>
              <StatTitle>إجمالي المستخدمين النشطين</StatTitle>
              <StatIconBox>
                <FontAwesomeIcon icon={faExchangeAlt} style={{transform: 'rotate(45deg)'}} />
              </StatIconBox>
            </StatHeader>
            <div>
              <StatNumber>1,248</StatNumber>
              <StatGains up>+12% this week</StatGains>
            </div>
          </StatCard>

          <StatCard>
            <StatHeader>
              <StatTitle>السجلات والبيانات المرفوعة</StatTitle>
              <StatIconBox>
                <FontAwesomeIcon icon={faExchangeAlt} style={{transform: 'rotate(-45deg)'}} />
              </StatIconBox>
            </StatHeader>
            <div>
              <StatNumber>84,512</StatNumber>
              <StatGains up>+5.4% Synced</StatGains>
            </div>
          </StatCard>

          <StatCard>
            <StatHeader>
              <StatTitle>حجم سعة قاعدة البيانات</StatTitle>
              <StatIconBox style={{color: '#ff763b'}}>
                <FontAwesomeIcon icon={faFile} />
              </StatIconBox>
            </StatHeader>
            <div>
              <StatNumber>14.2 GB</StatNumber>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#a0aec0'}}>
                <span>28% used</span>
                <span>of 50GB</span>
              </div>
              <ProgressTrack>
                <ProgressFill />
              </ProgressTrack>
            </div>
          </StatCard>
        </StatsGrid>

        {/* 3. القسم السفلي المنقسم */}
        <ContentLayout>
          
          {/* اليمين: منصة النشر */}
          <CreatorCard>
            <CreatorHeader>
              <FontAwesomeIcon icon={faExchangeAlt} style={{transform: 'rotate(90deg)'}} />
              <span>منصة نشر وإدارة المحتوى الذكي</span>
            </CreatorHeader>
            
            <CreatorBody>
              <SectionCentering>
                <SectionMainTitle>نوع المحتوى المُراد نشره</SectionMainTitle>
                <SectionSubTitle>نوع المحتوى المُراد نشره</SectionSubTitle>
              </SectionCentering>

              <TypeSelector>
                <TypeButton active={activeType === 'Files'} onClick={() => setActiveType('Files')}>
                  <IconWrapper iconColor="#4299e1"><FontAwesomeIcon icon={faFile} /></IconWrapper>
                  <span>Files</span>
                </TypeButton>
                <TypeButton active={activeType === 'Image'} onClick={() => setActiveType('Image')}>
                  <IconWrapper iconColor="#805ad5"><FontAwesomeIcon icon={faImage} /></IconWrapper>
                  <span>Image</span>
                </TypeButton>
                <TypeButton active={activeType === 'Video'} onClick={() => setActiveType('Video')}>
                  <IconWrapper iconColor="#3182ce"><FontAwesomeIcon icon={faVideo} /></IconWrapper>
                  <span>Video</span>
                </TypeButton>
                <TypeButton active={activeType === 'Mixed'} onClick={() => setActiveType('Mixed')}>
                  <IconWrapper iconColor="#dd6b20"><FontAwesomeIcon icon={faExchangeAlt} /></IconWrapper>
                  <span>Mixed</span>
                </TypeButton>
                <TypeButton active={activeType === 'URL'} onClick={() => setActiveType('URL')}>
                  <IconWrapper iconColor="#319795"><FontAwesomeIcon icon={faLink} /></IconWrapper>
                  <span>URL</span>
                </TypeButton>
              </TypeSelector>

              <Input type="text" placeholder="اكتب عنوان المحتوى أو المقالة هنا..." />
              <Input type="text" placeholder="أدخل رابط الصورة أو الفيديو (URL)..." />
              <Textarea placeholder="اكتب تفاصيل الموضوع أو النص السردي هنا..." />

              <DotsContainer>
                <Dot active />
                <Dot />
                <Dot />
              </DotsContainer>

              <ErrorBanner>
                <FontAwesomeIcon icon={faExclamationTriangle} style={{fontSize: '1.1rem'}} />
                <span>فشل إرسال البيانات، تحقق من اتصال الشبكة والمتغيرات.</span>
              </ErrorBanner>

              <SubmitButton>التالي</SubmitButton>
            </CreatorBody>
          </CreatorCard>

          {/* اليسار: العمليات السريعة والنشاطات الأخيرة (خلفية بيضاء) */}
          <SidebarLogs>
            
            {/* العمليات السريعة */}
            <LightCard>
              <LightCardTitleBlock>
                <LightCardTitleEN>Quick Actions</LightCardTitleEN>
                <LightCardTitleAR>الإجراءات والعمليات السريعة</LightCardTitleAR>
              </LightCardTitleBlock>
              <QuickActionsGrid>
                <PrimaryActionButton>
                  <FontAwesomeIcon icon={faUpload} />
                  <span>Upload File</span>
                </PrimaryActionButton>
                <SecondaryActionButton>
                  <FontAwesomeIcon icon={faSync} />
                  <span>Refresh Server</span>
                </SecondaryActionButton>
              </QuickActionsGrid>
            </LightCard>

            {/* الأنشطة الأخيرة */}
            <LightCard>
              <LightCardTitleBlock>
                <LightCardTitleEN>Recent Activity</LightCardTitleEN>
                <LightCardTitleAR>آخر النشاطات الحية والنظام</LightCardTitleAR>
              </LightCardTitleBlock>
              <ActivityList>
                <ActivityItem>
                  <ActivityLeft>
                    <FontAwesomeIcon icon={faCheckCircle} style={{color: '#48bb78'}} />
                    <span>APK Build Success</span>
                  </ActivityLeft>
                  <ActivityTime>13:53 PM</ActivityTime>
                </ActivityItem>
                <ActivityItem>
                  <ActivityLeft>
                    <FontAwesomeIcon icon={faInfoCircle} style={{color: '#3182ce'}} />
                    <span>Config Updated</span>
                  </ActivityLeft>
                  <ActivityTime>13:53 PM</ActivityTime>
                </ActivityItem>
              </ActivityList>
            </LightCard>

          </SidebarLogs>
        </ContentLayout>

      </MainGrid>

      {/* زر المساعدة العائم أسفل اليسار */}
      <FloatingHelp>
        <FontAwesomeIcon icon={faQuestionCircle} style={{fontSize: '1.2rem'}} />
      </FloatingHelp>
    </Container>
  );
}

import './style.css'
import AudioComponent from './component/AudioComponent';
import ScrollReveal from './component/ScrollReveal';
import TopLetter from './component/TopLetter';
import Introduce from './component/Introduce';
import WeddingCalendar from './component/WeddingCalendar';
import ThumbnailGallery from './component/ThumbnailGallery';
import LocationSection from './component/LocationSection';
import AccountSection from './component/AccountSection';
import Thankyou2 from './component/Thankyou2';

export default function App() {
  return (
    <>
      <div className="main-frame paper-section">
        <AudioComponent />
        <ScrollReveal>
          <section className="page-section paper-section">
            <TopLetter />
          </section>
        </ScrollReveal>

{/*         <ScrollReveal>
          <section className="page-section paper-section">
            <div className="main-image-container polaroid">
              <div className="main-text polaroid-caption">
                <p>소중한 분들을 초대합니다</p>
              </div>
            </div>
          </section>
        </ScrollReveal> */}

        <ScrollReveal>
          <section className="page-section paper-section">
            <Thankyou2>
            </Thankyou2>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="page-section paper-section">
            <Introduce />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="page-section paper-section">
            <WeddingCalendar year={2027} month={2} day={13} />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="page-section paper-section">
            <ThumbnailGallery />
          </section>
        </ScrollReveal>

        <ScrollReveal>
            <LocationSection></LocationSection>
        </ScrollReveal>

        <ScrollReveal>
            <AccountSection></AccountSection>
        </ScrollReveal>

        {/* <div style={{ border: debug }}>
          신랑 / 신부 대표사진
        </div>
        <div style={{ border: debug }}>
          웰컴 문구
        </div>
        <div style={{ border: debug }}>
          달력
        </div>
        <div style={{ border: debug }}>
          이미지 갤러리
        </div>
        <div style={{ border: debug }}>
          결혼식 장소
        </div>
        <div style={{ border: debug }}>
          신랑신부 계좌 정보
        </div>
        <div style={{ border: debug }}>
          카카오톡 공유하기 / 모청 주소 복사하기
        </div> */}

      </div>
    </>
  )
}
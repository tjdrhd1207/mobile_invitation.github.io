import './style.css'
import AudioComponent from './component/AudioComponent';
import mainImage from './assets/main_image.png';
import ScrollReveal from './component/ScrollReveal';
import TopLetter from './component/TopLetter';
import Introduce from './component/Introduce';

const debug = import.meta.env.MODE === 'development' ? "solid" : "none";

export default function App() {
  return (
    <>
      <div className="main-frame">
        <section className="page-section">
          <AudioComponent />
        </section>

        <ScrollReveal>
          <section className="page-section">
            <TopLetter />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="page-section">
            <div className="main-image-container" style={{ border: debug }}>
              <img className="main-image" src={mainImage} alt="메인 이미지" />
              <div className="main-text">
                <h2>소중한 분들을 초대합니다</h2>
                <p>저희 두 사람의 시작을 함께해 주세요.</p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="page-section">
            <Introduce />
          </section>
        </ScrollReveal>
        <div style={{ border: debug }}>
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
        </div>
      </div>
    </>
  )
}
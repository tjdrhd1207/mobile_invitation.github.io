import './style.css'
import AudioComponent from './component/AudioComponent';
import mainImage from './assets/main_image.png';

const debug = import.meta.env.MODE === 'development' ? "solid" : "none";

export default function App() {
  return (
    <>
      <div className="main-frame">
        <AudioComponent />
        <img className="main-image" src={mainImage} alt="메인 이미지" />
        <div className="main-text">
          <p>WE ARE GETTING MARRIED</p>
          <h1>재민 <span>♥</span> 국명</h1>
          <p>2027. 2. 13 SATURDAY</p>
        </div>
        <div style={{ border: debug }}>
          신랑 / 신부 이름 어디서 언제 결혼 표시 영역
        </div>
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
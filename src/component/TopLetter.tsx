import mainImage from '../assets/gallery/mainImage.webp';

export default function TopLetter() {
    return (
        <div className="top-letter">
            <img className="main-image polaroid-image" src={mainImage} alt="메인 이미지" />
            <p className="top-letter-name">신랑 감재민 신부 공국명</p>
            <p>2027년 2월 13일 토요일 12시 20분</p>
            <p>신도림 웨딩시티</p>            
        </div>  
    )
}
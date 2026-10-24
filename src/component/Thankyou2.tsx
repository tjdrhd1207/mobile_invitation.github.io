import bride from '../assets/gallery/bride.webp';
import groom from '../assets/gallery/groom.webp';
import heart from '../assets/gallery/heart.webp';
import babyBg from '../assets/gallery/baby-removebg.webp';

export default function Thankyou2() {

    return (
        <>
            <div className="thank-section">
                <div>
                    <img className="thankyou-photo" src={babyBg} alt="애기때 이미지" />          
                </div>
                <div className="thank-section3">
                    <p>항상 바쁘신 와중에도 모임에 와주셔서 정말 감사합니다! 덕분에 즐거운 시간 보냈습니다</p>
                </div>
            </div>
        
        </>
    )
}
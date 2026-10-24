import bride from '../assets/gallery/bride.webp';
import groom from '../assets/gallery/groom.webp';

export default function Thankyou () {

    return (
        <>
            <div className="thank-section">
                <div className="thank-section2">
                    <img className="thankyou-photo" src={bride} alt="애기때 이미지" />
                    <p>항상 바쁘신 와중에도 모임에 와주셔서 정말 감사합니다! 덕분에 즐거운 시간 보냈습니다</p>
                </div>
                <div className="thank-section3">
                    <img className="thankyou-photo" src={groom} alt="애기때 이미지" />             
                    <p>항상 바쁘신 와중에도 모임에 와주셔서 정말 감사합니다! 덕분에 즐거운 시간 보냈습니다</p>
                </div>
            </div>
        
        </>
    )
}
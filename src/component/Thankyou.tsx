import bride from '../assets/gallery/bride.webp';
import groom from '../assets/gallery/groom.webp';

export default function Thankyou () {

    return (
        <>
            <div className="thank-section">
                <div className="thank-section2">
                    <img className="thankyou-photo" src={bride} alt="애기때 이미지" />
                </div>
                <div className="thank-section3">
                    <img className="thankyou-photo" src={groom} alt="애기때 이미지" />             
                </div>
            </div>
        
        </>
    )
}
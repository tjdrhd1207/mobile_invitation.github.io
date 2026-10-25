import mainImage from '../assets/gallery/mainImage.webp';

export default function TopLetter() {
    return (
        <div className="top-letter">
            <img className="main-image polaroid-image" src={mainImage} alt="메인 이미지" />
            <div className="invite-card">
                <div className="invite-info">
                    <p className="top-letter-name">Kim Jae Min ✱ Gong Guk Myeong</p>
                    <p>2027.2.13. Saturday 12:20 PM</p>
                    <p>Shindorim Wedding City</p>
                </div>
                <p className="invited-title">You're invited to <br></br>Our Wedding</p>
            </div>
            <div>
                <p>함께하면 더 편하고, 더 재밌어서</p>
                <p>결국엔 인생을 같이 해보기로 했어요.</p>
                <p>좋은 일, 힘든 일도 나눌 수 있는</p>
                <p>든든한 사람이 되어주려 합니다.</p>
                <p>저희의 시작이 되는 날,</p>
                <p>시간 괜찮으시면 얼굴 보러 와주세요!</p>
                <p>웃으며 만날 수 있다면 더 바랄 게 없습니다.</p>
            </div>
        </div>
    )
}

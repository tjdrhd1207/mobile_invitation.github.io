import { WEDDING } from '../data/wedding';
import CyGallery from './CyGallery';
import CyCalendar from './CyCalendar';
import CyLocation from './CyLocation';
import CyAccount from './CyAccount';
import CyBgm from './CyBgm';
import CyNav from './CyNav';
import logo from '../assets/logo.webp?w=96&format=webp&imagetools';
import proposeImage from '../assets/propose.webp?w=860&format=webp&imagetools';
import cyAvatar from '../assets/gallery/baby-removebg.webp?w=860&format=webp&imagetools';

const { groom, bride, date } = WEDDING;

export default function CyworldApp() {
    return (
        <div className="cy-frame">
            <header className="cy-topbar">
                <img className="cy-logo" src={logo} alt="" />
                <span className="cy-logo-text">MarryWorld</span>
            </header>

            <h1 id="cy-home" className="cy-title">{groom.name} ♥ {bride.name}의 미니홈피</h1>

            <section className="cy-card">
                <div className="bgm">
                    <CyBgm />
                </div>
            </section >

            <section className="cy-card cy-profile">
                <div className="cy-avatar" >
                    <img className="cy-avatar-img" src={cyAvatar} alt="미니룸" />
                </div>
                <div className="cy-profile-info">
                    <div className="cy-today">TODAY <b>0</b> | 0</div>
                    <div className="cy-name">{groom.name} ♥ {bride.name}</div>
                    <div className="cy-desc">{date.year}.{date.month}.{date.day} 결혼합니다</div>
                </div>
            </section>

            <section className="cy-card cy-menu">
                <div>다이어리 <span>0/0</span></div>
                <div>사진첩 <span>0/0</span></div>
                <div>쥬크박스 <span>1/1</span></div>
                <div>방명록 <span>0/0</span></div>
            </section>

            <section id="cy-introduce" className="cy-card">
                <div>
                    <h2 className="cy-section-title">Introduce</h2>
                    <p>함께하면 더 편하고, 더 재밌어서</p>
                    <p>결국엔 인생을 같이 해보기로 했어요.</p>
                    <p>좋은 일, 힘든 일도 나눌 수 있는</p>
                    <p>든든한 사람이 되어주려 합니다.</p>
                    <p>저희의 시작이 되는 날,</p>
                    <p>시간 괜찮으시면 얼굴 보러 와주세요!</p>
                    <p>웃으며 만날 수 있다면 더 바랄 게 없습니다.</p>
                </div>
            </section >

            <section id="cy-miniroom" className="cy-card">
                <h2 className="cy-section-title">Mini Room</h2>
                <div className="cy-miniroom" >
                    <img src={proposeImage} alt="미니룸" />
                </div>
            </section>

            <section id="cy-gallery" className="cy-card">
                <h2 className="cy-section-title">Gallery</h2>
                <CyGallery />
            </section>

            <section id="cy-calendar" className="cy-card">
                <h2 className="cy-section-title">Calendar</h2>
                <CyCalendar />
            </section>

            <section id="cy-location" className="cy-card">
                <h2 className="cy-section-title">Location</h2>
                <CyLocation />
            </section>

            <section id="cy-account" className="cy-card">
                <h2 className="cy-section-title">Account</h2>
                <CyAccount />
            </section>

            <section id="cy-guestbook" className="cy-card">
                <h2 className="cy-section-title">What Friends Say</h2>
            </section>

            {/* 오른쪽에 붙어서 스크롤을 따라다니는 탭 메뉴 */}
            <CyNav />

        </div >
    );
}

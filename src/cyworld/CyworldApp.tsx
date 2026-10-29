import { WEDDING } from '../data/wedding';
import CyGallery from './CyGallery';
import CyCalendar from './CyCalendar';
import CyLocation from './CyLocation';
import CyAccount from './CyAccount';
import CyBgm from './CyBgm';
import CyNav from './CyNav';
import { useTodayCounter } from '../hooks/useTodayCounter';
import logo from '../assets/logo.webp?w=96&format=webp&imagetools';
import proposeImage from '../assets/propose.webp?w=860&format=webp&imagetools';
import cyAvatar from '../assets/gallery/baby-removebg.webp?w=860&format=webp&imagetools';

const { groom, bride, date } = WEDDING;

export default function CyworldApp() {
    const counts = useTodayCounter();

    return (
        <div className="cy-frame">
            <header className="cy-topbar">
                <img className="cy-logo" src={logo} alt="" />
                <span className="cy-logo-text">MarryWorld</span>
            </header>

            <div className="cy-layout">
                <main className="cy-content">
                    <h1 id="cy-home" className="cy-title">{groom.name} ♥ {bride.name} 결혼합니다.</h1>

                    <section className="cy-card">
                        <div className="cy-jukebox">
                            {/* 불러오는 중이거나 실패하면 '-' 표시 */}
                            <div className="cy-today">
                                TODAY <b>{counts?.today ?? '-'}</b> | {counts?.total ?? '-'}
                            </div>
                            <div className="bgm">
                                <CyBgm />
                            </div>
                        </div>
                    </section >

                    <section className="cy-card2 cy-profile">
                        <div className="cy-avatar" >
                            <img className="cy-avatar-img" src={cyAvatar} alt="미니룸" />
                        </div>
                        <div className="cy-profile-info">
                            <div className="cy-name">{groom.name} ♥ {bride.name}</div>
                            <div className="cy-desc">{date.year}.{date.month}.{date.day} 토요일 12:10</div>
                            <div className="cy-text">신도림 웨딩시티 8F 아모르홀 </div>
                            <div className="cy-text">저희 결혼합니다.</div>
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

                            <p>오랜 시간 곁에서 서로를 아껴온 저희가</p>
                            <p>깊은 신뢰를 바탕으로 평생을 함께하기로 했습니다.</p>
                            <p>겨울의 끝자락에서 새로운 출발을 다짐하는 자리에</p>
                            <p>소중한 분들을 모시고자 합니다.</p>
                            <p>오셔서 축복해 주시면</p>
                            <p>큰 기쁨과 감사한 마음으로 잘 살겠습니다.</p>
                            <br></br>
                            <div className="cy-all-family">
                                <div className="cy-family">
                                    <div className="cy-person-name">김승준</div>&nbsp;<div className="cy-person-name">조춘열</div>&nbsp;의 아들&nbsp;<div className="cy-person-name">김재민</div>
                                </div>
                                <div className="cy-family">
                                    <div className="cy-person-name">공진환</div>&nbsp;<div className="cy-person-name">안미환</div>&nbsp;의 딸&nbsp;<div className="cy-person-name">공국명</div>
                                </div>
                            </div>
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
                </main>

                {/* 오른쪽에 붙어서 스크롤을 따라다니는 탭 메뉴 */}
                <CyNav />
            </div>

        </div >
    );
}

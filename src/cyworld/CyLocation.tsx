import { useRef, useState } from 'react';
import { WEDDING } from '../data/wedding';
import { getMapLinks, useKakaoMap } from '../hooks/useKakaoMap';
import { MINIMI_SRC } from './minimi';
import CyPhotoViewer from './CyPhotoViewer';
// 길 안내 사진 (주소를 누르면 순서대로 크게 보기). 원본이 큰 사진은 줄여서 사용
import route1 from '../assets/gallery/route/1.webp?w=860&format=webp&imagetools';
import route2 from '../assets/gallery/route/2.webp?w=860&format=webp&imagetools';
import route3 from '../assets/gallery/route/3.webp?format=webp&imagetools';
import route4 from '../assets/gallery/route/4.webp?format=webp&imagetools';

const ROUTE_PHOTOS = [route1, route2, route3, route4].map((src, i) => ({ key: i, src }));

const { venue, address } = WEDDING;
const MAP_LINKS = getMapLinks(venue);

// 버스 정류장별 노선 (color: 배지 색상 클래스, desc: 정류장 위치 설명 - 없으면 생략)
const BUS_STOPS: { name: string; desc?: string; buses: { type: string; color: string; numbers: string }[] }[] = [
    {
        name: '신도림역',
        buses: [
            { type: '지선', color: 'green', numbers: '5619, 6411, 6511' },
            { type: '마을', color: 'lime', numbers: '영등포09, 12, 13' },
        ],
    },
];

// 안내용 상세 주소 (지도 검색에는 WEDDING.address 사용)
const ROAD_ADDRESS = '서울 구로구 새말로 97';
const LOT_ADDRESS = '(구로동 3-25)';
const HALL = '신도림 테크노마트 8층 아모르홀';

export default function CyLocation() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);
    // 길 안내 사진 크게 보기 순번 (닫혀 있으면 null)
    const [routeIndex, setRouteIndex] = useState<number | null>(null);

    const { mapError } = useKakaoMap(mapRef, address, (kakao, map, position) => {
        // 기본 핀 대신 미니미 + 도트 말풍선을 지도 위에 올림
        const overlay = new kakao.maps.CustomOverlay({
            position,
            yAnchor: 1,
            content: `
                <div class="cy-map-marker">
                    <div class="cy-map-bubble">${venue}에서 만나요!</div>
                    <img src="${MINIMI_SRC}" alt="" />
                </div>
            `,
        });

        overlay.setMap(map);
    });

    const copyAddress = async () => {
        try {
            await navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // 클립보드 권한이 없으면 조용히 무시
        }
    };

    return (
        <div className="cy-location">
            {/* 예식장 이름 → 층/홀 → 도로명 주소 순으로 줄을 나눠 표시 */}
            <div className="cy-place">
                <span className="cy-place-icon" aria-hidden="true">📍</span>
                <div>
                    <div className="cy-place-name">{venue}</div>
                    <p className="cy-place-line">{HALL}</p>
                    <p className="cy-place-sub">{ROAD_ADDRESS} {LOT_ADDRESS}</p>
                </div>
            </div>
            <div className="cy-location-buttons">
                <button type="button" className={copied ? 'cy-btn' : 'cy-btn-complete'} onClick={copyAddress}>
                    {copied ? '복사완료' : '주소복사'}
                </button>
                <a className="cy-btn" href={MAP_LINKS.kakao} target="_blank" rel="noreferrer">카카오맵</a>
                <a className="cy-btn" href={MAP_LINKS.naver} target="_blank" rel="noreferrer">네이버지도</a>
            </div>

            {routeIndex !== null && (
                <CyPhotoViewer
                    images={ROUTE_PHOTOS}
                    index={routeIndex}
                    onChange={setRouteIndex}
                    onClose={() => setRouteIndex(null)}
                    uniform
                />
            )}
            <div className="cy-map-frame">
                <div ref={mapRef} className="cy-map-canvas" aria-label={`${venue} 위치 지도`} />

                {mapError && (
                    <div className="cy-map-fallback">
                        <img src={MINIMI_SRC} alt="" />
                        <p>지도를 불러오지 못했어요.</p>
                        <p>아래 버튼으로 위치를 확인해 주세요.</p>
                    </div>
                )}
            </div>

            <div className="cy-route">
                <div className="cy-route-heading">
                    웨딩시티 오시는 길
                    {/* 누르면 길 안내 사진 1~4가 순서대로 */}
                    {/* <button type="button" className="cy-route-photo-link" onClick={() => setRouteIndex(0)}>
                        📷 사진 보기
                    </button> */}
                </div>

                <div className="cy-route-section">
                    <div className="cy-route-title">
                        <span className="cy-route-icon">🚇</span> 지하철 이용 시
                    </div>
                    <div className="cy-bus-stop">
                    <div className="cy-route-lines">
                        <span className="cy-line-badge line1">1호선</span>
                        <span className="cy-line-badge line2">2호선</span>
                        <span>신도림역</span>
                    </div>
                    <p className="cy-route-desc">
                        신도림역 <b>②, ③번 출구</b>
                        <span className="cy-route-sub">지하철역과 건물 지하가 바로 연결돼요</span>
                    </p>
                    </div>
                </div>

                <div className="cy-route-section">
                    <div className="cy-route-title">
                        <span className="cy-route-icon">🚌</span> 버스 이용 시
                    </div>

                    {BUS_STOPS.map(stop => (
                        <div key={stop.name} className="cy-bus-stop">
                            <div className="cy-bus-stop-name">{stop.name} 정류장 하차</div>
                            {stop.desc && <p className="cy-route-desc">{stop.desc}</p>}
                            <ul className="cy-bus-list">
                                {stop.buses.map(bus => (
                                    <li key={bus.type}>
                                        <span className={`cy-bus-badge ${bus.color}`}>{bus.type}</span>
                                        <span>{bus.numbers}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="cy-route-section">
                    <div className="cy-route-title">
                        <span className="cy-route-icon">🚗</span> 주차 안내
                    </div>
                    <p className="cy-route-desc">
                        웨딩홀 건물 지하주차장 <b>B3~B7</b>
                        <span className="cy-route-sub">약 2,500대 수용 · <b>3시간 무료</b></span>
                    </p>
                </div>

            </div>
        </div>
    );
}

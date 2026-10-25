import { useRef } from "react";
import { WEDDING } from "../data/wedding";
import { getMapLinks, useKakaoMap } from "../hooks/useKakaoMap";

const VENUE = WEDDING.venue;
const ADDRESS = WEDDING.address;

const MAP_LINKS = getMapLinks(VENUE, ADDRESS);


export default function LocationSection() {
    const mapRef = useRef<HTMLDivElement>(null);

    const { mapError } = useKakaoMap(mapRef, ADDRESS, (kakao, map, position) => {
        const marker = new kakao.maps.Marker({
            position,
        });

        marker.setMap(map);

        const info = new kakao.maps.InfoWindow({
            content: `
              <div style="padding:10px 14px;
                font-size:13px;white-space:nowrap;">
                <strong>${VENUE}</strong>
              </div>            
            `,
        });

        info.open(map, marker);
    });

    return (
        <section className="location-section paper-section" id="location">
            <div className="location-panel">
                <p className="location-eyebrow">LOCATION</p>

                <h2 className="location-title">오시는 길</h2>

                <div className="location-info">
                    <h3>{VENUE}</h3>
                    <p>{ADDRESS}</p>
                    <button
                        type="button"
                        className="address-copy"
                        onClick={() => {
                            void navigator.clipboard?.writeText(ADDRESS);
                        }}
                    >
                        주소 복사
                    </button>
                </div>

                <div className="location-map">
                    <div
                        ref={mapRef}
                        className="location-map-canvas"
                        aria-label={`${VENUE} 위치 지도`}
                    />

                    {mapError && (
                        <div className="map-fallback">
                            <p>지도를 불러오지 못했어요.</p>
                            <p>아래 지도 앱 버튼에서 위치를 확인해 주세요.</p>
                            <a
                                href={MAP_LINKS.kakao}
                                target="_blank"
                                rel="noreferrer"
                            >
                                카카오맵에서 위치 확인
                            </a>
                        </div>
                    )}
                </div>

                <div className="location-buttons">
                    <a
                        className="map-button kakao"
                        href={MAP_LINKS.kakao}
                        target="_blank"
                        rel="noreferrer"
                    >
                        카카오맵
                    </a>

                    <a
                        className="map-button naver"
                        href={MAP_LINKS.naver}
                        target="_blank"
                        rel="noreferrer"
                    >
                        네이버 지도
                    </a>

                    <a
                        className="map-button tmap"
                        href={MAP_LINKS.tmap}
                        target="_blank"
                        rel="noreferrer"
                    >
                        티맵
                    </a>
                </div>

                <div className="location-guide">
                    <p>
                        <strong>지하철</strong>
                        <span>1·2호선 신도림역 3번 출구</span>
                    </p>
                    <p>
                        <strong>주차</strong>
                        <span>신도림테크노마트 지하주차장 B3~B7</span>
                    </p>
                </div>
            </div>
        </section>
    )
}
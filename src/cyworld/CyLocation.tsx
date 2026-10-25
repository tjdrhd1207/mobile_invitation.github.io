import { useRef, useState } from 'react';
import { WEDDING } from '../data/wedding';
import { getMapLinks, useKakaoMap } from '../hooks/useKakaoMap';
import { MINIMI_SRC } from './minimi';

const { venue, address } = WEDDING;
const MAP_LINKS = getMapLinks(venue, address);

export default function CyLocation() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

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

            <div className="cy-location-info">
                <div className="cy-location-venue">{venue}</div>
                <div className="cy-location-address">
                    <span>{address}</span>
                    <button type="button" className="cy-btn" onClick={copyAddress}>
                        {copied ? '복사완료' : '주소복사'}
                    </button>
                </div>
            </div>

            <div className="cy-location-buttons">
                <a className="cy-btn" href={MAP_LINKS.kakao} target="_blank" rel="noreferrer">카카오맵</a>
                <a className="cy-btn" href={MAP_LINKS.naver} target="_blank" rel="noreferrer">네이버지도</a>
            </div>
        </div>
    );
}

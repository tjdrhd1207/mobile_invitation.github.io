import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        kakao?: any;
    }
}

const VENUE = "웨딩시티";
const ADDRESS = "서울특별시 구로구 새말로 97";

const KAKAO_KEY = import.meta.env.VITE_KAKAO_MAP_KEY as | string | undefined;

const encodedQuery = encodeURIComponent(`${VENUE} ${ADDRESS}`);

const MAP_LINKS = {
    kakao: `https://map.kakao.com/link/search/${encodedQuery}`,
    naver: `https://map.naver.com/p/search/${encodedQuery}`,
    tmap: `https://www.tmap.co.kr/`,
};


export default function LocationSection() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapError, setMapError] = useState(false);

    useEffect(() => {
        let cancelled = false;
        let map: any;

        if (!KAKAO_KEY) {
            setMapError(true);
            return;
        }

        const showMap = () => {
            if (
                cancelled ||
                !mapRef.current ||
                !window.kakao?.maps?.services
            ) {
                return;
            }
            const { kakao } = window;

            const geocoder = new kakao.maps.services.Geocoder();


            console.log("[1] 지도 초기화 시작");
console.log("[2] kakao 객체:", window.kakao);
console.log("[3] services:", window.kakao?.maps?.services);
console.log("[4] geocoder:", geocoder);

            geocoder.addressSearch(
                ADDRESS,
                (result: any[], status: string) => {
                    console.log("[Kakao Map] 주소 검색 상태:", status);
                    console.log("[Kakao Map] 검색 결과:", result);

                    if (cancelled || !mapRef.current) return;

                    if (
                        status !== kakao.maps.services.Status.OK || !result.length
                    ) {
                        setMapError(true);
                        return;
                    }

                    const position = new kakao.maps.LatLng(
                        Number(result[0].y),
                        Number(result[0].x)
                    );

                    map = new kakao.maps.Map(mapRef.current, {
                        center: position,
                        level: 3,
                    });

                    const marker = new kakao.maps.Marker({
                        position,
                    });

                    marker.setMap(map);

                    const info = new kakao.maps.InfoWindow({
                        content: `
                          <div style="padding:10px 14px;
                            font-size:13px;white-space:nowrap;">
                            <strong>웨딩시티</strong>
                          </div>            
                        `,
                    });

                    info.open(map, marker);

                }
            );
        };

        const existingScript = document.querySelector<HTMLScriptElement>(
            'script[data-kakao-map-sdk="true"]'
        );

        if (window.kakao?.maps?.services) {
            window.kakao.maps.load(showMap);
        } else if (existingScript) {
            existingScript.addEventListener("load", () => {
                window.kakao?.maps?.load(showMap);
            }, { once: true });

            existingScript.addEventListener("error", () => {
                if (!cancelled) setMapError(true);
            }, { once: true });
        } else {
            const script = document.createElement("script");

            script.dataset.kakaoMapSdk = "true";
            script.src =
                `https://dapi.kakao.com/v2/maps/sdk.js` +
                `?appkey=${encodeURIComponent(KAKAO_KEY)}` +
                `&libraries=services&autoload=false`;
            script.async = true;

            script.onload = () => {
                if (!cancelled && window.kakao?.maps) {
                    window.kakao.maps.load(showMap);
                } else if (!cancelled) {
                    setMapError(true);
                }
            };

            script.onerror = () => {
                if (!cancelled) setMapError(true);
            };

            document.head.appendChild(script);
        }

        return () => {
            cancelled = true;
            // 다른 컴포넌트에서 SDK를 사용할 수 있으므로
            // 공용 SDK 스크립트는 제거하지 않음.
            void map;
        };

    }, []);

    return (
        <section className="location-section paper-section" id="location">
            <p className="location-eyebrow">LOCATION</p>

            <h2 className="location-title">오시는 길</h2>

            <div className="location-info">
                <h3>웨딩시티</h3>
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
                    aria-label="웨딩시티 위치 지도"
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
        </section>
    )
}
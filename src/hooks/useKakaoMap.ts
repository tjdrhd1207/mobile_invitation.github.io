import { useEffect, useRef, useState, type RefObject } from "react";

declare global {
    interface Window {
        kakao?: any;
    }
}

const KAKAO_KEY = import.meta.env.VITE_KAKAO_MAP_KEY as | string | undefined;

type MapReady = (kakao: any, map: any, position: any) => void;

/**
 * 카카오맵 SDK 로딩 → 주소 검색 → 지도 생성까지만 담당.
 * 마커, 말풍선 같은 디자인 요소는 onReady에서 각 화면이 직접 그린다.
 */
export function useKakaoMap(
    mapRef: RefObject<HTMLDivElement | null>,
    address: string,
    onReady?: MapReady,
    level = 3,
) {
    const [mapError, setMapError] = useState(false);

    // onReady가 렌더링마다 바뀌어도 지도를 다시 만들지 않도록 ref로 보관
    const onReadyRef = useRef(onReady);
    onReadyRef.current = onReady;

    useEffect(() => {
        let cancelled = false;

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

            geocoder.addressSearch(
                address,
                (result: any[], status: string) => {
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

                    const map = new kakao.maps.Map(mapRef.current, {
                        center: position,
                        level,
                    });

                    onReadyRef.current?.(kakao, map, position);
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
        };
    }, [mapRef, address, level]);

    return { mapError };
}

const encodedQuery = (venue: string, address: string) =>
    encodeURIComponent(`${venue} ${address}`);

export const getMapLinks = (venue: string, address: string) => ({
    kakao: `https://map.kakao.com/link/search/${encodedQuery(venue, address)}`,
    naver: `https://map.naver.com/p/search/${encodedQuery(venue, address)}`,
    tmap: `https://www.tmap.co.kr/`,
});

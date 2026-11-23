import { useEffect, useRef, useState } from 'react';
import { photos } from '../component/PolaroidGallery';
import CyPhotoViewer from './CyPhotoViewer';

// 아래 점(인디케이터)은 최대 이 개수만 보여주고, 넘기면 따라 움직임
const MAX_DOTS = 7;

const viewerImages = photos.map(photo => ({ key: photo.id, src: photo.src }));

const clamp = (i: number) => Math.max(0, Math.min(photos.length - 1, i));

/** 사진첩: 좌우로 밀어서 넘기는 슬라이드, 누르면 크게 보기 */
export default function CyGallery() {
    const [current, setCurrent] = useState(0);
    // 크게 보고 있는 사진의 순번 (닫혀 있으면 null)
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    // 화살표·점을 눌러 이동 중인 목표 순번 (이동 중 지나가는 사진으로 점이 깜빡이지 않게)
    const targetRef = useRef<number | null>(null);

    // 손으로 밀어서 넘긴 경우에도 현재 순번을 따라감
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        let frame = 0;
        const onScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                const index = clamp(Math.round(track.scrollLeft / track.clientWidth));
                if (targetRef.current !== null) {
                    // 버튼으로 이동 중: 목표에 도착하기 전까지는 무시
                    if (index !== targetRef.current) return;
                    targetRef.current = null;
                }
                setCurrent(index);
            });
        };
        // 손가락으로 직접 밀기 시작하면 버튼 이동 목표는 취소
        const onTouchStart = () => { targetRef.current = null; };
        track.addEventListener('scroll', onScroll, { passive: true });
        track.addEventListener('touchstart', onTouchStart, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            track.removeEventListener('scroll', onScroll);
            track.removeEventListener('touchstart', onTouchStart);
        };
    }, []);

    const goTo = (index: number, smooth = true) => {
        const track = trackRef.current;
        if (!track) return;
        const next = clamp(index);
        targetRef.current = smooth ? next : null;
        track.scrollTo({ left: next * track.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
        setCurrent(next);
    };

    // 크게 보기를 닫을 때, 보던 사진으로 슬라이드를 한 번만 맞춤
    // (열려 있는 동안 계속 맞추면 반투명 배경 뒤로 점들이 넘길 때마다 움직여 보였음)
    const closeViewer = () => {
        if (openIndex !== null) goTo(openIndex, false);
        setOpenIndex(null);
    };

    // 현재 사진이 가운데 오도록 보여줄 점 범위를 정함
    const dotStart = Math.max(0, Math.min(photos.length - MAX_DOTS, current - Math.floor(MAX_DOTS / 2)));
    const dots = photos.slice(dotStart, dotStart + MAX_DOTS).map((_, i) => dotStart + i);

    return (
        <div className="cy-slide">
            <div className="cy-slide-view">
                <div className="cy-slide-track" ref={trackRef}>
                    {photos.map((photo, i) => (
                        <button
                            key={photo.id}
                            type="button"
                            className="cy-slide-item"
                            onClick={() => setOpenIndex(i)}
                            aria-label={`${i + 1}번째 사진 크게 보기`}
                        >
                            <img
                                src={photo.src}
                                alt=""
                                loading={Math.abs(i - current) <= 1 ? 'eager' : 'lazy'}
                                decoding="async"
                            />
                        </button>
                    ))}
                </div>

                {current > 0 && (
                    <button type="button" className="cy-slide-arrow left" onClick={() => goTo(current - 1)} aria-label="이전 사진">‹</button>
                )}
                {current < photos.length - 1 && (
                    <button type="button" className="cy-slide-arrow right" onClick={() => goTo(current + 1)} aria-label="다음 사진">›</button>
                )}
            </div>

            <div className="cy-slide-count">
                <b>{current + 1}</b> / {photos.length}
            </div>

            <div className="cy-slide-dots" aria-hidden="true">
                {dots.map(i => {
                    // 양 끝 점은 뒤에 더 있다는 표시로 작게
                    const edge = (i === dots[0] && i > 0) || (i === dots[dots.length - 1] && i < photos.length - 1);
                    return (
                        <span
                            key={i}
                            className={`${i === current ? 'active' : ''} ${edge ? 'edge' : ''}`}
                            onClick={() => goTo(i)}
                        />
                    );
                })}
            </div>

            {openIndex !== null && (
                <CyPhotoViewer
                    images={viewerImages}
                    index={openIndex}
                    onChange={setOpenIndex}
                    onClose={closeViewer}
                />
            )}
        </div>
    );
}

import { useEffect, useRef, useState } from 'react';
import { photos } from '../component/PolaroidGallery';

// 바둑판 한 페이지: 3열 x 4행
const PAGE_SIZE = 12;
const totalPages = Math.ceil(photos.length / PAGE_SIZE);

// 이 거리(px) 이상 옆으로 밀어야 다음/이전 사진으로 넘어감
const SWIPE_THRESHOLD = 40;

export default function CyGallery() {
    const [selectedId, setSelectedId] = useState<number>(photos[0].id);
    // 크게 보고 있는 사진의 순번 (닫혀 있으면 null)
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [page, setPage] = useState(0);
    const pagePhotos = photos.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
    const touchStartX = useRef<number | null>(null);

    const show = (index: number) => {
        // 처음/끝에서 넘기면 반대쪽으로 이어짐
        const next = (index + photos.length) % photos.length;
        setOpenIndex(next);
        setSelectedId(photos[next].id);
        // 넘기다가 다른 페이지 사진이 되면 바둑판 페이지도 따라감
        setPage(Math.floor(next / PAGE_SIZE));
    };

    const close = () => setOpenIndex(null);

    // PC: 키보드 ← → 로 넘기고 Esc로 닫기
    useEffect(() => {
        if (openIndex === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') show(openIndex - 1);
            else if (e.key === 'ArrowRight') show(openIndex + 1);
            else if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [openIndex]);

    // 확대 중에는 뒤 페이지 스크롤 잠금
    // (iOS 사파리는 overflow:hidden만으로 안 막혀서 body를 현재 위치에 고정했다가 닫을 때 복원)
    const isOpen = openIndex !== null;
    useEffect(() => {
        if (!isOpen) return;
        const scrollY = window.scrollY;
        const { style } = document.body;
        const prev = { position: style.position, top: style.top, width: style.width, overflow: style.overflow };

        style.position = 'fixed';
        style.top = `-${scrollY}px`;
        style.width = '100%';
        style.overflow = 'hidden';

        return () => {
            Object.assign(style, prev);
            window.scrollTo(0, scrollY);
        };
    }, [isOpen]);

    // 모바일: 좌우로 밀어서 넘기기
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || openIndex === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) < SWIPE_THRESHOLD) return;
        show(dx < 0 ? openIndex + 1 : openIndex - 1);
    };

    const openPhoto = openIndex === null ? null : photos[openIndex];

    return (
        <div>
            <div className="cy-gallery-grid">
                {pagePhotos.map((photo, i) => (
                    <button
                        key={photo.id}
                        className={`cy-gallery-grid-item ${selectedId === photo.id ? 'selected' : ''}`}
                        onClick={() => show(page * PAGE_SIZE + i)}
                    >
                        <img src={photo.thumb} loading="lazy" decoding="async" />
                    </button>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="cy-gallery-pager">
                    <button onClick={() => setPage((p) => p - 1)} disabled={page === 0} aria-label="이전 페이지">‹</button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={i === page ? 'active' : ''}
                            onClick={() => setPage(i)}
                            aria-current={i === page ? 'page' : undefined}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages - 1} aria-label="다음 페이지">›</button>
                </div>
            )}

            {openPhoto && openIndex !== null && (
                // 사진 바깥 어두운 배경을 누르면 닫힘
                <div
                    className="cy-gallery-modal"
                    onClick={close}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <button className="cy-gallery-modal-close" onClick={close} aria-label="닫기">✕</button>

                    {/* 사진 크기만큼의 상자: 화살표가 화면이 아닌 사진 양끝에 붙음 */}
                    <div className="cy-gallery-modal-photo" onClick={(e) => e.stopPropagation()}>
                        {/* key를 바꿔서 넘길 때마다 살짝 나타나는 효과 */}
                        <img key={openPhoto.id} src={openPhoto.src} />

                        <button
                            className="cy-gallery-modal-arrow left"
                            onClick={() => show(openIndex - 1)}
                            aria-label="이전 사진"
                        >
                            ‹
                        </button>
                        <button
                            className="cy-gallery-modal-arrow right"
                            onClick={() => show(openIndex + 1)}
                            aria-label="다음 사진"
                        >
                            ›
                        </button>
                    </div>

                    <p className="cy-gallery-modal-count">
                        {openIndex + 1} / {photos.length}
                    </p>
                </div>
            )}
        </div>
    );
}

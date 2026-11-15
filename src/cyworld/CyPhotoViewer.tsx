import { useEffect, useRef } from 'react';

// 이 거리(px) 이상 옆으로 밀어야 다음/이전 사진으로 넘어감
const SWIPE_THRESHOLD = 40;

type Props = {
    images: { key: string | number; src: string }[];
    /** 보고 있는 사진 순번 */
    index: number;
    /** 넘길 때 호출 (처음/끝에서는 반대쪽으로 이어진 순번이 전달됨) */
    onChange: (index: number) => void;
    onClose: () => void;
    /** true면 모든 사진을 같은 크기(3:4) 액자에 맞춰 보여줌 */
    uniform?: boolean;
};

/** 사진 크게 보기: 좌우로 밀기 / 양끝 화살표 / 키보드 ← → 로 넘기고, 배경·✕·Esc로 닫기 */
export default function CyPhotoViewer({ images, index, onChange, onClose, uniform = false }: Props) {
    const touchStartX = useRef<number | null>(null);
    const photo = images[index];

    const go = (next: number) => onChange((next + images.length) % images.length);

    // PC: 키보드 ← → 로 넘기고 Esc로 닫기
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') go(index - 1);
            else if (e.key === 'ArrowRight') go(index + 1);
            else if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [index]);

    // 열려 있는 동안 뒤 페이지 스크롤 잠금
    // (iOS 사파리는 overflow:hidden만으로 안 막혀서 body를 현재 위치에 고정했다가 닫을 때 복원)
    useEffect(() => {
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
    }, []);

    // 모바일: 좌우로 밀어서 넘기기
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) < SWIPE_THRESHOLD) return;
        go(dx < 0 ? index + 1 : index - 1);
    };

    if (!photo) return null;

    return (
        // 사진 바깥 어두운 배경을 누르면 닫힘
        <div className="cy-gallery-modal" onClick={onClose} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <button className="cy-gallery-modal-close" onClick={onClose} aria-label="닫기">✕</button>

            {/* 사진 크기만큼의 상자: 화살표가 화면이 아닌 사진 양끝에 붙음 */}
            <div
                className={`cy-gallery-modal-photo ${uniform ? 'uniform' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* key를 바꿔서 넘길 때마다 살짝 나타나는 효과 */}
                <img key={photo.key} src={photo.src} alt="" />

                {images.length > 1 && (
                    <>
                        <button className="cy-gallery-modal-arrow left" onClick={() => go(index - 1)} aria-label="이전 사진">
                            ‹
                        </button>
                        <button className="cy-gallery-modal-arrow right" onClick={() => go(index + 1)} aria-label="다음 사진">
                            ›
                        </button>
                    </>
                )}
            </div>

            <p className="cy-gallery-modal-count">
                {index + 1} / {images.length}
            </p>
        </div>
    );
}

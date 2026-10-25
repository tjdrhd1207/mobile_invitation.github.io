import { useRef, useState } from 'react';
import { photos, type Photo } from '../component/PolaroidGallery';
import { WEDDING } from '../data/wedding';

const { groom, bride } = WEDDING;

export default function CyGallery() {
    const listRef = useRef<HTMLDivElement>(null);
    const [selectedId, setSelectedId] = useState<number>(photos[0].id);
    const [openPhoto, setOpenPhoto] = useState<Photo | null>(null);

    // 카드 한 장 너비만큼 좌우로 스크롤
    const scrollBy = (dir: 1 | -1) => {
        const list = listRef.current;
        const card = list?.firstElementChild as HTMLElement | null;
        if (!list || !card) return;
        list.scrollBy({ left: dir * (card.offsetWidth + 10), behavior: 'smooth' });
    };

    return (
        <div className="cy-gallery">
            <button className="cy-gallery-arrow left" onClick={() => scrollBy(-1)} aria-label="이전 사진">‹</button>

            <div className="cy-gallery-list" ref={listRef}>
                {photos.map((photo, i) => (
                    <button
                        key={photo.id}
                        className={`cy-gallery-card ${selectedId === photo.id ? 'selected' : ''}`}
                        onClick={() => {
                            setSelectedId(photo.id);
                            setOpenPhoto(photo);
                        }}
                    >
                        <div className="cy-gallery-thumb">
                            <img src={photo.thumb} alt={photo.alt} loading="lazy" decoding="async" />
                        </div>
                        <div className="cy-gallery-caption">{photo.alt}</div>
                        <div className="cy-gallery-author">{i % 2 === 0 ? groom.name : bride.name}</div>
                    </button>
                ))}
            </div>

            <button className="cy-gallery-arrow right" onClick={() => scrollBy(1)} aria-label="다음 사진">›</button>

            {openPhoto && (
                <div className="cy-gallery-modal" onClick={() => setOpenPhoto(null)}>
                    <img src={openPhoto.src} alt={openPhoto.alt} />
                    <p>{openPhoto.alt}</p>
                </div>
            )}
        </div>
    );
}

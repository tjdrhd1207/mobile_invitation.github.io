import { useState } from 'react';
import { photos } from '../component/PolaroidGallery';
import CyPhotoViewer from './CyPhotoViewer';

// 바둑판 한 페이지: 3열 x 4행
const PAGE_SIZE = 12;
const totalPages = Math.ceil(photos.length / PAGE_SIZE);

const viewerImages = photos.map(photo => ({ key: photo.id, src: photo.src }));

export default function CyGallery() {
    const [selectedId, setSelectedId] = useState<number>(photos[0].id);
    // 크게 보고 있는 사진의 순번 (닫혀 있으면 null)
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [page, setPage] = useState(0);
    const pagePhotos = photos.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    const show = (index: number) => {
        setOpenIndex(index);
        setSelectedId(photos[index].id);
        // 넘기다가 다른 페이지 사진이 되면 바둑판 페이지도 따라감
        setPage(Math.floor(index / PAGE_SIZE));
    };

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

            {openIndex !== null && (
                <CyPhotoViewer
                    images={viewerImages}
                    index={openIndex}
                    onChange={show}
                    onClose={() => setOpenIndex(null)}
                />
            )}
        </div>
    );
}

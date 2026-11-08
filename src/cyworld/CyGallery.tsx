import { useState } from 'react';
import { photos, type Photo } from '../component/PolaroidGallery';

// 바둑판 한 페이지: 3열 x 4행
const PAGE_SIZE = 12;
const totalPages = Math.ceil(photos.length / PAGE_SIZE);

export default function CyGallery() {
    const [selectedId, setSelectedId] = useState<number>(photos[0].id);
    const [openPhoto, setOpenPhoto] = useState<Photo | null>(null);
    const [page, setPage] = useState(0);
    const pagePhotos = photos.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    const open = (photo: Photo) => {
        setSelectedId(photo.id);
        setOpenPhoto(photo);
    };

    return (
        <div>
            <div className="cy-gallery-grid">
                {pagePhotos.map((photo) => (
                    <button
                        key={photo.id}
                        className={`cy-gallery-grid-item ${selectedId === photo.id ? 'selected' : ''}`}
                        onClick={() => open(photo)}
                        aria-label={photo.alt}
                    >
                        <img src={photo.thumb} alt={photo.alt} loading="lazy" decoding="async" />
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

            {openPhoto && (
                <div className="cy-gallery-modal" onClick={() => setOpenPhoto(null)}>
                    <img src={openPhoto.src} alt={openPhoto.alt} />
                    <p>{openPhoto.alt}</p>
                </div>
            )}
        </div>
    );
}

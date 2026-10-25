import { useState } from 'react';
import { photos, type Photo } from './PolaroidGallery';

// 1번 사진은 세로로 길게, 정사각형 사진은 짧게, 나머지는 기본 높이
const getSpan = (photo: Photo) => {
  if (photo.id === 1) return 4;
  return photo.square ? 2 : 3;
};

export default function GridGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <section className="grid-gallery">
      <div className="grid-gallery-grid">
        {photos.map((photo) => (
          <button
            key={photo.id}
            className="grid-gallery-item"
            style={{ gridRow: `span ${getSpan(photo)}` }}
            onClick={() => setSelectedPhoto(photo)}
            aria-label={`${photo.alt} 확대하기`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="gallery-modal"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="gallery-close"
            onClick={() => setSelectedPhoto(null)}
            aria-label="사진 닫기"
          >
            ×
          </button>

          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

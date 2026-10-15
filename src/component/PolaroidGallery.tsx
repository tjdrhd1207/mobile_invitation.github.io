import photo1 from '../assets/polaroid/photo1.webp';
import photo2 from '../assets/polaroid/photo2.webp';
import photo3 from '../assets/polaroid/photo3.webp';
import photo4 from '../assets/polaroid/photo4.webp';
import photo5 from '../assets/polaroid/photo5.webp';
import photo6 from '../assets/polaroid/photo6.webp';
import photo7 from '../assets/polaroid/photo7.webp';
import photo8 from '../assets/polaroid/photo8.webp';
import photo9 from '../assets/polaroid/photo9.webp';
import photo10 from '../assets/polaroid/photo10.webp';
import { useState, type CSSProperties } from 'react';

type Photo = {
  id: number;
  src: string;
  alt: string;
  rotate: number;
  square?: boolean;
};

const photos: Photo[] = [
  { id: 1, src: photo1, alt: '우리의 첫 번째 추억', rotate: -4 },
  { id: 2, src: photo2, alt: '함께한 소중한 순간', rotate: 8 },
  { id: 3, src: photo3, alt: '우리의 행복한 하루', rotate: -8, square: true },
  { id: 4, src: photo4, alt: '함께 찍은 사진', rotate: 5 },
  { id: 5, src: photo5, alt: '우리의 첫 번째 추억', rotate: -10 },
  { id: 6, src: photo6, alt: '함께한 소중한 순간', rotate: 15, square: true },
  { id: 7, src: photo7, alt: '우리의 행복한 하루', rotate: 2 },
  { id: 8, src: photo8, alt: '함께 찍은 사진', rotate: 5, square: true },
  { id: 9, src: photo9, alt: '우리의 행복한 하루', rotate: -2, square: true },
  { id: 10, src: photo10, alt: '함께 찍은 사진', rotate: 5 },

];

export default function PolaroidGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <section className="polaroid-gallery">
      <div className="gallery-grid">
        {photos.map((photo: any) => (
          <button
            key={photo.id}
            className="gallery-item"
            style={{ '--rotate': `${photo.rotate}deg` } as CSSProperties}
            onClick={() => setSelectedPhoto(photo)}
            aria-label={`${photo.alt} 확대하기`}
          >
            <div className="polaroid">
              <img
                className={photo.square ? 'square-photo' : ''}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
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
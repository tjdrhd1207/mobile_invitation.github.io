import photo1 from '../assets/polaroid/photo1.webp?w=1280&format=webp&imagetools';
import thumb1 from '../assets/polaroid/photo1.webp?w=240&format=webp&imagetools';
import photo2 from '../assets/polaroid/photo2.webp?w=1280&format=webp&imagetools';
import thumb2 from '../assets/polaroid/photo2.webp?w=240&format=webp&imagetools';
import photo3 from '../assets/polaroid/photo3.webp?w=1280&format=webp&imagetools';
import thumb3 from '../assets/polaroid/photo3.webp?w=240&format=webp&imagetools';
import photo4 from '../assets/polaroid/photo4.webp?w=1280&format=webp&imagetools';
import thumb4 from '../assets/polaroid/photo4.webp?w=240&format=webp&imagetools';
import photo5 from '../assets/polaroid/photo5.webp?w=1280&format=webp&imagetools';
import thumb5 from '../assets/polaroid/photo5.webp?w=240&format=webp&imagetools';
import photo6 from '../assets/polaroid/photo6.webp?w=1280&format=webp&imagetools';
import thumb6 from '../assets/polaroid/photo6.webp?w=240&format=webp&imagetools';
import photo7 from '../assets/polaroid/photo7.webp?w=1280&format=webp&imagetools';
import thumb7 from '../assets/polaroid/photo7.webp?w=240&format=webp&imagetools';
import photo8 from '../assets/polaroid/photo8.webp?w=1280&format=webp&imagetools';
import thumb8 from '../assets/polaroid/photo8.webp?w=240&format=webp&imagetools';
import photo9 from '../assets/polaroid/photo9.webp?w=1280&format=webp&imagetools';
import thumb9 from '../assets/polaroid/photo9.webp?w=240&format=webp&imagetools';
import photo10 from '../assets/polaroid/photo10.webp?w=1280&format=webp&imagetools';
import thumb10 from '../assets/polaroid/photo10.webp?w=240&format=webp&imagetools';
import photo11 from '../assets/polaroid/photo11.webp?w=1280&format=webp&imagetools';
import thumb11 from '../assets/polaroid/photo11.webp?w=240&format=webp&imagetools';
import photo12 from '../assets/polaroid/photo12.webp?w=1280&format=webp&imagetools';
import thumb12 from '../assets/polaroid/photo12.webp?w=240&format=webp&imagetools';
import photo13 from '../assets/polaroid/photo13.webp?w=1280&format=webp&imagetools';
import thumb13 from '../assets/polaroid/photo13.webp?w=240&format=webp&imagetools';
import photo14 from '../assets/polaroid/photo14.webp?w=1280&format=webp&imagetools';
import thumb14 from '../assets/polaroid/photo14.webp?w=240&format=webp&imagetools';
import photo15 from '../assets/polaroid/photo15.webp?w=1280&format=webp&imagetools';
import thumb15 from '../assets/polaroid/photo15.webp?w=240&format=webp&imagetools';
import photo16 from '../assets/polaroid/photo16.webp?w=1280&format=webp&imagetools';
import thumb16 from '../assets/polaroid/photo16.webp?w=240&format=webp&imagetools';
import photo17 from '../assets/polaroid/photo17.webp?w=1280&format=webp&imagetools';
import thumb17 from '../assets/polaroid/photo17.webp?w=240&format=webp&imagetools';
import photo18 from '../assets/polaroid/photo18.webp?w=1280&format=webp&imagetools';
import thumb18 from '../assets/polaroid/photo18.webp?w=240&format=webp&imagetools';
import photo19 from '../assets/polaroid/photo19.webp?w=1280&format=webp&imagetools';
import thumb19 from '../assets/polaroid/photo19.webp?w=240&format=webp&imagetools';
import photo20 from '../assets/polaroid/photo20.webp?w=1280&format=webp&imagetools';
import thumb20 from '../assets/polaroid/photo20.webp?w=240&format=webp&imagetools';
import photo21 from '../assets/polaroid/photo21.webp?w=1280&format=webp&imagetools';
import thumb21 from '../assets/polaroid/photo21.webp?w=240&format=webp&imagetools';

import { useState, type CSSProperties } from 'react';

export type Photo = {
  id: number;
  src: string;
  thumb: string;
  rotate: number;
  square?: boolean;
};

export const photos: Photo[] = [
  { id: 1, src: photo1, thumb: thumb1, rotate: -4 },
  { id: 2, src: photo2, thumb: thumb2, rotate: 8 },
  { id: 3, src: photo3, thumb: thumb3, rotate: -8, square: true },
  { id: 4, src: photo4, thumb: thumb4, rotate: 5 },
  { id: 5, src: photo5, thumb: thumb5, rotate: -10 },
  { id: 6, src: photo6, thumb: thumb6, rotate: 15, square: true },
  { id: 7, src: photo7, thumb: thumb7, rotate: 2 },
  { id: 8, src: photo8, thumb: thumb8, rotate: 5, square: true },
  { id: 9, src: photo9, thumb: thumb9, rotate: -2, square: true },
  { id: 10, src: photo10, thumb: thumb10, rotate: 5 },
  { id: 11, src: photo11, thumb: thumb11, rotate: -4 },
  { id: 12, src: photo12, thumb: thumb12, rotate: 8 },
  { id: 13, src: photo13, thumb: thumb13, rotate: -8, square: true },
  { id: 14, src: photo14, thumb: thumb14, rotate: 5 },
  { id: 15, src: photo15, thumb: thumb15, rotate: -10 },
  { id: 16, src: photo16, thumb: thumb16, rotate: 15, square: true },
  { id: 17, src: photo17, thumb: thumb17, rotate: 2 },
  { id: 18, src: photo18, thumb: thumb18, rotate: 5, square: true },
  { id: 19, src: photo19, thumb: thumb19, rotate: -2, square: true },
  { id: 20, src: photo20, thumb: thumb20, rotate: 5 },
  { id: 21, src: photo21, thumb: thumb21, rotate: 5 },
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
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
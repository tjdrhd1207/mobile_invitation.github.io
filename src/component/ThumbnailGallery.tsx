import { useState } from 'react';
import { photos } from './PolaroidGallery';

export default function ThumbnailGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedPhoto = photos[selectedIndex];

  return (
    <section className="thumb-gallery">
      <h2 className="thumb-gallery-title">GALLERY</h2>

      <div className="thumb-gallery-main">
        <img
          key={selectedPhoto.id}
          src={selectedPhoto.src}
          alt={selectedPhoto.alt}
          decoding="async"
        />
      </div>

      <div className="thumb-gallery-list">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            className={`thumb-gallery-item ${index === selectedIndex ? 'is-active' : ''}`}
            onClick={(e) => {
              setSelectedIndex(index);
              e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }}
            aria-label={`${photo.alt} 보기`}
          >
            <img
              src={photo.src}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
    </section>
  );
}

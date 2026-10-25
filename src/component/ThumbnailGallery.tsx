import { useRef, useState } from 'react';
import { photos } from './PolaroidGallery';

export default function ThumbnailGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const selectedPhoto = photos[selectedIndex];

  const selectPhoto = (index: number) => {
    // 처음/끝에서 넘기면 반대쪽으로 이어지도록
    const nextIndex = (index + photos.length) % photos.length;
    setSelectedIndex(nextIndex);

    // 페이지는 그대로 두고 썸네일 줄만 가로로 스크롤
    const list = listRef.current;
    const item = list?.children[nextIndex] as HTMLElement | undefined;
    if (!list || !item) return;

    list.scrollTo({
      left: item.offsetLeft - list.offsetLeft - (list.clientWidth - item.clientWidth) / 2,
      behavior: 'smooth',
    });
  };

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

        <button
          className="thumb-gallery-arrow prev"
          onClick={() => selectPhoto(selectedIndex - 1)}
          aria-label="이전 사진"
        >
          ‹
        </button>
        <button
          className="thumb-gallery-arrow next"
          onClick={() => selectPhoto(selectedIndex + 1)}
          aria-label="다음 사진"
        >
          ›
        </button>
      </div>

      <div className="thumb-gallery-list" ref={listRef}>
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            className={`thumb-gallery-item ${index === selectedIndex ? 'is-active' : ''}`}
            onClick={() => selectPhoto(index)}
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

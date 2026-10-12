import photo1 from '../assets/gallery/photo1.png';
import photo2 from '../assets/gallery/photo2.png';
import photo3 from '../assets/gallery/photo3.png';
import photo4 from '../assets/gallery/photo4.png';
import photo5 from '../assets/gallery/photo5.png';
import photo6 from '../assets/gallery/photo6.png';
import photo7 from '../assets/gallery/photo7.png';
import photo8 from '../assets/gallery/photo8.png';
import photo9 from '../assets/gallery/photo9.png';
import photo10 from '../assets/gallery/photo10.png';
import { useState, type CSSProperties } from 'react';


const photos = [
    { id: 1, src: photo1, alt: '우리의 첫 번째 추억', rotate: -4 },
    { id: 2, src: photo2, alt: '함께한 소중한 순간', rotate: 3 },
    { id: 3, src: photo3, alt: '우리의 행복한 하루', rotate: -2 },
    { id: 4, src: photo4, alt: '함께 찍은 사진', rotate: 5 },
    { id: 5, src: photo5, alt: '우리의 첫 번째 추억', rotate: -4 },
    { id: 6, src: photo6, alt: '함께한 소중한 순간', rotate: 3 },
    { id: 7, src: photo7, alt: '우리의 행복한 하루', rotate: -2 },
    { id: 8, src: photo8, alt: '함께 찍은 사진', rotate: 5 },
    { id: 9, src: photo9, alt: '우리의 행복한 하루', rotate: -2 },
    { id: 10, src: photo10, alt: '함께 찍은 사진', rotate: 5 },

];

export default function PolaroidGallery() {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <section className="polaroid-gallery">
            <div className="gallery-grid">
                {photos.map((photo: any) =>
                (
                    <button
                        key={photo.id}
                        className="gallery-item"
                        style={{ '--rotate': `${photo.rotate}deg` } as CSSProperties}
                        onClick={() => setSelectedPhoto(photo)}
                        aria-label={`${photo.alt} 확대하기`}
                    >
                        <div className='polaroid'>
                            <img src={photo.src} alt={photo.alt} />
                        </div>

                    </button>
                )
                )}
            </div>
        </section>
    )
}
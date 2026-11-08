import { useEffect, useState } from 'react';
import proposeImage1 from '../assets/propose1.webp?w=860&format=webp&imagetools';
import proposeImage2 from '../assets/propose2.webp?w=860&format=webp&imagetools';
import proposeImage3 from '../assets/propose3.webp?w=860&format=webp&imagetools';
import proposeImage4 from '../assets/propose4.webp?w=860&format=webp&imagetools';

const proposePixel = [proposeImage1, proposeImage2, proposeImage3, proposeImage4];

export default function CyMiniRoom() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % proposePixel.length);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2 className="cy-section-title">Mini Room</h2>
            <div className="cy-miniroom" >
                {proposePixel.map((src, i) => (
                    <img
                        key={src}
                        src={src}
                        alt={i === index ? '미니룸' : ''}
                        aria-hidden={i !== index}
                        className={i === index ? 'is-active' : ''}
                    />
                ))}
            </div>
        </div>
    )
}
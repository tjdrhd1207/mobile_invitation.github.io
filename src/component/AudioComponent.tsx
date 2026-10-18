import audioIcon from '../assets/audio.svg'
import { useEffect, useRef, useState } from 'react';
import audioFile from '../assets/background_music.mp3';

export default function AudioComponent() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const handleAudioToggle = () => {
        // 버튼을 누르는 순간 load되게 만들어줌
        // 미리 load할 경우 iphone에서 문제가 발생함
        if (!audioRef.current) {
            audioRef.current = new Audio(audioFile);
            audioRef.current.addEventListener('ended', () => {
                setIsPlaying(false)
            });
        }

        // 재생 상태 전환
        setIsPlaying(prev => !prev);
    }

    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.play().catch((error) => {
                console.error('오디오 재생 실패:', error);
                setIsPlaying(false);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);


    return (
        <>
            <div style={{ textAlign: "right" }}>
                <img
                    src={audioIcon}
                    alt="배경음악 및 일시정지"
                    width={"20px"}
                    style={{ marginRight: "10px", marginTop: "10px" }}
                    onClick={() => handleAudioToggle()}
                />
            </div>
        </>
    );
}
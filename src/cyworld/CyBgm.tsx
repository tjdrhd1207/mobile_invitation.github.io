import { useEffect, useRef, useState } from 'react';
import bgmFile from '../assets/bgm/Alex.mp3';

const BGM_TITLE = 'Alex - 화분';

export default function CyBgm() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [scrapped, setScrapped] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const toggle = () => {
        // 버튼을 누르는 순간 load (미리 load하면 iPhone에서 문제가 생김)
        if (!audioRef.current) {
            audioRef.current = new Audio(bgmFile);
            audioRef.current.loop = true;
        }
        setIsPlaying(prev => !prev);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.play().catch(() => setIsPlaying(false));
        } else {
            audio.pause();
        }
    }, [isPlaying]);

    // 페이지를 떠나면 정지
    useEffect(() => () => audioRef.current?.pause(), []);

    // 스크랩 = 청첩장 링크 복사
    const scrap = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setScrapped(true);
            setTimeout(() => setScrapped(false), 1500);
        } catch {
            // 클립보드 권한이 없으면 무시
        }
    };

    return (
        <div className="cy-bgm-player">
            {/* 재생 중에는 곡 제목이 왼쪽→오른쪽으로 흐르고, 정지하면 그 자리에 멈춤 */}
            <div className="cy-bgm-title" aria-label={`배경음악 ${BGM_TITLE}`}>
                <span className={isPlaying ? 'playing' : ''}>{BGM_TITLE}</span>
            </div>
            <button type="button" onClick={scrap}>{scrapped ? '복사됨' : '스크랩'}</button>
            <span className="cy-bgm-divider">|</span>
            <button type="button" onClick={toggle} aria-pressed={isPlaying}>
                {isPlaying ? '음악정지' : '음악재생'}
            </button>
            <span className={`cy-bgm-icon ${isPlaying ? 'playing' : ''}`} aria-hidden="true">
                {isPlaying ? '❚❚' : '▶'}
            </span>
        </div>
    );
}

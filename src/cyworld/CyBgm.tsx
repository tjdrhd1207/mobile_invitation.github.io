import { useEffect, useRef, useState } from 'react';
import alex from '../assets/bgm/Alex.mp3';
import iwill from '../assets/bgm/iwill.mp3';
import goback from '../assets/bgm/goback.mp3';
import propose from '../assets/bgm/propose.mp3';

// 재생 목록: 순서대로 재생되고, 마지막 곡이 끝나면 처음으로 돌아감
const PLAYLIST = [
    { title: 'Alex - 화분', src: alex },
    { title: 'Beatles - i will', src: iwill },
    { title: '이수훈 - 고백', src: goback },
    { title: '노을 - 청혼', src: propose },
];

export default function CyBgm() {
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [scrapped, setScrapped] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const track = PLAYLIST[index];

    // 버튼을 누르는 순간 load (미리 load하면 iPhone에서 문제가 생김)
    const getAudio = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio(PLAYLIST[index].src);
            audioRef.current.addEventListener('ended', () => move(1));
        }
        return audioRef.current;
    };

    const toggle = () => {
        getAudio();
        setIsPlaying(prev => !prev);
    };

    const move = (dir: 1 | -1) =>
        setIndex(prev => (prev + dir + PLAYLIST.length) % PLAYLIST.length);

    // 곡이 바뀌면 파일 교체 (재생 중이었다면 아래 effect에서 이어서 재생)
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.src = PLAYLIST[index].src;
        if (isPlaying) audio.play().catch(() => setIsPlaying(false));
    }, [index]);

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
            <div className="cy-bgm-title" aria-label={`배경음악 ${track.title}`}>
                {/* key를 바꿔서 곡이 바뀔 때마다 흐르는 위치를 처음부터 */}
                <span key={index} className={isPlaying ? 'playing' : ''}>{track.title}</span>
            </div>
            <button type="button" onClick={scrap}>{scrapped ? '복사됨' : '스크랩'}</button>
            <span className="cy-bgm-divider">|</span>
            {/* 모바일에서는 아래 ▶ 버튼과 역할이 같아서 숨김 */}
            <button type="button" className="cy-bgm-toggle-text" onClick={toggle} aria-pressed={isPlaying}>
                {isPlaying ? '음악정지' : '음악재생'}
            </button>
            <div className="cy-bgm-controls">
                <button type="button" className="cy-bgm-icon" onClick={() => move(-1)} aria-label="이전 곡">◀◀</button>
                <button
                    type="button"
                    className={`cy-bgm-icon ${isPlaying ? 'playing' : ''}`}
                    onClick={toggle}
                    aria-label={isPlaying ? '일시정지' : '재생'}
                >
                    {isPlaying ? '❚❚' : '▶'}
                </button>
                <button type="button" className="cy-bgm-icon" onClick={() => move(1)} aria-label="다음 곡">▶▶</button>
            </div>
        </div>
    );
}

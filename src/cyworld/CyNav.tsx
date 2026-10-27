import { useEffect, useRef, useState } from 'react';

// 탭 이름과 이동할 섹션 id (CyworldApp의 section id와 맞춰야 함)
export const NAV_ITEMS = [
    { id: 'cy-home', label: '홈' },
    { id: 'cy-introduce', label: '소개' },
    { id: 'cy-miniroom', label: '미니룸' },
    { id: 'cy-gallery', label: '사진첩' },
    { id: 'cy-calendar', label: '달력' },
    { id: 'cy-location', label: '오시는길' },
    { id: 'cy-account', label: '마음전달' },
    { id: 'cy-guestbook', label: '방명록' },
];

export default function CyNav() {
    const [activeId, setActiveId] = useState(NAV_ITEMS[0].id);
    // 탭 클릭으로 스크롤 중일 때는 지나가는 섹션들로 탭이 바뀌지 않도록 잠금
    const isClickScrolling = useRef(false);

    // 화면 위쪽 1/3 지점을 지나가는 섹션을 현재 탭으로 표시
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (isClickScrolling.current) return;
                entries.forEach(entry => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: '-30% 0px -65% 0px' }
        );

        NAV_ITEMS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const moveTo = (id: string) => {
        setActiveId(id);
        isClickScrolling.current = true;

        // 스크롤 이벤트가 150ms 동안 없으면 스크롤이 끝난 것으로 보고 잠금 해제
        // (이미 그 위치라 스크롤이 안 일어나는 경우도 150ms 뒤 해제됨)
        let timer = window.setTimeout(unlock, 150);
        function onScroll() {
            window.clearTimeout(timer);
            timer = window.setTimeout(unlock, 150);
        }
        function unlock() {
            isClickScrolling.current = false;
            window.removeEventListener('scroll', onScroll);
        }
        window.addEventListener('scroll', onScroll, { passive: true });


        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <nav className="cy-nav" aria-label="미니홈피 메뉴">
            {NAV_ITEMS.map(item => (
                <button
                    key={item.id}
                    type="button"
                    className={activeId === item.id ? 'active' : ''}
                    aria-current={activeId === item.id ? 'true' : undefined}
                    onClick={() => moveTo(item.id)}
                >
                    {item.label}
                </button>
            ))}
        </nav>
    );
}

import { useEffect, useState } from 'react';

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

    // 화면 위쪽 1/3 지점을 지나가는 섹션을 현재 탭으로 표시
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
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
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveId(id);
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

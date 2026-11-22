import { useEffect, useRef, useState } from 'react';

// 탭 이름과 이동할 섹션 id (CyworldApp의 section id·순서와 맞춰야 함)
export const NAV_ITEMS = [
    { id: 'cy-home', label: '홈' },
    { id: 'cy-introduce', label: '소개' },
    { id: 'cy-location', label: '오시는길' },
    { id: 'cy-miniroom', label: '미니룸' },
    { id: 'cy-calendar', label: '달력' },
    { id: 'cy-gallery', label: '사진첩' },
    { id: 'cy-account', label: '마음전달' },
    { id: 'cy-guestbook', label: '방명록' },
];

// 화면 맨 위에서 이 거리(px) 안에 섹션 윗부분이 들어오면 그 섹션을 현재 탭으로 봄
// (위에 고정된 탭 메뉴 높이 + CSS의 scroll-margin-top 56px보다 조금 크게)
const ACTIVE_LINE = 80;

// 현재 스크롤 위치에서 보고 있는 섹션 id
function findActiveId() {
    const sections = NAV_ITEMS
        .map(({ id }) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return NAV_ITEMS[0].id;

    // 페이지 맨 아래: 마지막 섹션이 화면 위까지 못 올라오므로 화면에 보이는 마지막 섹션
    const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) {
        const visible = sections.filter(el => el.getBoundingClientRect().top < window.innerHeight);
        return (visible[visible.length - 1] ?? sections[0]).id;
    }

    // 윗부분이 기준선을 지난 섹션 중 마지막 것
    let active = sections[0];
    for (const el of sections) {
        if (el.getBoundingClientRect().top <= ACTIVE_LINE) active = el;
        else break;
    }
    return active.id;
}

export default function CyNav() {
    const [activeId, setActiveId] = useState(NAV_ITEMS[0].id);
    // 탭을 눌러 이동한 뒤에는, 사용자가 직접 스크롤하기 전까지 누른 탭을 유지
    // (시간으로 스크롤 끝을 추측하면 모바일에서 옆 탭이 깜빡이는 문제가 있었음)
    const lockedByClick = useRef(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let frame = 0;
        const onScroll = () => {
            if (lockedByClick.current || frame) return;
            // 스크롤 중 계산은 한 프레임에 한 번만
            frame = requestAnimationFrame(() => {
                frame = 0;
                if (!lockedByClick.current) setActiveId(findActiveId());
            });
        };

        // 사용자가 직접 스크롤을 시작하면 잠금 해제
        // 단, 탭 메뉴 안을 누른 것은 제외: 탭을 누를 때도 touchstart/mousedown이 click보다 먼저 와서,
        // 이전 이동 스크롤이 진행 중이면 그 순간 지나가던 섹션(예: 오시는길)이 깜빡였음
        const unlock = (e: Event) => {
            if (e.target instanceof Node && navRef.current?.contains(e.target)) return;
            lockedByClick.current = false;
        };
        const onKey = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) unlock(e);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('wheel', unlock, { passive: true });
        window.addEventListener('touchstart', unlock, { passive: true });
        // PC에서 스크롤바를 끌어서 움직이는 경우
        window.addEventListener('mousedown', unlock);
        window.addEventListener('keydown', onKey);
        setActiveId(findActiveId());

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('wheel', unlock);
            window.removeEventListener('touchstart', unlock);
            window.removeEventListener('mousedown', unlock);
            window.removeEventListener('keydown', onKey);
        };
    }, []);

    // 탭 메뉴가 화면보다 넓을 때, 현재 탭이 가운데 보이도록 탭 줄을 가로로 스크롤
    useEffect(() => {
        const nav = navRef.current;
        const active = nav?.querySelector<HTMLButtonElement>('button.active');
        if (!nav || !active) return;
        const left = active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2;
        nav.scrollTo({ left, behavior: 'smooth' });
    }, [activeId]);

    const moveTo = (id: string) => {
        setActiveId(id);
        lockedByClick.current = true;
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <nav className="cy-nav" aria-label="미니홈피 메뉴" ref={navRef}>
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

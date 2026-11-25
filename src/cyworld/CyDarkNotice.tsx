import { useEffect, useState } from 'react';

const CLOSED_KEY = 'cy-dark-notice-closed';
const DARK_QUERY = '(prefers-color-scheme: dark)';

// 삼성인터넷은 자체 다크모드로 페이지 색을 강제로 바꾸고, 사이트에서 막을 방법이 없음
// → 삼성인터넷 + 다크모드일 때만 다크모드를 끄는 방법을 안내
const isSamsungBrowser = () => /SamsungBrowser/i.test(navigator.userAgent);

function wasClosed() {
    try {
        return localStorage.getItem(CLOSED_KEY) === '1';
    } catch {
        return false;
    }
}

export default function CyDarkNotice() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!isSamsungBrowser() || wasClosed()) return;

        const media = window.matchMedia(DARK_QUERY);
        const update = () => setVisible(media.matches);
        update();
        // 보는 도중에 다크모드를 끄거나 켜도 따라감
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);

    const close = () => {
        setVisible(false);
        try {
            localStorage.setItem(CLOSED_KEY, '1');
        } catch {
            // 저장이 막힌 환경이면 이번에만 닫힘
        }
    };

    if (!visible) return null;

    return (
        <div className="cy-dark-notice" role="note">
            <p>
                🌙 다크 모드에서는 색이 다르게 보일 수 있어요.
                <br />
                메뉴(≡)에서 <b>다크 모드</b>를 끄면 원래 색으로 보여요.
            </p>
            <button type="button" onClick={close} aria-label="안내 닫기">✕</button>
        </div>
    );
}

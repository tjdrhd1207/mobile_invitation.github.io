import { useEffect, useState } from 'react';

const CLOSED_KEY = 'cy-dark-notice-closed';

// 삼성인터넷은 자체 다크모드로 페이지 색을 강제로 바꾸고, 사이트에서 막을 방법이 없음
// 게다가 그 다크모드가 켜져 있어도 prefers-color-scheme: dark 로 알려주지 않아서
// 다크모드인지 알 수 없음 → 삼성인터넷이면 모두에게 안내 (✕로 닫으면 다시 안 보임)
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
        setVisible(isSamsungBrowser() && !wasClosed());
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
                🌙 다크 모드를 사용 중이시면 색이 다르게 보일 수 있어요.
                <br />
                메뉴(≡)에서 <b>다크 모드</b>를 끄면 원래 색으로 보여요.
            </p>
            <button type="button" onClick={close} aria-label="안내 닫기">✕</button>
        </div>
    );
}

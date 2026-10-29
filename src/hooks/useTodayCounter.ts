import { useEffect, useState } from 'react';

type Counts = { today: number; total: number };

const COUNTED_KEY = 'cy-today-counted';

// 한국 시간 기준 오늘 날짜 (YYYY-MM-DD) → Firestore 문서 id로 사용
const todayKey = () =>
    new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(new Date());

// 같은 기기에서는 하루 한 번만 집계 (새로고침으로 숫자가 부풀지 않게)
function alreadyCounted(key: string) {
    try {
        return localStorage.getItem(COUNTED_KEY) === key;
    } catch {
        return false;
    }
}

function markCounted(key: string) {
    try {
        localStorage.setItem(COUNTED_KEY, key);
    } catch {
        // 저장이 막힌 환경(사생활 보호 모드 등)이면 무시
    }
}

// StrictMode에서 effect가 두 번 실행돼도 한 번만 요청하도록 모듈에 보관
let request: Promise<Counts | null> | null = null;

async function countVisit(): Promise<Counts | null> {
    const { db } = await import('../lib/firebase');
    if (!db) return null;

    const { doc, getDoc, setDoc, increment } = await import('firebase/firestore/lite');
    const key = todayKey();
    const todayRef = doc(db, 'visits', key);
    const totalRef = doc(db, 'visits', 'total');

    if (!alreadyCounted(key)) {
        await Promise.all([
            setDoc(todayRef, { count: increment(1) }, { merge: true }),
            setDoc(totalRef, { count: increment(1) }, { merge: true }),
        ]);
        markCounted(key);
    }

    const [todaySnap, totalSnap] = await Promise.all([getDoc(todayRef), getDoc(totalRef)]);
    return {
        today: todaySnap.data()?.count ?? 0,
        total: totalSnap.data()?.count ?? 0,
    };
}

/** 방문자 TODAY / TOTAL. 불러오는 중이거나 실패하면 null */
export function useTodayCounter() {
    const [counts, setCounts] = useState<Counts | null>(null);

    useEffect(() => {
        let cancelled = false;
        request ??= countVisit().catch(() => null);
        request.then(result => {
            if (!cancelled) setCounts(result);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    return counts;
}

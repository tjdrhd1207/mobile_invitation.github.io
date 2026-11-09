import { useEffect, useRef, useState, type FormEvent } from 'react';
import MinimiEditor from './MinimiEditor';
import { DEFAULT_MINIMI, normalizeMinimi, renderMinimi, type MinimiConfig } from './minimiParts';

const NAME_MAX = 10;
const MESSAGE_MAX = 200;
// 처음에 한 번에 불러오는 최대 글 수 (페이지는 화면에서 나눔)
const LIST_LIMIT = 300;
// 한 페이지에 보여줄 글 수 / 한 번에 보여줄 페이지 번호 수
const PAGE_SIZE = 5;
const PAGE_GROUP = 5;

type Entry = {
    id: string;
    no: number;
    name: string;
    message: string;
    minimi: MinimiConfig;
    createdAt: Date | null;
};

// 2026.11.08 22:30 (한국 시간)
const formatDate = (date: Date) => {
    const p = Object.fromEntries(
        new Intl.DateTimeFormat('ko-KR', {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23',
        })
            .formatToParts(date)
            .map(part => [part.type, part.value]),
    );
    return `${p.year}.${p.month}.${p.day} ${p.hour}:${p.minute}`;
};

async function loadEntries(): Promise<Entry[] | null> {
    const { db } = await import('../lib/firebase');
    if (!db) return null;

    const { collection, getDocs, getCount, query, orderBy, limit } = await import('firebase/firestore/lite');
    const ref = collection(db, 'guestbook');
    const [snap, count] = await Promise.all([
        getDocs(query(ref, orderBy('createdAt', 'desc'), limit(LIST_LIMIT))),
        getCount(ref),
    ]);
    const total = count.data().count;

    return snap.docs.map((doc, i) => {
        const data = doc.data();
        return {
            id: doc.id,
            no: total - i,
            name: String(data.name ?? ''),
            message: String(data.message ?? ''),
            minimi: normalizeMinimi(data.minimi),
            createdAt: data.createdAt?.toDate?.() ?? null,
        };
    });
}

async function addEntry(name: string, message: string, minimi: MinimiConfig) {
    const { db } = await import('../lib/firebase');
    if (!db) throw new Error('Firebase가 설정되지 않았습니다.');

    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore/lite');
    await addDoc(collection(db, 'guestbook'), { name, message, minimi, createdAt: serverTimestamp() });
}

export default function CyGuestbook() {
    const [entries, setEntries] = useState<Entry[] | null>(null);
    const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable' | 'error'>('loading');

    const [writing, setWriting] = useState(false);
    const [minimi, setMinimi] = useState<MinimiConfig>(DEFAULT_MINIMI);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const [page, setPage] = useState(0);
    const listRef = useRef<HTMLUListElement>(null);
    const totalPages = Math.max(1, Math.ceil((entries?.length ?? 0) / PAGE_SIZE));
    const pageEntries = entries?.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE) ?? [];
    // 현재 페이지가 속한 번호 묶음 (1~5, 6~10, ...)
    const groupStart = Math.floor(page / PAGE_GROUP) * PAGE_GROUP;
    const groupEnd = Math.min(groupStart + PAGE_GROUP, totalPages);

    const goToPage = (next: number) => {
        setPage(next);
        // 페이지를 넘기면 목록 맨 위가 보이도록 (아래쪽 버튼을 누른 경우 대비)
        listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const refresh = () =>
        loadEntries()
            .then(result => {
                setEntries(result ?? []);
                setStatus(result ? 'ready' : 'unavailable');
            })
            .catch(() => setStatus('error'));

    useEffect(() => {
        refresh();
    }, []);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const trimmedName = name.trim();
        const trimmedMessage = message.trim();
        if (!trimmedName || !trimmedMessage || submitting) return;

        setSubmitting(true);
        try {
            await addEntry(trimmedName, trimmedMessage, minimi);
            setName('');
            setMessage('');
            setWriting(false);
            await refresh();
            // 새 글은 맨 앞에 오므로 첫 페이지로
            setPage(0);
        } catch {
            alert('방명록을 남기지 못했어요. 잠시 후 다시 시도해 주세요.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="cy-guestbook">
            {writing ? (
                <form className="cy-guestbook-form" onSubmit={onSubmit}>
                    <MinimiEditor value={minimi} onChange={setMinimi} />

                    <input
                        className="cy-guestbook-input"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        maxLength={NAME_MAX}
                        placeholder="이름"
                        aria-label="이름"
                        required
                    />
                    <textarea
                        className="cy-guestbook-input"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        maxLength={MESSAGE_MAX}
                        rows={3}
                        placeholder="축하 메시지를 남겨주세요."
                        aria-label="메시지"
                        required
                    />
                    <div className="cy-guestbook-actions">
                        <span className="cy-guestbook-count">
                            {message.length}/{MESSAGE_MAX}
                        </span>
                        <button type="button" onClick={() => setWriting(false)}>
                            취소
                        </button>
                        <button type="submit" className="primary" disabled={submitting}>
                            {submitting ? '등록 중…' : '등록'}
                        </button>
                    </div>
                </form>
            ) : (
                <button className="cy-guestbook-write" onClick={() => setWriting(true)} disabled={status === 'unavailable'}>
                    ✏️ 방명록 남기기
                </button>
            )}

            {status === 'loading' && <p className="cy-guestbook-empty">불러오는 중…</p>}
            {status === 'unavailable' && <p className="cy-guestbook-empty">방명록을 준비 중이에요.</p>}
            {status === 'error' && <p className="cy-guestbook-empty">방명록을 불러오지 못했어요.</p>}
            {status === 'ready' && entries?.length === 0 && (
                <p className="cy-guestbook-empty">첫 번째 방명록을 남겨주세요!</p>
            )}

            <ul className="cy-guestbook-list" ref={listRef}>
                {pageEntries.map(entry => (
                    <li key={entry.id} className="cy-guestbook-entry">
                        <div className="cy-guestbook-head">
                            <span className="cy-guestbook-no">NO.{entry.no}</span>
                            <span className="cy-guestbook-name">{entry.name}</span>
                            {entry.createdAt && (
                                <span className="cy-guestbook-date">({formatDate(entry.createdAt)})</span>
                            )}
                        </div>
                        <div className="cy-guestbook-body">
                            <div className="cy-guestbook-minimi">
                                <img src={renderMinimi(entry.minimi)} alt={`${entry.name}의 미니미`} />
                            </div>
                            <p className="cy-guestbook-message">{entry.message}</p>
                        </div>
                    </li>
                ))}
            </ul>

            {totalPages > 1 && (
                // 갤러리 페이지 버튼과 같은 모양
                <div className="cy-gallery-pager">
                    <button onClick={() => goToPage(page - 1)} disabled={page === 0} aria-label="이전 페이지">‹</button>
                    {Array.from({ length: groupEnd - groupStart }, (_, i) => groupStart + i).map(i => (
                        <button
                            key={i}
                            className={i === page ? 'active' : ''}
                            onClick={() => goToPage(i)}
                            aria-current={i === page ? 'page' : undefined}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => goToPage(page + 1)} disabled={page === totalPages - 1} aria-label="다음 페이지">›</button>
                </div>
            )}
        </div>
    );
}

import { useState } from 'react';
import { WEDDING } from '../data/wedding';

const { date, time, venue } = WEDDING;

const MONTH_NAMES = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];
const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const RING_COUNT = 6;

// 해당 월을 주 단위로 나눈 날짜 배열 (빈 칸은 null)
function buildWeeks(year: number, month: number) {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();
    const cells: (number | null)[] = [
        ...Array(firstDay).fill(null),
        ...Array.from({ length: lastDate }, (_, i) => i + 1),
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    const weeks: (number | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    return weeks;
}

export default function CyCalendar() {
    const [month, setMonth] = useState(date.month);
    const [checked, setChecked] = useState<boolean[]>([true, false, false]);

    const weeks = buildWeeks(date.year, month);
    const isWeddingMonth = month === date.month;

    const todos = [
        '청첩장 받기',
        `${date.month}/${date.day} ${time} 예식`,
        `${venue}로 축하하러 가기`,
    ];

    const toggle = (index: number) =>
        setChecked(prev => prev.map((v, i) => (i === index ? !v : v)));

    return (
        <div className="cy-cal">
            <div className="cy-cal-top">
                <span className="cy-cal-year">{date.year} /</span>
                <div className="cy-cal-tabs">
                    {MONTH_NAMES.map((_, i) => (
                        <button
                            key={i}
                            className={month === i + 1 ? 'active' : ''}
                            onClick={() => setMonth(i + 1)}
                        >
                            {String(i + 1).padStart(2, '0')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="cy-cal-book">
                <div className="cy-cal-left">
                    <div className="cy-cal-month">
                        {MONTH_NAMES[month - 1]} / {date.year}
                    </div>
                    {isWeddingMonth && (
                        <ul className="cy-cal-todos">
                            {todos.map((todo, i) => (
                                <li key={i} className={checked[i] ? 'done' : ''} onClick={() => toggle(i)}>
                                    <span className="cy-cal-checkbox">{checked[i] ? '✓' : ''}</span>
                                    {todo}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="cy-cal-rings" aria-hidden="true">
                    {Array.from({ length: RING_COUNT }, (_, i) => <span key={i} />)}
                </div>

                <div className="cy-cal-right">
                    <div className="cy-cal-weekdays">
                        {WEEKDAYS.map(w => <div key={w}>{w}</div>)}
                    </div>
                    <div className="cy-cal-grid">
                        {weeks.flat().map((day, i) => {
                            const isWedding = isWeddingMonth && day === date.day;
                            const dow = i % 7;
                            return (
                                <div
                                    key={i}
                                    className={[
                                        'cy-cal-cell',
                                        dow === 0 ? 'sun' : '',
                                        dow === 6 ? 'sat' : '',
                                        isWedding ? 'wedding' : '',
                                    ].join(' ')}
                                >
                                    {day !== null && <span className="cy-cal-num">{day}</span>}
                                    {isWedding && <span className="cy-cal-label">결혼식</span>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

import { WEDDING } from '../data/wedding';

const { date, time, dayOfWeek } = WEDDING;

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

// 결혼하는 달의 날짜 배열 (1일 앞 빈 칸은 null)
function buildDays(year: number, month: number) {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();
    return [
        ...Array(firstDay).fill(null),
        ...Array.from({ length: lastDate }, (_, i) => i + 1),
    ] as (number | null)[];
}

const DAYS = buildDays(date.year, date.month);

// "12:10" → "낮 12시 10분"
const [hour, minute] = time.split(':').map(Number);
const TIME_TEXT = `${hour < 12 ? '오전' : '낮'} ${hour > 12 ? hour - 12 : hour}시${minute ? ` ${minute}분` : ''}`;

// 오늘부터 결혼식까지 남은 날 수 (날짜만 비교)
function daysUntilWedding() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const wedding = new Date(date.year, date.month - 1, date.day);
    return Math.round((wedding.getTime() - today.getTime()) / 86400000);
}

function ddayText(days: number) {
    if (days > 0) return `D-${days}`;
    if (days === 0) return 'D-DAY';
    return `D+${-days}`;
}

export default function CyCalendar() {
    const days = daysUntilWedding();

    return (
        <div className="cy-cal">
            <div className="cy-cal-head">
                {date.year} . {String(date.month).padStart(2, '0')}
            </div>

            <div className="cy-cal-grid">
                {WEEKDAYS.map((w, i) => (
                    <div key={w} className={`cy-cal-weekday ${i === 0 ? 'sun' : i === 6 ? 'sat' : ''}`}>
                        {w}
                    </div>
                ))}
                {DAYS.map((day, i) => {
                    const dow = i % 7;
                    const isWedding = day === date.day;
                    return (
                        <div
                            key={i}
                            className={[
                                'cy-cal-day',
                                dow === 0 ? 'sun' : '',
                                dow === 6 ? 'sat' : '',
                                isWedding ? 'wedding' : '',
                            ].join(' ')}
                        >
                            {/* 결혼식 날은 도트 하트 안에 날짜 */}
                            {isWedding ? (
                                <span className="cy-cal-heart" aria-label={`${day}일 결혼식`}>{day}</span>
                            ) : (
                                day
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="cy-cal-dday">
                <p>결혼식까지 <b>{ddayText(days)}</b></p>
                <p className="cy-cal-when">
                    {date.month}월 {date.day}일 {dayOfWeek} {TIME_TEXT}
                </p>
            </div>
        </div>
    );
}

export function WeekdayHeader({ daysOfWeek }: { daysOfWeek: string[] }) {
    return (
        <div className="calendar-weekday-header">
            {daysOfWeek.map((day, index) => (
                <div key={index} className="calendar-weekday">
                    {day}
                </div>
            ))}
        </div>
    );
};

export function CalendarGrid({ weeks, weddingDay }: { weeks: (number | null)[][]; weddingDay: number }) {
    return (
        <div className="calendar-grid">
            {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="calendar-week">
                    {week.map((day, dayIndex) => (
                        <div key={dayIndex} className={`calendar-day ${day === null ? 'empty' : ''} ${day === weddingDay ? 'wedding-day' : ''}`}>
                            {day !== null ? day : ''}
                        </div>  
                    ))}
                </div>
            ))}
        </div>
    );
}  

export default function WeddingCalendar({ year, month, day }: { year: number; month: number; day: number }  ) {
    const firstDay = new Date(year, month - 1, 1).getDay(); // 해당 월의 첫 번째 날의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    const lastDate = new Date(year, month, 0).getDate(); // 해당 월의 마지막 날짜

    const weeks: (number | null)[][] = [];
    let currentDay = 1; 

    for (let week = 0; week < 6; week++) {
        let weekDays: (number | null)[] = [];
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            if (week === 0 && dayOfWeek < firstDay) {
                weekDays.push(null); // 첫 번째 주의 빈 칸
            } else if (currentDay > lastDate) {
                weekDays.push(null); // 마지막 날짜 이후의 빈 칸
            } else {
                weekDays.push(currentDay);
                currentDay++;
            }
        }
        weeks.push(weekDays);
    }

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    return (
        <div className="wedding-calendar">
            <p className="wedding-calendar-date">{year}년 {month}월 {day}일</p>
            <p className="wedding-calendar-day">토요일</p>
            <p className="wedding-calendar-time">12시 10분</p>
            <p className="wedding-calendar-location">신도림 웨딩시티</p>

            <WeekdayHeader daysOfWeek={daysOfWeek} />
            <CalendarGrid weeks={weeks} weddingDay={day} />
        </div>
    );
}
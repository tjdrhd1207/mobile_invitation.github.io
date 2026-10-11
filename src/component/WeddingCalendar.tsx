export default function WeddingCalendar({ year, month, day }: { year: number; month: number; day: number }  ) {
    return (
        <div className="wedding-calendar">
            <p className="wedding-calendar-date">{year}년 {month}월 {day}일</p>
            <p className="wedding-calendar-day">토요일</p>
            <p className="wedding-calendar-time">12시 20분</p>
            <p className="wedding-calendar-location">신도림 웨딩시티</p>
        </div>
    )
}
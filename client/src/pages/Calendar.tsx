import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = () => {
  const events = [{ title: "Meeting", start: new Date() }];
  const renderEventContent = {
    timeText: "Friday at 5:00 pm",
    event: { title: "meeting" },
  };
  return (
    <div>
      <h1>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
        eventContent
      />
    </div>
  );
};

export default Calendar;

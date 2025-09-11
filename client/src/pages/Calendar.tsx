import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = () => {
  // const events = [{ title: "Coffee", start: new Date() }];
  // const eventInfo = {
  //   timeText: "5pm",
  //   event: {
  //     title: "Meeting",
  //   },
  // };
  return (
    <div className="min-w-64">
      <h1>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        // events={events}
        // eventContent={renderEventContent(eventInfo)}
      />
    </div>
  );
};

export default Calendar;

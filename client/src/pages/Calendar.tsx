import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = () => {
  const events = [{ title: "Coffee", start: new Date() }];

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Production Calendar
        </h1>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={events}
          height="auto"
          eventDisplay="block"
          eventTextColor="#fff"
          eventBackgroundColor="#3b82f6"
          eventBorderColor="#2563eb"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth",
          }}
          buttonText={{
            today: "Today",
            month: "Month",
          }}
        />
      </div>
    </div>
  );
};

export default Calendar;

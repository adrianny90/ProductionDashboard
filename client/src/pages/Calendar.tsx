import React from "react";
import { formatDate } from "@fullcalendar/core";
import type {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "../utils/event-utils";

interface DemoAppState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
}

export default class DemoApp extends React.Component<
  Record<string, never>,
  DemoAppState
> {
  state: DemoAppState = {
    weekendsVisible: true,
    currentEvents: [],
  };

  render() {
    return (
      <>
        <div className="flex flex-col md:flex-row min-h-full  ">
          {this.renderSidebar()}

          <div className="p-3">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={this.state.weekendsVisible}
              initialEvents={INITIAL_EVENTS}
              select={this.handleDateSelect}
              eventContent={renderEventContent}
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents}
            />
          </div>
        </div>
      </>
    );
  }

  renderSidebar() {
    return (
      <div className="  bg-gray-100 ">
        <div className="p-2">
          <h2 className="text text-2xl my-2">Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className="mx-3">
          <label>
            <input
              type="checkbox"
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className="p-2">
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  handleEvents = (events: EventApi[]) => {
    this.setState({
      currentEvents: events,
    });
  };
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start!, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

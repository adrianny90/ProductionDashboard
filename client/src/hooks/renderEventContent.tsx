interface EventInfo {
  timeText: string;
  event: { title: string };
}

export function renderEventContent(eventInfo: EventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

import type { EventInput } from "@fullcalendar/core";

let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: "Maintenance",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "Weekly meeting",
    start: todayStr + "T12:00:00",
  },
];

export function createEventId() {
  return String(eventGuid++);
}

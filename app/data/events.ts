export interface Event {
  id: number;
  eventName: string;
  location: string;
  date: string;
  photo: string;
}

export const events: Event[] = [
  {
    id: 1,
    eventName: "День открытых дверей в Школе №1502",
    location: "ВАО",
    date: "2024.03.15",
    photo: "../../public/img/event.svg"
  },
  {
    id: 2,
    eventName: "День открытых дверей в Школе №444",
    location: "ВАО",
    date: "2024.03.15",
    photo: "../../public/img/event.svg"
  },
  {
    id: 3,
    eventName: "День открытых дверей в Школе №444",
    location: "ВАО",
    date: "2024.03.15",
    photo: "../../public/img/event.svg"
  },
  {
    id: 4,
    eventName: "День открытых дверей в Школе №444",
    location: "ВАО",
    date: "2024.03.15",
    photo: "../../public/img/event.svg"
  },
];

export function getEvents(): Event[] {
  return events;
}
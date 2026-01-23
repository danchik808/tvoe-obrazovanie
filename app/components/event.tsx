import "./event.css";
import type { Event } from "../data/events";

interface EventProps {
    event: Event;
}

export default function Event({ event }: EventProps) {
    return (
        <a href="" className="event-card">
            <img src={event.photo} alt="event-photo" className="event_photo" />
            <h2 className="event-card_headline">{event.eventName}</h2>
            <div className="event-ld"> 
                <h2 className="event_location">{event.location}</h2>
                <h2 className="event_date">{event.date}</h2>
            </div>
            <div className="event-strelka"></div>
        </a>
    );
}
import type { Route } from "./+types/home";
import { useState } from 'react';
import Header from "../components/header";
import Footer from "../components/footer";
import Event from "../components/event";
import { getEvents } from '../data/events';
import "./events.css";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Твоё образование | Мероприятия" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Events() {

    const [visibleCountEvents, setVisibleCountEvents] = useState(2);
    const allEvents = getEvents();
    const visibleEvents = allEvents.slice(0, visibleCountEvents);
    const loadMore = () => {
        setVisibleCountEvents(prev => prev + 2);
    };
    const canLoadMore = visibleCountEvents < allEvents.length;

    return (
        <>
            <Header />
            <main className="rating_main">
                <div className="rating-container">
                    <h2 className="rating_headline">Рейтинг образовательных учреждений</h2>
                    <section className="rating">
                        {visibleEvents.map(event => (
                            <Event key={event.id} event={event} />
                        ))}
                    </section>
                    {canLoadMore && (<button className="load_button" onClick={loadMore}>Показать ещё</button>)}
                </div>
            </main>
            <Footer />
        </>
    );

}
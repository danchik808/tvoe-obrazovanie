import "./events.css";
import type { Route } from "./+types/home";
import { useState, useEffect } from 'react';
import Header from "../components/header";
import Footer from "../components/footer";
import Event from "../components/event";
import { supabase } from "../lib/supabase";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Твоё образование | Мероприятия" },
    ];
}

export interface Event {
    id: number;
    eventName: string;
    location: string;
    photo: string;
    date: string;
    link: string;
}

export default function Events() {
    const [visibleCountEvents, setVisibleCountEvents] = useState(2);
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const visibleEvents = allEvents.slice(0, visibleCountEvents);
    const loadMore = () => {
        setVisibleCountEvents(prev => prev + 2);
    };
    const canLoadMore = visibleCountEvents < allEvents.length;
    useEffect(() => {
        async function fetchEvents() {
            try {
                const { data, error } = await supabase
                    .from("events")
                    .select("id, eventName, location, photo, date, link")
                    .order("id", { ascending: true });

                if (!error && data) {
                    setAllEvents(data);
                } else if (error) {
                    console.error("Ошибка загрузки мероприятий:", error);
                }
            } catch (err) {
                console.error("Ошибка:", err);
            }
        }

        fetchEvents();
    }, []);

    return (
        <>
            <Header />
            <main className="events_main">
                <div className="events-container">
                    <h2 className="events_headline">Мероприятия</h2>
                    <section className="events">
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
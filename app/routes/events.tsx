import type { Route } from "./+types/home";
import { useState, useEffect } from 'react';
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
    const [showPage, setShowPage] = useState(false);

    useEffect(() => {
        const preloadResources = async () => {
            await import("react-slick");
            await import("./events.css");
            await import("../components/header");
            await import("../components/mini-school");
            await import("../components/event");
            await import("../components/footer");
            const fonts = [
                { href: "/fonts/HelveticaNeueCyr-Roman.ttf", type: "font/ttf" },
                { href: "/fonts/HelveticaNeueCyr-Medium.ttf", type: "font/ttf" },
                { href: "/fonts/Gunterz-Medium.otf", type: "font/otf" }
            ];

            fonts.forEach(font => {
                const link = document.createElement("link");
                link.rel = "preload";
                link.as = "font";
                link.href = font.href;
                link.type = font.type;
                link.crossOrigin = "anonymous";
                document.head.appendChild(link);
            });
            setShowPage(true);
        };

        preloadResources();
    }, []);

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
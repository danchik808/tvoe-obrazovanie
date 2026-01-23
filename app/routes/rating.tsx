import type { Route } from "./+types/rating";
import { useState } from 'react';
import Header from "../components/header";
import Footer from "../components/footer";
import MiniSchool from "../components/mini-school";
import { getAllSchools } from '../data/schools';
import "./rating.css";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Твоё образование | Рейтинг" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Rating() {

    const [visibleCount, setVisibleCount] = useState(2);
    const allSchools = getAllSchools();
    const visibleSchools = allSchools.slice(0, visibleCount);
    const loadMore = () => {
        setVisibleCount(prev => prev + 2);
    };
    const canLoadMore = visibleCount < allSchools.length;

    return (
        <>
            <Header />
            <main className="rating_main">
                <div className="rating-container">
                    <h2 className="rating_headline">Рейтинг образовательных учреждений</h2>
                    <section className="rating">
                        {visibleSchools.map(school => (
                            <MiniSchool key={school.id} school={school} />
                        ))}
                    </section>
                    {canLoadMore && (<button className="load_button" onClick={loadMore}>Показать ещё</button>)}
                </div>
            </main>
            <Footer />
        </>
    );

}
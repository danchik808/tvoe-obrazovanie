import type { Route } from "./+types/rating";
import { useState, useEffect } from 'react';
import Header from "../components/header";
import Footer from "../components/footer";
import MiniSchool from "../components/mini-school";
import "./rating.css";
import { supabase } from "../lib/supabase";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Твоё образование | Рейтинг" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export interface School {
    id: number;
    shortName: string;
    shortDescription: string;
    slug: string;
    district: string;
}

export default function Rating() {

    const [visibleCount, setVisibleCount] = useState(2);
    const [allSchools, setAllSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSchools() {
            try {
                const { data, error } = await supabase
                    .from("schools")
                    .select("id, shortName, shortDescription, slug, district")
                    .order("id", { ascending: true }); 

                if (!error && data) {
                    setAllSchools(data);
                } else if (error) {
                    console.error("Ошибка загрузки школ:", error);
                }
            } catch (err) {
                console.error("Ошибка:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchSchools();
    }, []);

    const visibleSchools = allSchools.slice(0, visibleCount);
    const loadMore = () => {
        setVisibleCount(prev => prev + 2);
    };

    const canLoadMore = visibleCount < allSchools.length;

    if (loading) {
        return (
            <>
                <Header />
                <main className="rating_main">
                    <div className="rating-container">
                        <h2 className="rating_headline">Рейтинг образовательных учреждений</h2>
                        <div className="loading-spinner">Загрузка...</div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }
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
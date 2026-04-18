import { useParams } from "react-router";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "./school.css"

interface SchoolFromSupabase {
    id: number;
    shortName: string;
    fullName: string;
    district: string;
    shortDescription: string;
    slug: string;
    profiles: any[];
}

export default function SchoolPage() {
    const { slug } = useParams();
    const [school, setSchool] = useState<SchoolFromSupabase | null>(null);

    useEffect(() => {
        supabase.from("schools").select("*").eq("slug", slug).single()
            .then(({ data }) => {
                setSchool(data);
                if (data) {
                    document.title = data.fullName;
                }
            });
    }, [slug]);

    if (!school) return <div>Загрузка...</div>;

    return (
        <div className="school">
            <Header logoTheme='light' />
            <div className="wall">
            </div>
            <div className="school-container">
                <h1 className="school-main_name">{school.fullName}</h1>
                <p>{school.shortDescription}</p>
                <p>{school.district}</p>

                {school.profiles && school.profiles.map((item, index) => (
                    <div key={index}>
                        <p>Год: {item.name}</p>
                        <p>Рейтинг: {item.profiles}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
import { useParams } from "react-router";
import { Link } from "react-router"
import Header from "../components/header";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "./school.css"
import Loading from "../components/loading";

interface SchoolFromSupabase {
    id: number;
    shortName: string;
    fullName: string;
    address: string;
    district: string;
    website: string;
    studentCount: number;
    shortDescription: string;
    slug: string;
    profiles: any[];
    order: any[];
    society: any[];
    contacts: any[];
    achievements: any[];
    pro: any[];
    contactLink: string;
    schoolAddressLink: string;
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

    if (!school) return <Loading />;

    return (
        <div className="school">
            <Header logoTheme='light' />
            <div className="wall">
                <div className="school_nr">
                    <h1 className="school_main-name">{school.fullName}</h1>
                    <p className="school_main-rating">{school.id} в рейтинге</p>
                </div>
            </div>
            <div className="school-container">
                <section className="school_general sg">
                    <h2 className="school_section-headline">Общая информация</h2>
                    <div className="school_blocks">
                        <Link to={school.schoolAddressLink} target="_blank" rel="noopener noreferrer" className="school_block school_block-one">
                            <div className="hpd">
                                <p className="school_block-headline">Адрес</p>
                                <a href={school.schoolAddressLink} target="_blank" rel="noopener noreferrer" className="school_block-text">
                                    {school.address}
                                </a>
                            </div>
                        </Link>
                        <Link to={`${school.website}`} target="_blank" rel="noopener noreferrer" className="school_block">
                            <div className="hpd">
                                <p className="school_block-headline">Сайт школы</p>
                                <a href={school.website} target="_blank" rel="noopener noreferrer" className="school_block-text">
                                    {school.website}
                                </a>
                            </div>
                        </Link>
                        <div className="school_block">
                            <div className="hpd">
                                <p className="school_block-headline">Свободные места</p>
                                <p className="school_block-text">{school.studentCount}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="school_profile ld">
                    <h2 className="school_section-headline">Профили классов</h2>
                    <div className="mini_blocks">
                        {school.pro && school.pro.map((item, index) => (
                            <div key={index} className="mini_block">
                                <h3 className="mini_block-headline">{item.name}</h3>
                                <p className="mini_block-text">{item.profiles}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="school_order ld">
                    <h2 className="school_section-headline">Порядок поступления</h2>
                    <div className="mini_blocks">
                        {school.order && school.order.map((item, index) => (
                            <div key={index} className="mini_block">
                                <p className="mini_block-text" style={{ whiteSpace: 'pre-wrap' }}>{item}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="school_society ld">
                    <h2 className="school_section-headline">Кружки</h2>
                    <div className="mini_blocks">
                        {school.society && school.society.map((item, index) => (
                            <div key={index} className="mini_block">
                                <h3 className="mini_block-headline">{item.name}</h3>
                                <p className="mini_block-text">{item.society}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="school_general school_contacts">
                    <h2 className="school_section-headline">Контакты</h2>
                    <div className="school_blocks">
                        {school.contacts && school.contacts.map((item, index) => (
                            <a href={item.contactLink} className="school_block" key={index}>
                                <div className="hpd">
                                    <p className="school_block-headline" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.2' }}>{item.name}</p>
                                    <p className="school_block-text">{item.contact}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
                <section className="school_general school_achievements">
                    <h2 className="school_section-headline">Достижения</h2>
                    <div className="school_blocks">
                        {school.achievements && school.achievements.map((item, index) => (
                            <div className="school_block" key={index}>
                                <div className="hpd">
                                    <p className="school_block-headline">{item.name}</p>
                                    <p className="school_block-text">{item.achievement}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
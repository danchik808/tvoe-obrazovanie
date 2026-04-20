import type { Route } from "./+types/home";
import Header from "../components/header";
import Footer from "../components/footer";
import MiniSchool from "../components/mini-school";
import Event from "../components/event";
import { getEvents } from "../data/events";
import { Link } from "react-router";
import { Suspense, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css";
import { supabase } from "../lib/supabase";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Твоё образование — найди школу своей мечты" },
  ];
}

export async function loader() {
  return null;
}

export interface School {
  id: number;
  shortName: string;
  shortDescription: string;
  slug: string;
  district: string;
}

interface SlideFromSupabase {
  headline: string;
  text: string;
  button: string;
  image: string;
}

export default function Home() {
  const [showPage, setShowPage] = useState(false);
  const [featuredSchools, setFeaturedSchools] = useState<School[]>([]);
  const [slides, setSlides] = useState<SlideFromSupabase[]>([]);

  useEffect(() => {
    const preloadResources = async () => {
      await import("react-slick");
      await import("./home.css");
      await import("../components/header");
      await import("../components/mini-school");
      await import("../components/event");
      await import("../components/footer");

      async function fetchSchools() {
        try {
          const { data: schoolsData, error: schoolsError } = await supabase
            .from("schools")
            .select("*")
            .order("id", { ascending: true })
            .limit(4);

          if (!schoolsError && schoolsData) {
            setFeaturedSchools(schoolsData);
          } else if (schoolsError) {
            console.error("Ошибка загрузки школ:", schoolsError);
          }

          const { data: slidesData, error: slidesError } = await supabase
            .from("slides")
            .select("*")
            .order("id", { ascending: true });

          if (!slidesError && slidesData) {
            setSlides(slidesData);
          }
        } catch (err) {
          console.error("Ошибка:", err);
        } finally {
          setShowPage(true);
        }
      }

      await fetchSchools();
    };
    preloadResources();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  const featuredEvents = getEvents().slice(0, 2);

  if (!showPage) {
    return (
      <>
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Предзагрузка...</p>
        </div>
      </>
    );
  }


  return (
    <>
      <Header />
      <main>
        <section className="slider">
          <Suspense fallback={<div className="slider-loading">Загрузка слайдера...</div>}>
            <Slider {...settings}>
              {slides && slides.map((item, index) => (
                <div key={index}>
                  <div className="slider_item" style={{ backgroundImage: `url(${item.image})` }}>
                    <h3 className="slider_headline" style={{ whiteSpace: 'pre-wrap' }}>{item.headline?.replace(/\\n/g, '\n')}</h3>
                    <p className="slider_text">{item.text}</p>
                    <button className="slider_button"><a href="/">{item.button}</a></button>
                  </div>
                  </div>
                )
              )}
            </Slider>
          </Suspense>
        </section>

        <section className="home-rating">
          <Link className="home-rating_headline" to="/rating">Рейтинг <span className="big-name">образовательных учреждений</span><span className="small-name">школ</span></Link>
          <div className="mini-rating">
            {featuredSchools.map(school => (
              <MiniSchool key={school.id} school={school} />
            ))}
          </div>
        </section>

        <section className="events-section">
          <Link className="home-events_headline" to="/events">Мероприятия</Link>
          <div className="mini-events">
            {featuredEvents.map(event => (
              <Event key={event.id} event={event} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
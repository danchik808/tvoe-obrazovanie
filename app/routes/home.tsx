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
    { name: "description", content: "Welcome to React Router!" },
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

export default function Home() {
  const [showPage, setShowPage] = useState(false);
  const [featuredSchools, setFeaturedSchools] = useState<School[]>([]);

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
          const { data, error } = await supabase
            .from("schools")
            .select("id, shortName, shortDescription, slug, district")
            .order("id", { ascending: true })
            .limit(4);

          if (!error && data) {
            setFeaturedSchools(data);
          } else if (error) {
            console.error("Ошибка загрузки школ:", error);
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
    speed: 1100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 10000,
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
          <Suspense fallback={<div className="slider-placeholder">Загрузка слайдера...</div>}>
            <Slider {...settings}>
              <div className="slider_item slider_item_1">
                <div className="rpl">
                  <p className="slider_rating">1 в рейтинге</p>
                  <p className="slider_location">ВАО</p>
                </div>
                <h3 className="slider_headline">ШКОЛА №1502 "Энергия"</h3>
                <p className="slider_text">Команда Школы №1502 старается сделать школу, в которой хотелось бы учиться самим.</p>
                <button className="slider_button"><a href="/">Подробнее</a></button>
              </div>
              <div className="slider_item slider_item_2">
                <div className="rpl">
                  <p className="slider_rating">2 в рейтинге</p>
                  <p className="slider_location">ВАО</p>
                </div>
                <h3 className="slider_headline">ШКОЛА №444</h3>
                <p className="slider_text">Школа живет своей обычной жизнью, и учителя, как и почти 60 лет назад стремятся научить и воспитать детей, приходящих учиться в школу № 444.</p>
                <button className="slider_button"><a href="/">Подробнее</a></button>
              </div>
              <div className="slider_item slider_item_3">
                <div className="rpl">
                  <p className="slider_rating">3 в рейтинге</p>
                  <p className="slider_location">ВАО</p>
                </div> <h3 className="slider_headline">ШКОЛА №2036</h3>
                <p className="slider_text">Команда Школы №1502 старается сделать школу, в которой хотелось бы учиться самим.</p>
                <button className="slider_button"><a href="/">Подробнее</a></button>
              </div>
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
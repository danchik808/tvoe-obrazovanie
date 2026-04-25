import type { Route } from "./+types/home";
import { Form } from "react-router";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "./contacts.css";
import Loading from "../components/loading";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Твоё образование | Контакты" }
  ];
}

export default function Contacts() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <Header />
      <main>
        <div className="contacts-container">
          <div className="contacts-left">
            <h2 className="contacts_headline">Контакты</h2>
            <p className="contacts_text">Обновим информацию и ответим на ваши вопросы</p>
            <div className="contacts-links">
              <a className="contacts-link" href="mailto:tvoeobrazov@yandex.ru">
                <p className="contacts-link_text">Напишите нам на почту</p>
                <h3 className="contacts-link_headline">tvoeobrazov@yandex.ru</h3>
                <div className="contacts_strelka"></div>
              </a>
              <a className="contacts-link" href="https://t.me/tvoe_obrazovanie_web" target="_blank" rel="noopener noreferrer">
                <p className="contacts-link_text">Напишите нам в телеграм</p>
                <h3 className="contacts-link_headline">@tvoeobrazovanie</h3>
                <div className="contacts_strelka"></div>
              </a>
              <a className="contacts-link" href="tel:+79991234567">
                <p className="contacts-link_text">Позвоните нам</p>
                <h3 className="contacts-link_headline">+7 (917) 907-81-29</h3>
                <div className="contacts_strelka"></div>
              </a>
            </div>
          </div>
          <div className="form">
            <div className="fht">
              <h3 className="form_headline">Или заполните форму прямо сейчас</h3>
              <p className="form_text">Отвечаем быстрее скорости света</p>
            </div>
            <Form className="form-block">
              <div className="inputs">
                <input name="name" type="text" placeholder={"Имя"} required/>
                <input name="description" type="email" placeholder={"Email"} required/>
              </div>
              <button type="submit" className="form_button">Отправить</button>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );

}
import type { Route } from "./+types/home";
import { Form } from "react-router";
import Header from "../components/header";
import Footer from "../components/footer";
import "./contacts.css";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Твоё образование | Контакты" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Contacts() {
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
              <a className="contacts-link" href="">
                <p className="contacts-link_text">Напишите нам в телеграм</p>
                <h3 className="contacts-link_headline">@tvoeobrazovanie</h3>
                <div className="contacts_strelka"></div>
              </a>
              <a className="contacts-link" href="tel:+79991234567">
                <p className="contacts-link_text">Позвоните нам</p>
                <h3 className="contacts-link_headline">+7 999 999 99 99</h3>
                <div className="contacts_strelka"></div>
              </a>
            </div>
          </div>
          <div className="form">
            <div className="fht">
              <h3 className="form_headline">Или заполните форму прямо сейчас</h3>
              <p className="form_text">Отвечаем быстрее скорости света</p>
            </div>
            <Form action="/events" method="post" className="form-block">
              <div className="inputs">
                <input name="name" type="text" placeholder={"Имя"} />
                <input name="description" type="email" placeholder={"Email"} />
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
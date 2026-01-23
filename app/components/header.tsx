import { NavLink } from "react-router";
import { Link } from "react-router";
import "./header.css";

interface HeaderProps {
  logoTheme?: 'dark' | 'light';
}

export default function Header({ logoTheme = 'dark' }: HeaderProps) {
  const isDark = logoTheme === 'dark';
  return (
    <div className="header">
      <Link to="/"><img src={isDark ? "../../public/img/logo-dark.png" : "../../public/img/logo-light.png"} alt="Логотип" rel="/home"/></Link>
      <nav className="navigation">
        <div className="container navigation-container">
          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} end>
              <span>Главная</span>
            </NavLink>
            <NavLink to="/rating" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} end>
              <span>Рейтинг</span>
            </NavLink>
            <NavLink to="/events" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} end>
              <span>Мероприятия</span>
            </NavLink>
            <NavLink to="/contacts" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} end>
              <span>Контакты</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}

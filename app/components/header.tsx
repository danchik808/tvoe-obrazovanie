import { NavLink } from "react-router";
import { Link } from "react-router";
import "./header.css";
import { useState } from "react";

interface HeaderProps {
  logoTheme?: 'dark' | 'light';
}

export default function Header({ logoTheme = 'dark' }: HeaderProps) {
  const [isActive, setIsActive] = useState(false);
  function burger() {
    setIsActive(current => !current);
  }
  const isDark = logoTheme === 'dark';

  return (
    <div className="header">
      <Link to="/"><div className={`header-logo ${isDark ? 'logo-dark' : 'logo-light'}`}></div></Link>
      <div className="header-container">
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
        <div className="burger">
          <button className="burger_btn" onClick={burger}></button>
          <nav className={`burger-navigation ${isActive ? 'active' : ''}`}>
            <div className="burger-navigation_container">
              <div className="burger_nav-links">
                <NavLink to="/" className="buger_nav-link">
                  <span>Главная</span>
                </NavLink>
                <NavLink to="/" className="buger_nav-link">
                  <span>Рейтинг</span>
                </NavLink>
                <NavLink to="/" className="buger_nav-link">
                  <span>Мероприятия</span>
                </NavLink>
                <NavLink to="/" className="buger_nav-link">
                  <span>Контакты</span>
                </NavLink>
              </div>
              <button className="burger-close_btn" onClick={burger}></button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

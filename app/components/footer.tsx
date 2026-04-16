import "./footer.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="footer">
            <a href="" className="footer_item">Правила хранения данных</a>
            <p className="footer_item">{currentYear}</p>
            <a href="" className="footer_item">Правила сбора информации</a>
        </div>
    );
}
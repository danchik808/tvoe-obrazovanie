import "./footer.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="footer">
            <p className="footer_item"></p>
            <p className="footer_item">© {currentYear} Твоё Образование</p>
        </div>
    );
}
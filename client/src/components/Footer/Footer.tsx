import React from "react";
import Logo from "../../assets/logo.png";
import './Footer.css';
import { Link } from "react-router-dom"; // ייבוא של Link

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-left">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Logo" />
                    </Link>
                </div>
            </div>
            <div className="footer-right">
                <p className="copyright">© {currentYear} by Ilan Kalantarov</p>
            </div>
        </footer>
    )
}

export default Footer;

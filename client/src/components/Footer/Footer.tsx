import React from "react";
import Logo from "../../assets/logo.png";
import './Footer.css';

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-left">
                <div className="logo">
                <a href="/"><img src={Logo} alt="Logo" /></a>
                </div>
            </div>
            <div className="footer-right">
                <p className="copyright">© {currentYear} by Ilan Kalantarov</p>
            </div>
        </footer>
    )
}

export default Footer;
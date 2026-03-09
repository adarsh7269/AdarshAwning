import { NavLink } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <span className="footer__logo-icon">⬟</span>
                            <span>Adarsh <em>Awning</em></span>
                        </div>
                        <p className="footer__tagline">
                            Protecting your business with style since 2005. Premium awning solutions for commercial and retail establishments.
                        </p>
                        <div className="footer__socials">
                            <a href="#" aria-label="Facebook">f</a>
                            <a href="#" aria-label="Instagram">in</a>
                            <a href="#" aria-label="Twitter">tw</a>
                        </div>
                    </div>

                    <div className="footer__col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About Us</NavLink></li>
                            <li><NavLink to="/blog">Blog</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4>Services</h4>
                        <ul>
                            <li><a href="#">Shop Awnings</a></li>
                            <li><a href="#">Retractable Awnings</a></li>
                            <li><a href="#">Custom Fabrication</a></li>
                            <li><a href="#">Maintenance & Repair</a></li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4>Contact</h4>
                        <ul className="footer__contact-list">
                            <li>📍 123 Market Street, Mumbai 400001</li>
                            <li>📞 +91 98765 43210</li>
                            <li>✉️ hello@adarshaawning.com</li>
                            <li>🕐 Mon–Sat: 9 AM – 6 PM</li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© {new Date().getFullYear()} Adarsh Awning. All rights reserved.</p>
                    <p>Made with ♥ in India</p>
                </div>
            </div>
        </footer>
    )
}

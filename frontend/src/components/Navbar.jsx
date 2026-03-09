import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const { user, logout } = useAuth()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMenuOpen(false)
    }, [location])

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner container">
                <NavLink to="/" className="navbar__logo">
                    <span className="navbar__logo-icon">⬟</span>
                    <span className="navbar__logo-text">Adarsh <em>Awning</em></span>
                </NavLink>

                <button
                    className={`navbar__burger ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>

                <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/about', label: 'About' },
                        { to: '/blog', label: 'Blog' },
                        { to: '/contact', label: 'Contact' },
                    ].map(({ to, label }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                    {user ? (
                        <li className="navbar__user">
                            <span className="navbar__username">Hi, {user.username}</span>
                            <button onClick={logout} className="navbar__link logout-btn">Logout</button>
                        </li>
                    ) : (
                        <li>
                            <NavLink to="/login" className="navbar__link">Login</NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink to="/contact" className="navbar__cta btn-primary">
                            Get a Quote
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

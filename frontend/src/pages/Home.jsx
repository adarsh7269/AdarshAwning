import './Home.css'

export default function Home() {
    return (
        <div className="home-page page-enter">
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <img src="/images/hero_awning.png" alt="Adarsh Awning Hero" className="hero-image" />
                <div className="hero-content container">
                    <span className="hero-badge">Est. 2005</span>
                    <h1 className="hero-title">Premium Awnings for Your Business & Home</h1>
                    <p className="hero-description">
                        Elevate your storefront with Adarsh Awning. We specialize in high-quality, durable, and stylish retractable and fixed awnings tailored to your brand.
                    </p>
                    <div className="hero-btns">
                        <a href="/contact" className="btn-primary">Get Free Estimate</a>
                        <a href="/blog" className="btn-outline">View Our Work</a>
                    </div>
                </div>
            </section>

            <section className="features-section section container">
                <div className="section-header">
                    <span className="section-label">Why Choose Us</span>
                    <h2 className="section-title">Durability Meets Design</h2>
                    <p className="section-subtitle">We combine premium materials with expert craftsmanship to deliver awning solutions that last for years.</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">☂</div>
                        <h3>Weather Proof</h3>
                        <p>High-grade UV resistant fabrics that withstand rain, wind, and harsh sunlight.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚙</div>
                        <h3>Smart Systems</h3>
                        <p>Smooth retractable mechanisms with automated and manual control options.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎨</div>
                        <h3>Custom Design</h3>
                        <p>Fully customizable colors, patterns, and branding to match your business identity.</p>
                    </div>
                </div>
            </section>

            <section className="cta-banner section">
                <div className="container">
                    <div className="cta-box">
                        <h2>Ready to transform your storefront?</h2>
                        <p>Join over 500+ satisfied businesses using Adarsh Awning solutions.</p>
                        <a href="/contact" className="btn-primary">Contact Us Today</a>
                    </div>
                </div>
            </section>
        </div>
    )
}

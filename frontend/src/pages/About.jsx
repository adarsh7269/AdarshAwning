import './About.css'

export default function About() {
    return (
        <div className="about-page page-enter">
            <div className="section container about-section">
                <div className="about-grid">
                    <div>
                        <span className="section-label">Our Story</span>
                        <h1 className="section-title">Crafting Shade with Excellence since 2005</h1>
                        <p className="section-subtitle">
                            Adarsh Awning started with a simple mission: to provide Indian businesses with high-quality shade solutions that enhance both functionality and aesthetics.
                        </p>
                        <p className="about-description">
                            Over the last two decades, we have evolved from a small workshop in Mumbai to a leading national manufacturer. Our team of skilled engineers and designers work tirelessly to innovate retractable mechanisms and source the finest weather-resistant fabrics from around the globe.
                        </p>
                        <div className="about-stats">
                            <div className="stat-item">
                                <h4>500+</h4>
                                <p>Projects Completed</p>
                            </div>
                            <div className="stat-item">
                                <h4>15+</h4>
                                <p>Years Experience</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img
                            src="/images/about_team.png"
                            alt="Our Team"
                            className="about-image"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

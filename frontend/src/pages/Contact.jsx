import './Contact.css'

export default function Contact() {
    return (
        <div className="contact-page page-enter">
            <div className="section container contact-section">
                <div className="section-header centered">
                    <span className="section-label">Get In Touch</span>
                    <h1 className="section-title">Let's Discuss Your Project</h1>
                    <p className="section-subtitle">
                        Request a free site visit and estimate. Our experts will guide you through the best awning options for your space.
                    </p>
                </div>

                <div className="contact-grid">
                    <div className="contact-info">
                        <h3 className="contact-info-title">Contact Information</h3>
                        <div className="contact-details">
                            <div className="contact-item">
                                <p className="contact-item-label">Visit Us</p>
                                <p>97, Chandra Sheakher Azad Colony New Patel Nagar, Dehradun, Uttarakhand, 248001</p>
                            </div>
                            <div className="contact-item">
                                <p className="contact-item-label">Call Us</p>
                                <p>+91 70886 70226</p>
                            </div>
                            <div className="contact-item">
                                <p className="contact-item-label">Email Us</p>
                                <p>adarshawning@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" placeholder="John Doe" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Product Interest</label>
                                <select>
                                    <option>Shop Awning</option>
                                    <option>Retractable Awning</option>
                                    <option>Fixed Canopies</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea rows="4" placeholder="Tell us about your requirements"></textarea>
                            </div>
                            <button type="submit" className="btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

import { useState, useEffect } from 'react'
import './ReviewsSection.css'

const API_BASE = 'http://localhost:8080/api/reviews'

export default function ReviewsSection() {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Form state
    const [name, setName] = useState('')
    const [rating, setRating] = useState(5)
    const [content, setContent] = useState('')
    const [submitLoading, setSubmitLoading] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const [submitSuccess, setSubmitSuccess] = useState(false)

    useEffect(() => {
        fetchReviews()
    }, [])

    const fetchReviews = async () => {
        try {
            const res = await fetch(API_BASE)
            if (!res.ok) throw new Error('Failed to fetch reviews')
            const data = await res.json()
            setReviews(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitError('')
        setSubmitSuccess(false)

        if (!name.trim() || !content.trim()) {
            setSubmitError('Name and review content are required.')
            return
        }

        setSubmitLoading(true)
        try {
            const res = await fetch(API_BASE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    authorName: name.trim(),
                    rating: rating,
                    content: content.trim()
                })
            })
            
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}))
                throw new Error(errorData.message || 'Failed to submit review')
            }

            // Success
            setSubmitSuccess(true)
            setName('')
            setRating(5)
            setContent('')
            
            // Refresh list
            fetchReviews()
        } catch (err) {
            setSubmitError(err.message || 'Something went wrong. Please check if the backend is running.')
        } finally {
            setSubmitLoading(false)
            // hide success message after 3 seconds
            if(!submitError) {
                setTimeout(() => setSubmitSuccess(false), 3000)
            }
        }
    }

    const renderStars = (count) => {
        return "★".repeat(count) + "☆".repeat(5 - count)
    }

    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    return (
        <section className="reviews-section section container">
            <div className="section-header">
                <span className="section-label">Customer Testimonials</span>
                <h2 className="section-title">What Our Clients Say</h2>
                <p className="section-subtitle">Real experiences from businesses and homes that have transformed their spaces with Adarsh Awning.</p>
            </div>

            <div className="reviews-layout">
                {/* Submit Review Form */}
                <div className="review-form-container">
                    <h3>Leave a Review</h3>
                    <p>Share your experience with our products and services.</p>
                    
                    {submitSuccess && <div className="alert success">Thank you! Your review has been posted.</div>}
                    {submitError && <div className="alert error">{submitError}</div>}
                    
                    <form onSubmit={handleSubmit} className="review-form">
                        <div className="form-group">
                            <label>Your Name</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Rating</label>
                            <div className="rating-select">
                                {[1, 2, 3, 4, 5].map(num => (
                                    <span 
                                        key={num} 
                                        className={`star-select ${rating >= num ? 'active' : ''}`}
                                        onClick={() => setRating(num)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Your Review</label>
                            <textarea 
                                value={content} 
                                onChange={e => setContent(e.target.value)} 
                                placeholder="Tell us about your new awning..."
                                rows="4"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary" disabled={submitLoading}>
                            {submitLoading ? 'Submitting...' : 'Post Review'}
                        </button>
                    </form>
                </div>

                {/* Reviews List */}
                <div className="reviews-list-container">
                    {loading ? (
                        <div className="reviews-loading">Loading reviews...</div>
                    ) : error ? (
                        <div className="reviews-error">
                            <p>Unable to connect to database.</p>
                            <small>{error}</small>
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="no-reviews">
                            <p>No reviews yet. Be the first to share your experience!</p>
                        </div>
                    ) : (
                        <div className="reviews-grid">
                            {reviews.map(review => (
                                <div key={review.id} className="review-card">
                                    <div className="review-card-header">
                                        <div className="review-stars">{renderStars(review.rating)}</div>
                                        <div className="review-date">{formatDate(review.createdAt)}</div>
                                    </div>
                                    <p className="review-content">"{review.content}"</p>
                                    <div className="review-author">— {review.authorName}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

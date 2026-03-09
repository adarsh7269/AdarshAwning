import './Blog.css'

const posts = [
    {
        title: '5 Benefits of Installing Awnings for Your Shop',
        excerpt: 'Boost foot traffic and protect your outdoor seating while enhancing your storefront aesthetic.',
        image: '/images/blog_cafe_awning.png',
        date: 'Oct 24, 2023',
        category: 'Commercial'
    },
    {
        title: 'Why Retractable Awnings are Perfect for Modern Patios',
        excerpt: 'Control the shade and enjoy the breeze with our premium retractable awning solutions.',
        image: '/images/blog_commercial_awning.png',
        date: 'Nov 12, 2023',
        category: 'Residential'
    }
]

export default function Blog() {
    return (
        <div className="blog-page page-enter">
            <div className="section container blog-section">
                <div className="section-header">
                    <span className="section-label">Our Blog</span>
                    <h1 className="section-title">Awnings Guide & Inspiration</h1>
                    <p className="section-subtitle">Stay updated with the latest trends in storefront design and shade solutions.</p>
                </div>

                <div className="blog-grid">
                    {posts.map((post, i) => (
                        <article key={i} className="blog-card">
                            <img src={post.image} alt={post.title} className="blog-image" />
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span className="blog-category">{post.category}</span>
                                    <span className="blog-date">{post.date}</span>
                                </div>
                                <h3>{post.title}</h3>
                                <p className="blog-excerpt">{post.excerpt}</p>
                                <a href="#" className="blog-link">Read More</a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}

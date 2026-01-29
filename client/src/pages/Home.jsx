import { useQuery } from '@tanstack/react-query';
import { fetchNotices, fetchHomeContent } from '../api';
import { ArrowRight, BookOpen, FileText, Users, CreditCard, UserCircle, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Home.css';
import BrochureModal from '../components/BrochureModal';

function Home() {
    const { data: homeContent } = useQuery({ queryKey: ['homeContent'], queryFn: fetchHomeContent });

    const sliderImages = homeContent?.slider || [];
    const news = homeContent?.news || [];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

    // Auto-advance slider
    useEffect(() => {
        if (sliderImages.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [sliderImages.length]);

    return (
        <div className="home-page">
            <BrochureModal isOpen={isBrochureModalOpen} onClose={() => setIsBrochureModalOpen(false)} />

            {/* 1. Header Slider */}
            <section className="hero-section">
                <div className="container">
                    <div className="slider-container group">
                        {sliderImages.length > 0 ? (
                            <>
                                {/* Slides */}
                                {sliderImages.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                                    >
                                        <img
                                            src={slide.image}
                                            alt={slide.alt}
                                            className="slide-img"
                                        />
                                    </div>
                                ))}

                                {/* Controls */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
                                    }}
                                    className="slider-btn prev-btn"
                                >
                                    <ArrowRight className="rotate-180" size={24} />
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
                                    }}
                                    className="slider-btn next-btn"
                                >
                                    <ArrowRight size={24} />
                                </button>

                                {/* Dots */}
                                <div className="slider-dots">
                                    {sliderImages.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentSlide(idx)}
                                            className={`dot ${idx === currentSlide ? 'active' : ''}`}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full w-full bg-slate-200">
                                <p>Loading Slider...</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 2. Quick Access Cards */}
            <section className="section-padding">
                <div className="container">
                    <h2 className="section-title text-center" style={{ marginBottom: '2rem' }}>Quick Access</h2>
                    <div className="quick-access-grid">
                        <QuickAccessCard
                            title="Courses Offered"
                            icon={<BookOpen size={40} />}
                            color="#e63946"
                            link="https://rmd.ac.in/academics/Courses_Offered.html"
                        />
                        <QuickAccessCard
                            title="Student Login"
                            icon={<Users size={40} />}
                            color="#f4a261"
                            link="https://nextgen.rmd.ac.in/"
                        />
                        <QuickAccessCard
                            title="Faculty Login"
                            icon={<UserCircle size={40} />}
                            color="#e9c46a"
                            link="https://nextgenfaculty.rmd.ac.in/index.html"
                        />
                        <QuickAccessCard
                            title="Admission Enquiry"
                            icon={<FileText size={40} />}
                            color="#2a9d8f"
                            link="https://rmkec.ac.in/admission2024/sendotp1.php"
                        />
                        {/* New Brochure Button */}
                        <div
                            onClick={() => setIsBrochureModalOpen(true)}
                            className="quick-card cursor-pointer"
                            style={{ '--card-color': '#d62828' }}
                        >
                            <div className="quick-card-icon" style={{ color: '#d62828' }}>
                                <FileText size={40} />
                            </div>
                            <h3 className="quick-card-title">Department Brochures</h3>
                        </div>

                        <QuickAccessCard
                            title="Pay Fees Online"
                            icon={<CreditCard size={40} />}
                            color="#264653"
                            link="https://www.iobnet.co.in/iobpay/entry.do?dirlinkmerid=RMDVEL&dirlinkcatcd=EDU"
                        />
                        <QuickAccessCard
                            title="Alumni Desk"
                            icon={<GraduationCap size={40} />}
                            color="#457b9d"
                            link="https://rmd.ac.in/alumni/index.html"
                        />
                    </div>
                </div>
            </section>

            {/* Important Links & Certifications Results */}
            <section className="container info-section" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
                <div className="container">
                    <h2 className="section-title text-center" style={{ marginBottom: '2rem' }}>Important Links & Certifications</h2>
                    {/* Define fallback data inside the render block or use state/const above */}
                    <div className="certifications-flex-container">
                        {(() => {
                            const fallbackCerts = [
                                { title: "NBA", url: "https://rmd.ac.in/nba.html", color: "#e63946" },
                                { title: "NAAC", url: "http://rmd.ac.in/naac/naac.html", color: "#f4a261" },
                                { title: "NIRF", url: "https://rmd.ac.in/MoE,%20National%20Institute%20Ranking%20Framework%20(NIRF).pdf", color: "#2a9d8f" },
                            ];
                            const items = (homeContent?.certifications && homeContent.certifications.length > 0)
                                ? homeContent.certifications
                                : fallbackCerts;

                            return items.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.link || item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={item.image ? "cert-img-card" : "cert-card"}
                                    style={!item.image ? { borderLeft: `4px solid ${item.color}` } : {}}
                                >
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} />
                                    ) : (
                                        <>
                                            <span className="cert-title">{item.title}</span>
                                            <ArrowRight size={16} style={{ color: item.color }} />
                                        </>
                                    )}
                                </a>
                            ));
                        })()}
                    </div>
                </div>
            </section>

            {/* 3. Info Grid: Awards, Placements, News */}
            <section className="container info-section">
                <div className="info-grid">

                    {/* Column 1: Awards */}
                    <div className="info-card">
                        <div className="info-header">
                            Awards and Achievements
                        </div>
                        <div className="marquee-container">
                            <div
                                className="marquee-content slow-scroll"
                                style={{
                                    animationDuration: calculateDuration(news.filter(n => n.type === 'award' || !n.type).length, 'text')
                                }}
                            >
                                {/* Render Twice for Seamless Loop */}
                                {(news.filter(n => n.type === 'award' || !n.type).length > 0) ?
                                    news.filter(n => n.type === 'award' || !n.type).map((item, idx) => (
                                        <div key={idx} className="news-item">
                                            <a href={item.url} target="_blank" className="news-link">
                                                <span className="badge-star">★</span>
                                                {item.title}
                                            </a>
                                        </div>
                                    )) : <SkeletonLoader count={5} />
                                }
                            </div>
                        </div>
                        <div className="info-footer">
                            <a href="https://rmd.ac.in/awards.html" target="_blank" className="more-btn">
                                + More
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Placements */}
                    <div className="info-card">
                        <div className="info-header">
                            Placement 2021-25 Batch
                        </div>
                        <div className="marquee-container">
                            <div
                                className="marquee-content slow-scroll"
                                style={{
                                    animationDuration: calculateDuration(homeContent?.placements?.length || 0, 'placement')
                                }}
                            >
                                {homeContent?.placements && homeContent.placements.length > 0 ? (
                                    homeContent.placements.map((offer, idx) => (
                                        <div key={idx} className="placement-item">
                                            <span className="company-text">{offer}</span>
                                        </div>
                                    ))
                                ) : <SkeletonLoader count={5} />}
                            </div>
                        </div>
                        <div className="info-footer">
                            <a href="https://rmd.ac.in/placement/placement.html" target="_blank" className="more-btn">
                                + More
                            </a>
                        </div>
                    </div>

                    {/* Column 3: News */}
                    <div className="info-card">
                        <div className="info-header">
                            News & Events
                        </div>
                        <div className="marquee-container">
                            <div
                                className="marquee-content slow-scroll"
                                style={{
                                    animationDuration: calculateDuration(news.filter(n => n.type === 'news').length, 'text')
                                }}
                            >
                                {news.filter(n => n.type === 'news').length > 0 ?
                                    news.filter(n => n.type === 'news').map((item, idx) => (
                                        <div key={idx} className="news-item">
                                            <a href={item.url} target="_blank" className="news-link">
                                                <span className="badge-new">NEW</span>
                                                {item.title}
                                            </a>
                                        </div>
                                    )) : <SkeletonLoader count={5} />
                                }
                            </div>
                        </div>
                        <div className="info-footer">
                            <a href="https://rmd.ac.in/news.html" target="_blank" className="more-btn">
                                + More
                            </a>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}

// Helper to calculate scroll duration based on item count and type (approx height)
// Placements are usually single line (~20px height) -> Faster per item multiplier to match speed
// News/Awards are multi-line (~60-80px height) -> Slower per item multiplier to match speed
// Goal: Same pixels/second speed.
function calculateDuration(itemCount, type = 'text') {
    if (!itemCount) return '30s';

    // Multipliers: Time per item to cover its own height
    // Reduced multipliers to speed up the scroll as per user feedback
    const multiplier = type === 'placement' ? 2 : 5;
    const minDuration = type === 'placement' ? 15 : 30;

    const duration = Math.max(itemCount * multiplier, minDuration);
    return `${duration}s`;
}

// Skeleton Loader Component
function SkeletonLoader({ count = 3 }) {
    return (
        <div style={{ padding: '1rem' }}>
            {Array(count).fill(0).map((_, i) => (
                <div key={i} className="skeleton skeleton-text" style={{ marginBottom: '1rem', height: '40px', width: `${Math.random() * 30 + 70}%` }}></div>
            ))}
        </div>
    );
}

// Helper: Quick Access Card
function QuickAccessCard({ title, icon, color, link }) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="quick-card"
            style={{ '--card-color': color }}
        >
            <div className="quick-card-icon" style={{ color: color }}>
                {icon}
            </div>
            <h3 className="quick-card-title">{title}</h3>
        </a>
    );
}

export default Home;

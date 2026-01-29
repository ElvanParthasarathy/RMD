import React from 'react';
import { CheckCircle, MapPin, Users, BookOpen, Award, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ECE.css';
import eceData from '../../data/ece-content.json';
import { useQuery } from '@tanstack/react-query';
import { fetchECEContent } from '../../api';

const ECE = () => {
    const { data: eceDynamic } = useQuery({ queryKey: ['eceContent'], queryFn: fetchECEContent });

    const finalSections = eceData.sections.map(section => {
        if (section.type === 'image_slider' && eceDynamic?.slider?.length > 0) {
            return { ...section, images: eceDynamic.slider };
        }
        return section;
    });

    return (
        <div className="dept-page">
            <div className="dept-hero">
                <div className="container">
                    <h1 className="dept-title">Department of Electronics and Communication Engineering</h1>
                    <div className="dept-breadcrumb">
                        <Link to="/">Home</Link> / Departments / ECE
                    </div>
                </div>
            </div>

            <div className="container dept-content-wrapper">
                {/* Sidebar Navigation */}
                <aside className="dept-sidebar">
                    <div className="sidebar-group">
                        <h3 className="sidebar-heading">Quick Links</h3>
                        <nav className="sidebar-nav">
                            <a href="#" className="sidebar-link active">About the Dept</a>
                            <a href="#" className="sidebar-link">Vision-Mission</a>
                            <a href="#" className="sidebar-link">PEOs, POs and PSOs</a>
                            <a href="#" className="sidebar-link">Course Outcomes</a>
                            <a href="#" className="sidebar-link">Quality Objectives</a>
                            <a href="#" className="sidebar-link">HOD</a>
                            <a href="#" className="sidebar-link">Faculty List</a>
                            <a href="#" className="sidebar-link">Laboratories</a>
                            <a href="#" className="sidebar-link">Research</a>
                            <a href="#" className="sidebar-link">Placements</a>
                        </nav>
                    </div>

                    <div className="sidebar-group">
                        <h3 className="sidebar-heading">Academics</h3>
                        <nav className="sidebar-nav">
                            <a href="#" className="sidebar-link">Time Table</a>
                            <a href="#" className="sidebar-link">Digital Course Materials</a>
                            <a href="#" className="sidebar-link">Video Lectures</a>
                            <a href="#" className="sidebar-link">Online Courses</a>
                            <a href="#" className="sidebar-link">University Rank Holders</a>
                        </nav>
                    </div>

                    <div className="sidebar-group">
                        <h3 className="sidebar-heading">Events & Activities</h3>
                        <nav className="sidebar-nav">
                            <a href="#" className="sidebar-link">Awards / Achievements</a>
                            <a href="#" className="sidebar-link">Activities</a>
                            <a href="#" className="sidebar-link">Webinar Organized</a>
                            <a href="#" className="sidebar-link">Industrial Visit</a>
                            <a href="#" className="sidebar-link">Guest Lectures</a>
                            <a href="#" className="sidebar-link">Distinguished Alumni</a>
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="dept-main">
                    <section className="dept-section">
                        <h2 className="section-title">About the Department</h2>
                        <div className="content-text">
                            {finalSections.map((section, index) => (
                                <div key={index} className={`dept-block ${section.type}`}>
                                    {section.title && <h3 className="block-title">{section.title}</h3>}
                                    <p className="block-text">{section.text}</p>

                                    {/* Conditional Rendering based on section properties */}
                                    {section.stats && (
                                        <div className="block-stats">
                                            {section.stats.map((stat, idx) => (
                                                <div key={idx} className="stat-item">
                                                    <span className="stat-value">{stat.value}</span>
                                                    <span className="stat-label">{stat.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {section.tags && (
                                        <div className="block-tags">
                                            {section.tags.map((tag, idx) => (
                                                <span key={idx} className="tag-chip">
                                                    <CheckCircle size={14} className="tag-icon" /> {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {section.features && (
                                        <div className="block-features">
                                            {section.features.map((feat, idx) => (
                                                <div key={idx} className="feature-item">
                                                    <BookOpen size={16} className="feat-icon" />
                                                    <span>{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {section.type === 'accreditation_banner' && (
                                        <div className="accreditation-badge mt-4">
                                            <Award size={24} className="badge-icon" />
                                            <span>Accredited by NBA & ISO 9001:2015 Certified</span>
                                        </div>
                                    )}

                                    {section.type === 'image_slider' && (
                                        <div className="dept-slider">
                                            <Slider images={section.images} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>


                </main>
            </div>
        </div>
    );
};

export default ECE;

const Slider = ({ images }) => {
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="slider-container">
            <div className="slider-wrapper" style={{ transform: `translateX(-${current * 100}%)` }}>
                {images.map((img, index) => (
                    <div key={index} className="slide">
                        <img src={img.url} alt={img.caption} />
                        <div className="slide-caption">{img.caption}</div>
                    </div>
                ))}
            </div>
            <div className="slider-dots">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${current === index ? 'active' : ''}`}
                        onClick={() => setCurrent(index)}
                    />
                ))}
            </div>
        </div>
    );
};

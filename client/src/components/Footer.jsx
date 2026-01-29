import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHomeContent } from '../api';
import { Linkedin, Twitter, Youtube, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
    const { data: homeContent } = useQuery({
        queryKey: ['homeContent'],
        queryFn: fetchHomeContent,
        staleTime: 1000 * 60 * 5 // 5 minutes
    });

    return (
        <footer className="app-footer">
            <div className="container">
                <div className="footer-grid">

                    {/* Column 1: Pages */}
                    <div>
                        <h3 className="footer-heading">Pages</h3>
                        <div className="footer-link-list">
                            <a href="https://rmd.ac.in/administration/chairman.html" className="footer-link">Chairman</a>
                            <a href="https://rmd.ac.in/administration/managementteam.html" className="footer-link">Management Teams</a>
                            <a href="https://rmd.ac.in/aboutus/approvals.pdf" className="footer-link">Approval</a>
                            <a href="https://rmd.ac.in/aboutus/vision.html" className="footer-link">Vision and Mission</a>
                            <a href="https://rmd.ac.in/aboutus/academicprog.html" className="footer-link">Academic Programs</a>
                            <a href="https://rmd.ac.in/aboutus/eligibility.html" className="footer-link">Eligibility</a>
                            <a href="https://rmd.ac.in/contact.html" className="footer-link">Contact Us</a>
                        </div>
                    </div>

                    {/* Column 2: Pages */}
                    <div>
                        <h3 className="footer-heading">Pages</h3>
                        <div className="footer-link-list">
                            <a href="https://rmd.ac.in/index.html#" className="footer-link">Academic Excellence</a>
                            <a href="https://rmd.ac.in/coe.html" className="footer-link">Centre of Excellence</a>
                            <a href="https://rmd.ac.in/index.html#" className="footer-link">Feedback</a>
                            <a href="https://rmd.ac.in/alumni/index.html" className="footer-link">Alumni</a>
                            <a href="https://rmd.ac.in/academics/Academic_Schedule.html" className="footer-link">Academic Calendar</a>
                            <a href="https://rmd.ac.in/index.html#" className="footer-link">Road Map</a>
                            <a href="https://rmd.ac.in/index.html#" className="footer-link">Campus Map</a>
                        </div>
                    </div>

                    {/* Column 3: Committees */}
                    <div>
                        <h3 className="footer-heading">Committees</h3>
                        <div className="footer-link-list">
                            <a href="https://rmd.ac.in/Grievance/scst.html" className="footer-link">SC / ST Committee</a>
                            <a href="https://rmd.ac.in/Grievance/index.html" className="footer-link">Students Grievance Redressal Committee</a>
                            <a href="https://rmd.ac.in/Grievance/icc.html" className="footer-link">Internal Complaints Committee (Prevention of Sexual Harassment)</a>
                            <a href="https://rmd.ac.in/Grievance/antiragging.html" className="footer-link">Anti-ragging Committee</a>
                            <a href="https://rmd.ac.in/Grievance/minority.html" className="footer-link">Minority & OBC Cell</a>
                        </div>
                    </div>

                    {/* Column 4: Social Media */}
                    <div>
                        <h3 className="footer-heading">Social Media</h3>
                        <div className="footer-link-list">
                            <a href="https://www.linkedin.com/in/rmd-engineering-college" target="_blank" rel="noopener noreferrer" className="footer-link footer-social-link">
                                <Linkedin size={16} /> Linkedin
                            </a>
                            <a href="https://twitter.com/rmd_college" target="_blank" rel="noopener noreferrer" className="footer-link footer-social-link">
                                <Twitter size={16} /> Twitter
                            </a>
                            <a href="https://www.youtube.com/channel/UC..." target="_blank" rel="noopener noreferrer" className="footer-link footer-social-link">
                                <Youtube size={16} /> Youtube
                            </a>
                            <a href="https://www.facebook.com/rmdcollege" target="_blank" rel="noopener noreferrer" className="footer-link footer-social-link">
                                <Facebook size={16} /> Facebook
                            </a>
                            <a href="https://www.instagram.com/rmdcollege" target="_blank" rel="noopener noreferrer" className="footer-link footer-social-link">
                                <Instagram size={16} /> Instagram
                            </a>
                        </div>
                    </div>

                    {/* Column 5: Disclosure */}
                    <div>
                        <h3 className="footer-heading">Disclosure</h3>
                        <div className="footer-link-list">
                            <a href="https://rmd.ac.in/disclosure/ug.pdf" target="_blank" className="footer-link">AICTE</a>
                            <a href="https://rmd.ac.in/nba.html" target="_blank" className="footer-link">NBA</a>
                            <a href="https://rmd.ac.in/naac/naac.html" target="_blank" className="footer-link">NAAC</a>
                            <a href="https://rmd.ac.in/iqac.html" target="_blank" className="footer-link">IQAC</a>
                            <a href="https://rmd.ac.in/nirf/nirf.html" target="_blank" className="footer-link">NIRF</a>
                            <a href="https://rmd.ac.in/certificate/aishe.pdf" target="_blank" className="footer-link">AISHE</a>
                            <a href="https://rmd.ac.in/rti.html" target="_blank" className="footer-link">RTI</a>
                            <a href="https://rmd.ac.in/service_rules.pdf" target="_blank" className="footer-link">Service Rule</a>
                        </div>
                    </div>

                </div>

                <div className="copyright">
                    <p>&copy; {new Date().getFullYear()} R.M.D. Engineering College. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

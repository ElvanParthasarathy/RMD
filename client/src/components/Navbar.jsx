import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './Navbar.css';
import { NAV_CONFIG } from '../config/navConfig';

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <div className="nav-list">
                    {NAV_CONFIG.map((nav, index) => (
                        <div key={index} className="nav-item group">
                            {nav.type === 'link' ? (
                                <Link
                                    to={nav.path}
                                    className={`nav-link ${location.pathname === nav.path ? 'active' : ''}`}
                                >
                                    {nav.name}
                                </Link>
                            ) : (
                                <>
                                    <span className={`nav-link cursor-pointer`}>
                                        {nav.name}
                                        <ChevronDown size={14} className="ml-1" />
                                    </span>

                                    {/* Dropdown Menu */}
                                    {nav.items && nav.items.length > 0 && (
                                        <div className="dropdown-menu">
                                            {nav.items.map((item, idx) => (
                                                <React.Fragment key={idx}>
                                                    {item.url.startsWith('/') ? (
                                                        <Link
                                                            to={item.url}
                                                            className="dropdown-link"
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    ) : (
                                                        <a
                                                            href={item.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="dropdown-link"
                                                        >
                                                            {item.label}
                                                        </a>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

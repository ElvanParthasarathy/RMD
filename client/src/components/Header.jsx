import React from 'react';
import logo from '../assets/logos/rmdlogo.png';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="app-header">
            <div className="header-container">
                <div className="header-logo-container">
                    <img
                        src={logo}
                        alt="R.M.D. Engineering College Logo"
                        className="header-logo"
                    />
                </div>
                <div className="header-text">
                    <h1 className="college-name">R.M.D. ENGINEERING COLLEGE</h1>
                    <h2 className="college-subtitle">(An Autonomous Institution)</h2>
                    <p className="college-details">
                        Approved by AICTE, New Delhi & Affiliated to Anna University, Chennai<br />
                        All Eligible UG Programs Accredited by NBA & Institution Accredited by NAAC
                    </p>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="theme-toggle"
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>
        </header>
    );
}

export default Header;

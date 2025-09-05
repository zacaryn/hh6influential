'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenu = (e) => {
      if (menuOpen && !e.target.closest('.navbar')) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('click', closeMenu);
    }

    return () => document.removeEventListener('click', closeMenu);
  }, [menuOpen]);

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        {/* Logo Section */}
        <div className="logo-container">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <img src="/assets/images/hh6logo.png" alt="HH6 Logo" className="logo" />
          </Link>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Navigation Links */}
        <nav className="navbar">
          <button 
            className="menu-icon"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`hamburger ${menuOpen ? 'active' : ''}`}></span>
          </button>
          
          <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
            {[
              { path: "/", label: "Home" },
              { path: "/portfolio", label: "Portfolio" },
              { path: "/services", label: "Services" },
              { path: "/about", label: "About" },
              { path: "/contact", label: "Contact" }
            ].map(({ path, label }) => (
              <li key={path}>
                <Link 
                  href={path} 
                  className={pathname === path ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="blog-nav-item">
              <span className="nav-separator">|</span>
              <Link 
                href="/blog" 
                className={`blog-link ${pathname.startsWith('/blog') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

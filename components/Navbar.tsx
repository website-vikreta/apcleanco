'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Strip */}
      <div className="hidden md:block bg-primary-900 text-neutral-50 text-sm py-3 border-b border-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Left: Address & Phone */}
            <div className="flex gap-6">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 hover:text-accent-400 transition-colors duration-200"
                aria-label="Call us"
              >
                <i className="bi bi-telephone text-lg"></i>
                <span>+1 (234) 567-890</span>
              </a>
              <a
                href="https://maps.google.com/?q=123+Main+St+City+State"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent-400 transition-colors duration-200"
                aria-label="Visit our location"
              >
                <i className="bi bi-geo-alt text-lg"></i>
                <span>123 Main St, City, State</span>
              </a>
            </div>

            {/* Right: Social Media */}
            <div className="flex gap-4 items-center">
              <span className="text-xs uppercase tracking-wider opacity-75">Follow us:</span>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-50 hover:text-accent-400 transition-colors duration-200 hover:scale-110 transform"
                  aria-label="Visit our Instagram"
                >
                  <i className="bi bi-instagram text-xl"></i>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-50 hover:text-accent-400 transition-colors duration-200 hover:scale-110 transform"
                  aria-label="Visit our TikTok"
                >
                  <i className="bi bi-tiktok text-xl"></i>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-50 hover:text-accent-400 transition-colors duration-200 hover:scale-110 transform"
                  aria-label="Visit our YouTube"
                >
                  <i className="bi bi-youtube text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            {/* Left: Logo */}
            <div className="flex-shrink-0 animate-fade-in flex items-center">
              <Link href="/" aria-label="ApcleanCo Home" className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="ApcleanCo Logo"
                  width={50}
                  height={62}
                  priority
                  className="h-14 w-auto hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>

            {/* Center: Navigation Links (Desktop) */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-text-base font-medium text-neutral-900 hover:text-primary-500 transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              ))}
            </div>

            {/* Right: CTA & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              {/* Desktop CTA Button */}
              <Link
                href="/book"
                className="hidden md:inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-700 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 hover:shadow-lg transform hover:-translate-y-0.5 animate-fade-in"
                aria-label="Book an Appointment"
              >
                <i className="bi bi-calendar-check text-lg"></i>
                <span>Book Appointment</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-900 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-primary-500"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'} text-2xl transition-transform duration-300`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div
              id="mobile-menu"
              className="md:hidden border-t border-neutral-200 bg-white animate-slide-up"
            >
              <div className="space-y-1 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-text-base font-medium text-neutral-900 hover:bg-primary-50 hover:text-primary-500 transition-colors duration-200 border-l-4 border-transparent hover:border-primary-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="border-t border-neutral-200 p-4">
                <Link
                  href="/book"
                  className="flex items-center justify-center gap-2 w-full bg-primary-500 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-700 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="bi bi-calendar-check text-lg"></i>
                  <span>Book Appointment</span>
                </Link>
              </div>

              {/* Mobile Social Media */}
              <div className="border-t border-neutral-200 p-4 flex justify-center gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 hover:text-primary-500 transition-colors duration-200"
                  aria-label="Visit our Instagram"
                >
                  <i className="bi bi-instagram text-2xl"></i>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 hover:text-primary-500 transition-colors duration-200"
                  aria-label="Visit our TikTok"
                >
                  <i className="bi bi-tiktok text-2xl"></i>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 hover:text-primary-500 transition-colors duration-200"
                  aria-label="Visit our YouTube"
                >
                  <i className="bi bi-youtube text-2xl"></i>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Here you would send the email to your backend
      console.log('Subscribe:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const portfolioImages = [
    { id: 1, src: '/logo.svg', alt: 'Project 1' },
    { id: 2, src: '/logo.svg', alt: 'Project 2' },
    { id: 3, src: '/logo.svg', alt: 'Project 3' },
    { id: 4, src: '/logo.svg', alt: 'Project 4' },
    { id: 5, src: '/logo.svg', alt: 'Project 5' },
    { id: 6, src: '/logo.svg', alt: 'Project 6' },
  ];

  const navigationLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blog' },
  ];

  const socialLinks = [
    { label: 'Instagram', icon: 'bi-instagram', url: 'https://instagram.com' },
    { label: 'TikTok', icon: 'bi-tiktok', url: 'https://tiktok.com' },
    { label: 'YouTube', icon: 'bi-youtube', url: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Newsletter Subscription Banner */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-3 text-white">
            Stay Updated
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Subscribe to our newsletter for cleaning tips, special offers, and updates on our latest services.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg bg-white text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-primary-600 transition-all"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-accent-500 text-neutral-900 font-bold rounded-lg hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 transition-all active:scale-95 hover:scale-105 duration-200"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </button>
          </form>
          
          {subscribed && (
            <p className="mt-4 text-primary-100 font-medium animate-pulse">
              ✓ Thank you for subscribing!
            </p>
          )}
        </div>
      </section>

      {/* Main Footer Content */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Column 1: Logo & About */}
            <div className="flex flex-col gap-4">
              <div className="h-16 w-auto mb-4">
                <Image
                  src="/logo.svg"
                  alt="ApcleanCo Logo"
                  width={150}
                  height={60}
                  className="h-full w-auto object-contain brightness-0 invert"
                />
              </div>
              <p className="text-neutral-300 leading-relaxed">
                ApcleanCo is your trusted partner in professional cleaning services. We deliver exceptional cleanliness and reliability for residential and commercial spaces.
              </p>
              <div className="pt-4">
                <p className="text-sm text-neutral-400 mb-2">📞 Contact</p>
                <p className="text-neutral-100 font-medium">1-800-CLEAN-CO</p>
                <p className="text-neutral-100 font-medium">123 Clean Street, City, ST 12345</p>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-accent-500">Quick Links</h3>
              <nav aria-label="Footer navigation">
                <ul className="space-y-3">
                  {navigationLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-neutral-300 hover:text-accent-500 transition-colors duration-200 hover:translate-x-1 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 3: Portfolio Grid & Social */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-accent-500">Our Work</h3>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {portfolioImages.map((image) => (
                  <div
                    key={image.id}
                    className="w-24 h-24 bg-neutral-800 rounded-lg overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Social Media Follow */}
              <div>
                <p className="text-sm text-neutral-400 mb-4">Follow Us</p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center hover:bg-accent-500 transition-all duration-300 hover:scale-110 active:scale-95"
                      aria-label={`Follow us on ${social.label}`}
                    >
                      <i className={`bi ${social.icon} text-lg text-white`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-800" />

          {/* Copyright Bar */}
          <div className="pt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-6 text-neutral-400 text-sm">
            <p className="text-center md:text-left">
              &copy; 2026 ApcleanCo | All Rights Reserved
            </p>
            <nav className="flex flex-col sm:flex-row justify-center md:justify-end gap-4 md:gap-8" aria-label="Footer legal links">
              <Link href="/disclaimer" className="hover:text-accent-500 transition-colors duration-200 text-center md:text-right">
                Disclaimer
              </Link>
              <Link href="/terms" className="hover:text-accent-500 transition-colors duration-200 text-center md:text-right">
                Terms of Use
              </Link>
              <Link href="/privacy" className="hover:text-accent-500 transition-colors duration-200 text-center md:text-right">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </section>
    </footer>
  );
}

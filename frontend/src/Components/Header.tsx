"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header-medium">
      <div className="nav-medium">
        {/* Logo */}
        <Link href="/" className="logo-medium">
          Postify 
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="nav-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/blog">Stories</Link>
            </li>
            <li>
              <Link href="/search" className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right side actions */}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="container-medium py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Stories
              </Link>
              <Link 
                href="/search" 
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </Link>
       
              </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;


import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header-medieval fixed w-full top-0 z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-cinzel text-got-gold">Game of Thrones</h1>
        </Link>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/dashboard" className="font-medieval text-got-black hover:text-got-gold transition-colors">
                The Realm
              </Link>
            </li>
            <li>
              <a href="#" className="font-medieval text-got-black hover:text-got-gold transition-colors">
              Lords
              </a>
            </li>
            <li>
              <Link to="/crown-summary" className="font-medieval text-got-black hover:text-got-gold transition-colors">
                The Crown
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

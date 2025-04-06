
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="card-medieval p-8 max-w-md text-center">
        <h1 className="text-4xl font-cinzel text-got-gold mb-4">404</h1>
        <h2 className="text-2xl font-cinzel text-got-ivory mb-6">Lost in the Seven Kingdoms</h2>
        <p className="font-lora text-got-gray mb-8">
          The page you seek is not on any map in Westeros or beyond the Narrow Sea.
        </p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-got-gold hover:bg-got-darkgold text-got-black font-cinzel transition-colors"
        >
          Return to the Throne
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

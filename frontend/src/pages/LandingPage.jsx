
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      
      <div className="z-10 text-center px-4 md:px-8 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-cinzel text-got-gold mb-6 tracking-wider">
          Game OF Thrones
        </h1>
        
        <p className="text-xl md:text-2xl font-lora text-got-ivory mb-12 leading-relaxed">
          Witness the political machinations of Westeros. Form alliances, spread influence, and claim your rightful place among the great houses.
        </p>
        
        <Link 
          to="/dashboard" 
          className="inline-block px-8 py-4 bg-got-gold hover:bg-got-darkgold text-got-black font-cinzel text-xl transition duration-300 border-2 border-got-darkgold hover:shadow-lg"
        >
          Enter The Realm
        </Link>
      </div>
      
      <div className="absolute bottom-8 w-full text-center text-got-gray font-lora z-10">
        <p>"When you play the game of thrones, you win or you die. There is no middle ground."</p>
      </div>
    </div>
  );
};

export default LandingPage;

import React, { useEffect, useState } from 'react';
import { fetchCrownSummary } from '../api';
import { Link } from 'react-router-dom';

const CrownSummary = () => {
  const [data, setData] = useState({ winner: null, summary: "Loading..." });

  useEffect(() => {
    const load = async () => {
      const result = await fetchCrownSummary();
      setData(result);
    };
    load();
  }, []);

  return (
    <div className="card-medieval p-6 mt-10 w-full md:w-3/4 lg:w-1/2 mx-auto">
      <h2 className="text-2xl font-cinzel text-got-gold mb-4 text-center">👑 The Iron Throne Goes To</h2>
      {data.winner ? (
        <div>
          <p className="text-xl text-got-ivory mb-2 text-center">
            🏆 <strong>{data.winner}</strong> has claimed the throne!
          </p>
          <h3 className="text-lg font-cinzel text-got-gold mt-4 mb-2 text-center">Why they won:</h3>
          <p className="text-got-ivory whitespace-pre-line text-center">{data.summary}</p>
        </div>
      ) : (
        <p className="text-got-ivory text-center">{data.summary}</p>
      )}
        <div className="mt-6 text-center">
            <p className="text-got-gray font-lora italic">"The throne is a heavy burden, but it is the weight of power."</p>
        </div>
        <div className="mt-4 text-center">
            <Link to="/dashboard" className="mt-4 inline-block px-6 py-2 bg-got-gold hover:bg-got-darkgold text-got-black font-cinzel text-lg transition duration-300 border-2 border-got-darkgold hover:shadow-lg">
                Return to The Realm
            </Link>
        </div>
    </div>
  );
};

export default CrownSummary;


import React from 'react';

const PoliticianCard = ({ politician }) => {
  return (
    <div className="bg-got-darkgray border border-got-gold p-4 h-full">
      <div className="flex items-start">
        <div className="w-full">
          <h3 className="font-medieval text-got-gold text-lg mb-2">{politician.name}</h3>
          <div className="flex justify-between mb-3">
            <span className="text-sm text-got-ivory">House:</span>
            <span className="text-sm text-got-gray">{politician.party}</span>
          </div>
          <div className="mt-2 pt-2 border-t border-got-gold/30">
            {/* <p className="text-xs italic text-got-gold">"{politician.slogan}"</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticianCard;


import React from 'react';

const CitizenCard = ({ citizen }) => {
  return (
    <div className="bg-got-darkgray border border-got-gold p-4 h-full">
      <div className="flex items-start">
        <div className="w-full">
          <h3 className="font-medieval text-got-gold text-lg mb-2">{citizen.name}</h3>
          <div className="flex justify-between mb-3">
            <span className="text-sm text-got-ivory">Supports:</span>
            <span className="text-sm font-semibold text-got-gold">{citizen.vote}</span>
          </div>
          <div className="text-xs text-got-gray mt-2">
            {citizen.memory && citizen.memory.length > 0 && citizen.memory[0]['because'] 
              ? citizen.memory[0]['because']
              : "No allegiances yet..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenCard;

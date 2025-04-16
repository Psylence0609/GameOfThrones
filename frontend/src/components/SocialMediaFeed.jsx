
import React from 'react';

const SocialMediaFeed = ({ posts, selectedPolitician }) => {
  // Filter posts based on the selected politician
  const filteredPosts = selectedPolitician === 'all' 
    ? posts 
    : posts.filter(post => post.metadata.name === selectedPolitician);

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scroll-parchment p-4">
      {filteredPosts.length === 0 ? (
        <div className="text-center p-6">
          <p className="text-got-gray font-medieval">No ravens from this house yet...</p>
        </div>
      ) : (
        filteredPosts.map((post, index) => (
          <div key={index} className="bg-got-black/50 border border-got-gold/60 p-4 rounded">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medieval text-got-gold">{post.metadata.name}</h4>
              <span className="text-xs text-got-gold">{post.metadata.date_time}</span>
            </div>
            <p className="text-got-ivory mb-2">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SocialMediaFeed;

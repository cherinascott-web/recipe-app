import React from 'react';
import FavoriteCard from './FavoriteCard';

const FavoritesSection = ({ favorites, onToggleFavorite }) => {
  return (
    <section className="favorites-section">
      <h2>My Favorites ❤️</h2>
      {favorites.length === 0 ? (
        <p className="empty-state">No Favorite Recipes Yet</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map(recipe => (
            <FavoriteCard 
              key={recipe.id} 
              recipe={recipe} 
              onToggleFavorite={onToggleFavorite} 
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoritesSection;
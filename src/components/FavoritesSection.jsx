import React from "react";
import RecipeCard from "../RecipeCard";

function FavoritesSection({ favorites, toggleFavorite }) {
  return (
    <div className="favorites-section">
      <h2>⭐ Favorite Recipes</h2>

      {favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <div className="recipe-grid">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              toggleFavorite={toggleFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesSection;
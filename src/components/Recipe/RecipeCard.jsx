import React, { useState } from "react";

function RecipeCard({ recipe, toggleFavorite, isFavorite }) {
  // State to show/hide ingredients
  const [show, setShow] = useState(false);

  // Create stars from rating
  const stars = "⭐".repeat(recipe.rating);

  return (
    <div className="card">
      {/* Header Section */}
      <div className="card-header">
        <div className="header-top">
          <h2>{recipe.name}</h2>
          <button
            className="fav-button"
            onClick={() => toggleFavorite(recipe)}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>

        <div className="rating">{stars}</div>
      </div>

      {/* Image Section */}
      <img
        src={recipe.image}
        alt={recipe.name}
        className="recipe-img"
      />

      {/* Content Section */}
      <div className="card-content">
        <div className="info">
          <span>⏱️ {recipe.cookTime} mins</span>
          <span className="difficulty-tag">
            {" "}
            | {recipe.difficulty}
          </span>
        </div>

        {/* Toggle Ingredients Button */}
        <button
          className="toggle-btn"
          onClick={() => setShow(!show)}
        >
          {show ? "Hide Ingredients" : "Show Ingredients"}
        </button>

        {/* Ingredient List */}
        {show && (
          <ul className="ingredient-list">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
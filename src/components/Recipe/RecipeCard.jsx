import React, { useState } from "react";

function RecipeCard({ 
  name, 
  cookTime, 
  ingredients, 
  image, 
  rating, 
  difficulty, 
  isFavorite, 
  onFavoriteClick 
}) {
  // State to toggle the visibility of the ingredient list
  const [show, setShow] = useState(false);
  
  // Create a string of stars based on the rating prop
  const stars = "⭐".repeat(rating);

  return (
    <div className="card">
      {/* 1. HEADER SECTION */}
      <div className="card-header">
        <div className="header-top">
          <h2>{name}</h2>
          <button className="fav-button" onClick={onFavoriteClick}>
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
        <div className="rating">{stars}</div>
      </div> {/* Fixed: Added this missing closing div */}

      {/* 2. IMAGE SECTION */}
      <img src={image} alt={name} className="recipe-img" />

      {/* 3. CONTENT SECTION */}
      <div className="card-content">
        <div className="info">
          <span>⏱️ {cookTime} mins</span>
          <span className="difficulty-tag"> | {difficulty}</span>
        </div>

        {/* Toggle Button */}
        <button className="toggle-btn" onClick={() => setShow(!show)}>
          {show ? "Hide Ingredients" : "Show Ingredients"}
        </button>

        {/* Conditional Rendering: Only shows if 'show' is true */}
        {show && (
          <ul className="ingredient-list">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
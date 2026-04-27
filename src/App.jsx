import React, { useState } from "react";
import { recipes } from "./data/recipes";
import RecipeCard from "./components/Recipe/RecipeCard";
import FavoritesSection from "./components/Recipe/Favorites/FavoritesSection";
import SearchBar from "./components/SearchBar";

import "./App.css";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [isDescending, setIsDescending] = useState(true);

  // --- Logic: Toggle Favorites ---
  const toggleFavorite = (recipe) => {
    if (favorites.find((fav) => fav.id === recipe.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== recipe.id));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  // --- Logic: Filter & Sort All Recipes ---
  const filteredRecipes = recipes
    .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return isDescending ? dateB - dateA : dateA - dateB;
    });

  // --- Logic: Top Rated Section (3 recipes with 5 stars) ---
  const topRatedRecipes = recipes
    .filter((r) => r.rating === 5)
    .slice(0, 3);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Recipe App</h1>
        
        <div className="controls">
          <input 
            type="text" 
            placeholder="Search recipes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button onClick={() => setIsDescending(!isDescending)} className="sort-btn">
            Sort by: {isDescending ? "Newest First ⬇️" : "Oldest First ⬆️"}
          </button>
        </div>
      </header>

      <main>
        {/* Section 1: Favorites (Checks off the "Empty State" requirement) */}
        <FavoritesSection 
          favorites={favorites} 
          onToggleFavorite={toggleFavorite} 
        />

        <hr />

        {/* Section 2: Top Rated (Checks off "Top Rated section" requirement) */}
        <section className="top-rated-section">
          <h2>Top Rated ⭐️</h2>
          <div className="recipe-grid">
            {topRatedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                {...recipe}
                isFavorite={favorites.some((fav) => fav.id === recipe.id)}
                onFavoriteClick={() => toggleFavorite(recipe)}
              />
            ))}
          </div>
        </section>

        <hr />

        {/* Section 3: All Recipes */}
        <section className="all-recipes-section">
          <h2>All Recipes</h2>
          {filteredRecipes.length === 0 ? (
            <p className="no-results">No recipes match your search.</p>
          ) : (
            <div className="recipe-grid">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  {...recipe}
                  isFavorite={favorites.some((fav) => fav.id === recipe.id)}
                  onFavoriteClick={() => toggleFavorite(recipe)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
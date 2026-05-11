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
  const [difficulty, setDifficulty] = useState("All");

  const toggleFavorite = (recipe) => {
    if (favorites.find((fav) => fav.id === recipe.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== recipe.id));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  const filteredRecipes = recipes
    .filter((recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((recipe) =>
      difficulty === "All" ? true : recipe.difficulty === difficulty
    )
    .sort((a, b) => {
      const dateA = new Date(a.create_date);
      const dateB = new Date(b.create_date);
      return isDescending ? dateB - dateA : dateA - dateB;
    });

  const topRatedRecipes = recipes
    .filter((recipe) => recipe.rating === 5)
    .slice(0, 3);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Recipe App</h1>

        <div className="controls">
          <SearchBar search={search} setSearch={setSearch} />

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="difficulty-filter"
          >
            <option value="All">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <button
            onClick={() => setIsDescending(!isDescending)}
            className="sort-btn"
          >
            Sort by: {isDescending ? "Newest First ⬇️" : "Oldest First ⬆️"}
          </button>
        </div>
      </header>

      <main>
        <FavoritesSection
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />

        <hr />

        <section className="top-rated-section">
          <h2>Top Rated ⭐️</h2>

          <div className="recipe-grid">
            {topRatedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites.some((fav) => fav.id === recipe.id)}
              />
            ))}
          </div>
        </section>

        <hr />

        <section className="all-recipes-section">
          <h2>All Recipes</h2>

          {filteredRecipes.length === 0 ? (
            <p className="no-results">No recipes match your search.</p>
          ) : (
            <div className="recipe-grid">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  toggleFavorite={toggleFavorite}
                  isFavorite={favorites.some((fav) => fav.id === recipe.id)}
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
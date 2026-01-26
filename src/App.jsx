import { useEffect, useState } from "react";
import { scaleRecipe } from "./calculator";
import { fetchRecipes, fetchRecipesByID } from "./api/fetchRecipes";
import "./App.css";

export default function App() {

  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [servings, setServings] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  async function loadInitialRecipe() {
    try {
      const list = await fetchRecipes();
      setRecipes(list);

      if (list.length === 0) {
        setError("No recipes found");
        setLoading(false);
        return;
      }

      const fullRecipe = await fetchRecipesByID(list[0].id);
      setSelectedRecipe(fullRecipe);
      setServings(fullRecipe.servings);
    } catch (err) {
      setError("Failed to load recipes", err);
    } finally {
      setLoading(false);
    }
  }

  loadInitialRecipe();
}, []);


  useEffect(() => {
    if (selectedRecipe) {
      localStorage.setItem("selectedRecipeId", selectedRecipe.id);
    }
  }, [selectedRecipe]);

  useEffect(() => {
    localStorage.setItem("servings", servings);
  }, [servings]);

  const handleSelectRecipe = async (recipe) => {
    try{
      const fullRecipe = await fetchRecipesByID(recipe.id);

      setSelectedRecipe(fullRecipe);
      setServings(fullRecipe.servings);

      localStorage.setItem("selectedRecipeID", recipe.id);
      localStorage.setItem("servings", fullRecipe.servings);
    } catch{
      setError("Failed to load recipe details");
    }
  }

  if (loading) {
      return (
    <div className="layout">
      <aside className="sidebar skeleton">
        <div className="skeleton-logo"></div>
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
      </aside>

      <main className="main">
        <div className="skeleton-title"></div>
        <div className="skeleton-meta"></div>

        <div className="ingredients-card">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </div>
      </main>
    </div>
  );
}

  if (error) {
    return <div className="error">{error}</div>;
  }

  /* Calculator */
  let scaledIngredients = [];
  let calculationError = null;

  try {
    scaledIngredients = scaleRecipe(selectedRecipe, servings);
  } catch (err) {
    calculationError = err.message;
  }

  const increase = () => setServings((s) => s + 1);
  const decrease = () => setServings((s) => Math.max(1, s - 1));

  const Skeleton = () => (
  <div className="layout">
    <aside className="sidebar">
      <div className="skeleton skeleton-logo" />

      <div className="recipe-list">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton skeleton-btn" />
        ))}
      </div>
    </aside>

    <main className="main">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-meta" />

      <div className="ingredients-card">
        <div className="skeleton skeleton-subtitle" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton skeleton-line" />
        ))}
      </div>
    </main>

    <div className="calculator-card">
      <div className="skeleton skeleton-calculator" />
    </div>
  </div>
);

 return (
  <div className="page-wrapper">
    <div className="layout">
      <h1 className="logo">
        <span className="m1">M</span>eal<span className="m2">M</span>ath
      </h1>

      {loading && <p>Loading recipes...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && selectedRecipe && (
        <div className="content">
          <aside className="sidebar">
            <label className="recipes">Recipes:</label>
            <div className="recipe-list">
              {recipes.map((r) => (
                <button
                  key={r.id}
                  className={`recipe-btn ${
                    r.id === selectedRecipe.id ? "active" : ""
                  }`}
                  onClick={() => {
                    handleSelectRecipe(r);
                    setServings(r.servings ?? 1);
                  }}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </aside>

          <main className="main">
            {/* Calculator FIRST */}
            <div className="calculator-card">
              <div className="calculator">
                <button className="calc-btn" onClick={decrease}>−</button>
                <span className="display">{servings}</span>
                <button className="calc-btn" onClick={increase}>+</button>
              </div>
            </div>

            {/* Details */}
            <h2>{selectedRecipe.name}</h2>

            <div className="meta">
              <span>{selectedRecipe.category}</span>
              <span>Original servings: {selectedRecipe.servings}</span>
            </div>

            <p className="description">{selectedRecipe.description}</p>

            <div className="ingredients-card">
              <h3>Ingredients</h3>
              <ul className="ingredients">
                {scaledIngredients.map((item) => (
                  <li key={item.name}>
                    <span>{item.name}</span>
                    <span>{item.scaledQuantity} {item.unit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </main>
        </div>
      )}
    </div>
  </div>
);
}
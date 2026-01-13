import { useEffect, useState } from "react";
import { scaleRecipe } from "./calculator";
import { fetchRecipes } from "./recipes";
import "./App.css";

export default function App() {
  /* -------------------- DATA STATE -------------------- */
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  /* -------------------- UI / LOGIC STATE -------------------- */
  const [servings, setServings] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* -------------------- LOAD RECIPES -------------------- */
  useEffect(() => {
    fetchRecipes()
      .then((data) => {
        setRecipes(data);

        const savedId = localStorage.getItem("selectedRecipeId");
        const savedServings = localStorage.getItem("servings");

        const initialRecipe =
          data.find((r) => r.id === Number(savedId)) || data[0];

        setSelectedRecipe(initialRecipe);
        setServings(
          savedServings ? Number(savedServings) : initialRecipe.servings
        );
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load recipes.");
        setLoading(false);
      });
  }, []);

  /* -------------------- PERSIST STATE -------------------- */
  useEffect(() => {
    if (selectedRecipe) {
      localStorage.setItem("selectedRecipeId", selectedRecipe.id);
    }
  }, [selectedRecipe]);

  useEffect(() => {
    localStorage.setItem("servings", servings);
  }, [servings]);

  /* -------------------- LOADING / ERROR -------------------- */
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
     <span class="m1">M</span>eal<span class="m2">M</span>ath
    </h1>

    <div className="content">    
     <aside className="sidebar">
         <label className="recipes">Recipes:</label>
        <div className="recipe-list">
          {recipes.map((r) => (
            <button
              key={r.id}
              className={`recipe-btn ${
                selectedRecipe && r.id === selectedRecipe.id ? "active" : ""
              }`}
              onClick={() => {
                setSelectedRecipe(r);
                setServings(r.servings);
              }}
            >
              {r.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        {/* Calculator FIRST */}
        <div className="calculator-card">
          <div className="calculator">
            <button className="calc-btn" onClick={decrease}>−</button>
            <span className="display">{servings}</span>
            <button className="calc-btn" onClick={increase}>+</button>
          </div>

          {calculationError && (
            <p className="error">{calculationError}</p>
          )}
        </div>

        {/* Details BELOW */}
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
  </div>
</div>
  );
}

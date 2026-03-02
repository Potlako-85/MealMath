import { useEffect, useState } from "react";
import { scaleRecipe } from "./calculator";
import { fetchRecipes, fetchRecipesByID, searchRecipes} from "./api/fetchRecipes";
import "./App.css";

export default function App() {

  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

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

 /* const handleSelectRecipe = async (recipe) => {
    try{
      const fullRecipe = await fetchRecipesByID(recipe.id);

      setSelectedRecipe(fullRecipe);
      setServings(fullRecipe.servings);

      localStorage.setItem("selectedRecipeID", recipe.id);
      localStorage.setItem("servings", fullRecipe.servings);
    } catch{
      setError("Failed to load recipe details");
    }
  }*/

  async function handleSelectRecipe(recipeSummary) {
  setLoadingRecipe(true);

  try {
    const fullRecipe = await fetchRecipesByID(recipeSummary.id);

    console.log("FULL RECIPE:", fullRecipe);

    setSelectedRecipe(fullRecipe);
    setServings(fullRecipe.servings);
  } catch (err) {
    
    setError("Failed to load recipe details", err);
  } finally {
    setLoadingRecipe(false);
  }
}

async function handleSearch(e) {
  const value = e.target.value;
  setSearchTerm(value);
  setSearchLoading(true);

  try {
    const results = value
      ? await searchRecipes(value)
      : await fetchRecipes();

    setRecipes(results);

    if (results.length > 0) {
      const fullRecipe = await fetchRecipesByID(results[0].id);
      setSelectedRecipe(fullRecipe);
      setServings(fullRecipe.servings);
    } else {
      setSelectedRecipe(null);
    }
  } catch (err) {
    setError("Failed to search recipes", err);
  } finally {
    setSearchLoading(false);
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

if (selectedRecipe) {
  try {
    scaledIngredients = scaleRecipe(selectedRecipe, servings);
  } catch (err) {
    calculationError = err.message;
  }
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
        <span className="meal">Meal</span><span className="math">Math</span>
      </h1>

      {error && <p className="error">{error}</p>}

        <div className="content">
          <aside className="sidebar">

          <label className="recipes">Recipes:</label>

        <div class="search-wrapper">
          <svg class="search-icon">
             class="search-icon" 
             viewBox="0 0 24 24" 
             fill="none" 
             xmlns="http://www.w3.org/2000/svg"

            <circle 
              cx="11" 
              cy="11" 
              r="7" 
              stroke="currentColor" 
               stroke-width="2"
            />
            <line 
               x1="16.65" 
               y1="16.65" 
               x2="21" 
               y2="21" 
               stroke="currentColor" 
               stroke-width="2" 
               stroke-linecap="round"
          />
          </svg>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
          {searchLoading && <p className="loading">Searching...</p>}

          {!searchLoading && recipes.length === 0 && (
            <p className="empty">No recipes found</p>
          )}

          {recipes.length > 0 && (
            <div className="recipe-list">
              {recipes.map((r) => (
                <button
                  key={r.id}
                  className={`recipe-btn ${
                   r.id === selectedRecipe?.id ? "active" : ""
                  }`}
                  onClick={() => {
                    //console.log("CLICKED:",r)
                    handleSelectRecipe(r);
                    setServings(r.servings ?? 1);
                  }}
                >
                  {r.name}
                </button>
              ))}
            </div>
          )}
          </aside>

          {loadingRecipe && <p>Loading recipe...</p>}

          {!loadingRecipe && selectedRecipe && (
            <>

          <main className="main">
          {/* Details */}
            <div className="recipe-header">
              <div className="title-group">
                <h2>{selectedRecipe.name}</h2>

            <div className="meta">
              <span>{selectedRecipe.category}</span>
              <span>Original servings: {selectedRecipe.servings}</span>
            </div>
           </div>

            {/* Calculator FIRST */}
              <div className="calculator">
                <button className="calc-btn" onClick={decrease}>−</button>
                <span className="display">{servings}</span>
                <button className="calc-btn" onClick={increase}>+</button>
              </div>
            </div>

            <p className="description">{selectedRecipe.description}</p>

            {calculationError && (
              <p className="error">{calculationError}</p>
            )}

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
          </>
          )}
        </div>
    </div>
  </div>
);
}
PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS recipe_ingredients;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipes;

-- =========================
-- Recipes
-- =========================
CREATE TABLE recipes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  servings INTEGER NOT NULL CHECK (servings > 0),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
 -- updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TRIGGER set_recipes_updated_at
  AFTER UPDATE ON recipes
  FOR EACH ROW
  BEGIN
  UPDATE recipes
  SET updated_at = datetime('now')
  WHERE id = OLD.id;
END;


CREATE INDEX idx_recipes_category ON recipes(category);
CREATE INDEX idx_recipes_name ON recipes(name);

-- =========================
-- Ingredients
-- =========================
CREATE TABLE ingredients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  unit_type TEXT NOT NULL CHECK (unit_type IN ('mass', 'volume', 'count'))
);

-- =========================
-- Recipe Ingredients
-- =========================
CREATE TABLE recipe_ingredients (
  id TEXT PRIMARY KEY,
  recipe_id TEXT NOT NULL,
  ingredient_id TEXT NOT NULL,
  quantity REAL NOT NULL CHECK (quantity > 0),
  unit TEXT NOT NULL,

  UNIQUE (recipe_id, ingredient_id),

  FOREIGN KEY (recipe_id)
    REFERENCES recipes(id)
    ON DELETE CASCADE,

  FOREIGN KEY (ingredient_id)
    REFERENCES ingredients(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_recipe_ingredients_recipe
  ON recipe_ingredients(recipe_id);

CREATE INDEX idx_recipe_ingredients_ingredient
  ON recipe_ingredients(ingredient_id);


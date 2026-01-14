CREATE TABLE Recipe (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    servings INTEGER NOT NULL CHECK (servings > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Ingredient(
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unit_type VARCHAR(20) NOT NULL
    CHECK (unit_type IN ('mass', 'volume', 'count'))
);

CREATE TABLE RecipeIngredient (
    id UUID PRIMARY KEY,
    recipe_id UUID NOT NULL,
    quantity DECIMAL (10, 3) NOT NULL CHECK (quantity > 0),
    unit VARCHAR(20) NOT NULL,

    FOREIGN KEY (recipe_id)
    REFERENCES Recipe(id)
    ON DELETE CASCADE,

    FOREIGN KEY (ingredient_id)
    REFERENCES Ingredients(id)
    ON DELETE CASCADE
);

CREATE TABLE AppUser (
    id UUID PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE Recipe
ADD COLUMN user_id UUID;

ALTER TABLE Recipe
ADD CONSTRAINT fk_recipe_user
FOREIGN KEY (user_id)
REFERENCES AppUser(id)
ON DELETE SET NULL;


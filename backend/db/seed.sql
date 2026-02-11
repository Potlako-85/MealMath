-- =====================================================
-- MealMath Seed Data (v1)
-- =====================================================

-- =========================
-- Recipes
-- =========================
INSERT INTO recipes (id, name, description, category, servings) VALUES
('r1', 'Pancakes', 'Fluffy homemade pancakes', 'Breakfast', 4),
('r2', 'Scrambled Eggs', 'Soft and creamy scrambled eggs', 'Breakfast', 2),
('r3', 'Spaghetti Bolognese', 'Classic Italian meat sauce', 'Dinner', 4),
('r4', 'Grilled Cheese Sandwich', 'Crispy bread with melted cheese', 'Lunch', 1);

-- =========================
-- Ingredients
-- =========================
INSERT INTO ingredients (id, name, unit_type) VALUES
('i1', 'Flour', 'mass'),
('i2', 'Milk', 'volume'),
('i3', 'Eggs', 'count'),
('i4', 'Butter', 'mass'),
('i5', 'Salt', 'mass'),
('i6', 'Spaghetti', 'mass'),
('i7', 'Ground Beef', 'mass'),
('i8', 'Tomato Sauce', 'volume'),
('i9', 'Bread', 'count'),
('i10', 'Cheddar Cheese', 'mass');

-- =========================
-- Recipe Ingredients
-- =========================

-- Pancakes
INSERT INTO recipe_ingredients (id, recipe_id, ingredient_id, quantity, unit) VALUES
('ri1', 'r1', 'i1', 2, 'g'),
('ri2', 'r1', 'i2', 1.5, 'g'),
('ri3', 'r1', 'i3', 2, 'pcs');

-- Scrambled Eggs
INSERT INTO recipe_ingredients (id, recipe_id, ingredient_id, quantity, unit) VALUES
('ri4', 'r2', 'i3', 4, 'pcs'),
('ri5', 'r2', 'i4', 1, 'tbsp'),
('ri6', 'r2', 'i5', 0.25, 'tsp');

-- Spaghetti Bolognese
INSERT INTO recipe_ingredients (id, recipe_id, ingredient_id, quantity, unit) VALUES
('ri7', 'r3', 'i6', 400, 'g'),
('ri8', 'r3', 'i7', 500, 'g'),
('ri9', 'r3', 'i8', 2, 'cups');

-- Grilled Cheese
INSERT INTO recipe_ingredients (id, recipe_id, ingredient_id, quantity, unit) VALUES
('ri10', 'r4', 'i9', 2, 'slices'),
('ri11', 'r4', 'i10', 2, 'slices'),
('ri12', 'r4', 'i4', 1, 'tbsp');



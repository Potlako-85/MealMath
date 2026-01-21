# MealMath Database Performance & Indexing Strategy

This document outlines the performance considerations for the MealMath database
and explains how the schema is designed to scale efficiently as the application grows.

The goal is to ensure fast reads, predictable performance, and a clean path toward future optimization.

---

## 1. Expected Usage Patterns

MealMath is a read-heavy application.

Typical user actions include:
- Viewing a list of recipes
- Selecting a recipe
- Scaling ingredient quantities (frontend logic)
- Searching for recipes by name or category

Write operations (adding recipes) are expected to be less frequent than reads.

---

## 2. Core Performance Goals

- Fast recipe list loading
- Fast recipe detail lookup
- Efficient ingredient retrieval per recipe
- Minimal unnecessary joins
- Predictable performance as data grows

---

## 3. Indexing Strategy

### Primary Keys

Each table uses a primary key:
- `recipes.id`
- `ingredients.id`
- `recipe_ingredients.id`

Primary keys are automatically indexed and allow fast lookups.

---

### Foreign Key Indexes

Indexes should exist on foreign keys to speed up joins:

- `recipe_ingredients.recipe_id`
- `recipe_ingredients.ingredient_id`

These indexes optimize queries that fetch ingredients for a given recipe.

---

### Search Indexes

To support fast searching:

- Index on `recipes.name`
- Optional index on `recipes.category`

This allows efficient filtering and searching as the number of recipes grows.

---

## 4. Query Efficiency

### Recipe List View

Common query:
*** ```sql ***
SELECT id, name, category FROM recipes;

- Lightweight query
- Uses indexed primary key
- Fast even with large datasets

## Recipe Detail View

Common query:

`SELECT r.name, i.name, ri.quantity, ri.unit`
`FROM recipes r`
`JOIN recipe_ingredients ri ON r.id = ri.recipe_id`
`JOIN ingredients i ON ri.ingredient_id = i.id`
`WHERE r.id = ?;`

- Uses indexed foreign keys
- Efficient joins
- Reaturns only required data

---

## 5. Fronted Responsibility

Ingredient scaling is intentionally handled on the fronted.

### Benefits

- Reduces database workload
- Avoids unnecessary recalculation queries
- Keeps the API simple and stateless

The database stores base quantities only.

--- 

## 6. Future Performance Considerations

As MealMath evolves, the following may be considered:

- Pagination for recipe lists
- Full-text search for recipe names
- Caching popular recipes
- User-specific collections

The current schema supports these extensions without major refactoring

---

## 7. Design Philosophy

The database prioritizes:

- Simplicity
- Read performance
- Clear relationships
- Extensibility

The approach ensures MealMath remains performant while remaining easy to reason about and maintain.

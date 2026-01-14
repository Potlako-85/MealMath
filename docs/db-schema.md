Purpose

The MealMath database is designed to support:

-Recipe storage and retrieval
-Ingredient scaling logic (already implemented in code)
-Future user-generated recipes
-Searching, filtering, and categorization
-Extensibility for nutrition data and images

This schema is technology-agnostic (can work with SQL or NoSQL).

Core Entities
1️⃣ Recipe

Represents a single recipe.

| Field         | Type      | Description              |
| ------------- | --------- | ------------------------ |
| `id`          | UUID      | Unique recipe identifier |
| `name`        | String    | Recipe name              |
| `description` | Text      | Short description        |
| `category`    | String    | e.g. Breakfast, Pasta    |
| `servings`    | Integer   | Default serving size     |
| `createdAt`   | Timestamp | Creation date            |
| `updatedAt`   | Timestamp | Last update              |

2️⃣ Ingredient

Represents an ingredient definition (reusable across recipes).

| Field      | Type   | Description           |
| ---------- | ------ | --------------------- |
| `id`       | UUID   | Unique ingredient ID  |
| `name`     | String | Ingredient name       |
| `unitType` | Enum   | mass / volume / count |

3️⃣ RecipeIngredient (Join Table)

Links recipes to ingredients with quantities.
| Field          | Type   | Description             |
| -------------- | ------ | ----------------------- |
| `id`           | UUID   | Unique row ID           |
| `recipeId`     | UUID   | Reference to Recipe     |
| `ingredientId` | UUID   | Reference to Ingredient |
| `quantity`     | Float  | Base quantity           |
| `unit`         | String | g, ml, pcs, etc         |

Relationships

-Recipe 1 → many RecipeIngredients
-Ingredient 1 → many RecipeIngredients
-Recipe → Category (many-to-one)

Future Extensions
Nutrition (v2)
-calories
-protein
-carbs
-fats

User Recipes (v2)
-userId
-ownership
-permissions

Media (v3)
-recipe images
-OCR input support

Design Decisions
-Quantities stored at base servings
-Scaling handled at runtime (already implemented)
-Ingredients normalized to avoid duplication
-Schema supports both SQL and NoSQL backends
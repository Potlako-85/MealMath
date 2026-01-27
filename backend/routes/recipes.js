import express from "express";

const router = express.Router();

const recipes = [
  {
    id: "r1",
    name: "Pancakes",
    category: "Breakfast",
    description: "Fluffy homemade pancakes",
    servings: 4,
    ingredients: [
      { id: "i1", name: "Flour", quantity: 2, unit: "cups" },
      { id: "i2", name: "Milk", quantity: 1.5, unit: "cups" },
      { id: "i3", name: "Eggs", quantity: 2, unit: "pcs" }
    ]
  },
  {
    id: "r2",
    name: "Scrambled Eggs",
    category: "Breakfast",
    description: "Soft and creamy scrambled eggs",
    servings: 2,
    ingredients: [
      { id: "i4", name: "Eggs", quantity: 4, unit: "pcs" },
      { id: "i5", name: "Butter", quantity: 1, unit: "tbsp" },
      { id: "i6", name: "Salt", quantity: 0.25, unit: "tsp" }
    ]
  },
   {
    id: "r3",
    name: "Spaghetti Bolognese",
    category: "Dinner",
    description: "Classic Italian meat sauce",
    servings: 4,
    ingredients: [
      { id: "i7", name: "Spaghetti", quantity: 400, unit: "g" },
      { id: "i8", name: "Ground Beef", quantity: 500, unit: "g" },
      { id: "i9", name: "Tomato Sauce", quantity: 2, unit: "cups" }
    ]
  },
   {
    id: "r4",
    name: "Grilled Cheese Sandwich",
    category: "Lunch",
    description: "Crispy bread with melted cheese",
    servings: 1,
    ingredients: [
      { id: "i10", name: "Bread", quantity: 2, unit: "slices" },
      { id: "i11", name: "Cheddar Cheese", quantity: 2, unit: "slices" },
      { id: "i12", name: "Butter", quantity: 1, unit: "tbsp" }
    ]
  }
];

// GET /api/recipes?search=
router.get("/", async (req, res) => {
  const search = req.query.search?.trim().toLowerCase();

  let result = recipes;

  if (search) {
    result = recipes.filter(recipe => {
      return (
        recipe.name.toLowerCase().includes(search) ||
        recipe.category?.toLowerCase().includes(search) ||
        recipe.ingredients.some(ing =>
          ing.name.toLowerCase().includes(search)
        )
      );
    });
  }

  res.json(
    result.map(r => ({
      id: r.id,
      name: r.name,
      category: r.category
    }))
  );
});


// GET /api/recipes/:id
router.get("/:id", (req, res) => {
  const recipe = recipes.find(r => r.id === req.params.id);

  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  res.json(recipe);
});

export default router;

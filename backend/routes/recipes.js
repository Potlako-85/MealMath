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
  }
];

// GET /api/recipes
router.get("/", (req, res) => {
  res.json(recipes);
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

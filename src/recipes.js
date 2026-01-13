export async function fetchRecipes() {
  return [
    {
      id: 1,
      name: "Pancakes",
      category: "Breakfast",
      description: "Fluffy breakfast pancakes, perfect with syrup or fruit.",
      servings: 2,
      ingredients: [
        { name: "Flour", quantity: 200, unit: "g" },
        { name: "Milk", quantity: 300, unit: "ml" },
        { name: "Eggs", quantity: 2, unit: "pcs" },
      ],
    },
    {
      id: 2,
      name: "Spaghetti Bolognese",
      category: "Dinner",
      description: "Classic Italian pasta with rich meat sauce.",
      servings: 4,
      ingredients: [
        { name: "Spaghetti", quantity: 400, unit: "g" },
        { name: "Minced beef", quantity: 500, unit: "g" },
        { name: "Tomato sauce", quantity: 500, unit: "ml" },
        { name: "Onion", quantity: 1, unit: "pcs" },
      ],
    },
    {
      id: 3,
      name: "Chicken Stir Fry",
      category: "Dinner",
      description: "Quick and healthy chicken stir fry with vegetables.",
      servings: 3,
      ingredients: [
        { name: "Chicken breast", quantity: 450, unit: "g" },
        { name: "Mixed vegetables", quantity: 300, unit: "g" },
        { name: "Soy sauce", quantity: 50, unit: "ml" },
      ],
    },
    {
      id: 4,
      name: "Banana Smoothie",
      category: "Drinks",
      description: "Creamy banana smoothie, great post-workout.",
      servings: 1,
      ingredients: [
        { name: "Banana", quantity: 2, unit: "pcs" },
        { name: "Milk", quantity: 250, unit: "ml" },
        { name: "Honey", quantity: 20, unit: "ml" },
      ],
    },
    {
      id: 5,
      name: "Garlic Bread",
      category: "Sides",
      description: "Crispy garlic bread with buttery flavour.",
      servings: 4,
      ingredients: [
        { name: "Bread", quantity: 1, unit: "pcs" },
        { name: "Butter", quantity: 100, unit: "g" },
        { name: "Garlic", quantity: 3, unit: "pcs" },
      ],
    },
    {
      id: 6,
      name: "Omelette",
      category: "Breakfast",
      description: "Simple and quick egg omelette.",
      servings: 1,
      ingredients: [
        { name: "Eggs", quantity: 3, unit: "pcs" },
        { name: "Milk", quantity: 30, unit: "ml" },
        { name: "Butter", quantity: 10, unit: "g" },
      ],
    },
  ];
}

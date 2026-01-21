# MealMath API Design (v1)

This document describes the planned REST API for the MealMath application.
The API acts as the interface between the frontend (React) and the database.

---

## Base URL

/api

---

## Resources

- Recipes
- Ingredients

---

## Endpoints

### Get all recipes

**GET** `/api/recipes`

Returns a list of available recipes for the sidebar.

**Response**
 ```json ```
[
  {
    "id": "r1",
    "name": "Pancakes",
    "category": "Breakfast"
  }
]

---

### Get recipe by ID

GET /api/recipes/{id}

Returns full recipe details including ingredients and base serving size.

**Response**

{
  "id": "r1",
  "name": "Pancakes",
  "category": "Breakfast",
  "description": "Fluffy homemade pancakes",
  "servings": 4,
  "ingredients": [
    {
      "id": "i1",
      "name": "Flour",
      "quantity": 2,
      "unit": "cups"
    }
  ]
}

---

## Search recipes

GET /api/recipes?search=pancake

Filters recipes by name.

---

## Notes

- Ingredient scaling is handled on the frontend

- API returns base quantities only

- API is stateless and JSON-based


## Future Endpoints

-POST /api/recipes

-PUT /api/recipes/{id}

-DELETE /api/recipes/{id}

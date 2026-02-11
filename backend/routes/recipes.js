import express from "express";
//import initDatabase from "../db/database.js";
//import makeRecipeRepository from "../db/repositories/recipes.js";



export default function recipeRouter(recipeRepo){
  const router = express.Router();

// GET /api/recipes?search=
router.get("/", async (req, res) => {
try{
  const search = req.query.search?.trim();
  let result;

  if (search) {
    result = await recipeRepo.search(search);
  }else{
    result = await recipeRepo.getAll();
  }
 res.json(result);
  
} catch(err){
  console.error(err);
  res.status(500).json({error: "Failed to fetch recipes"}); 
}
});

// GET /api/recipes/:id
router.get("/:id", async (req, res) => {
  try{
    const recipe = await recipeRepo.getById(req.params.id);

  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  res.json(recipe);
}catch(err){
  console.error(err);
  res.status(500).json({error: "Failed to fetch recipe"})
}
});

return router;
}

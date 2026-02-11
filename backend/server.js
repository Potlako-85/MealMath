import express from "express";
import cors from "cors";
import initDatabase from "./db/database.js";
import recipesRouter from "./routes/recipes.js";
import makeRecipeRepository from "./db/repositories/recipes.js";

const app = express();
app.use(cors());
app.use(express.json());

async function bootstrap(){
  const db = await initDatabase();
  const recipeRepo = makeRecipeRepository(db);

 app.use("/api/recipes", recipesRouter(recipeRepo));

  app.listen(3001, () =>
    console.log("Server running on http://localhost:3001"));
}

bootstrap();




import express from "express";
import cors from "cors";
import initDatabase from "./db/database.js";
import recipesRouter from "./routes/recipes.js";
import makeRecipeRepository from "./db/repositories/recipes.js";

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json());

async function bootstrap(){
  const db = await initDatabase();
  const recipeRepo = makeRecipeRepository(db);

 app.use("/api/recipes", recipesRouter(recipeRepo));

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`));
}

bootstrap();




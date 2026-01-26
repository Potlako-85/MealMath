//import { mockRecipes } from "../mockRecipes";

const API_BASE = "http://localhost:3001/api";

export async function fetchRecipes() {
    const res = await fetch(`${API_BASE}/recipes`);

    if (!res.ok) {
      throw new Error("API failed");
    }
  return await res.json();
  }
    

  export async function fetchRecipesByID (id){
    const res = await fetch(`${API_BASE}/recipes/${id}`);
    if (!res.ok) throw new Error("Failed to fetch reecipe");
    return res.json();

}

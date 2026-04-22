const VITE_API_URL = "http://localhost:3001";
const API_BASE = import.meta.env.VITE_API_URL;

export async function fetchRecipes() {
    const res = await fetch(`${API_BASE}/recipes`);

    if (!res.ok) {
      throw new Error("API failed");
    }
  return await res.json();
  }
    
  export async function fetchRecipesByID (id){
    const res = await fetch(`${API_BASE}/recipes/${id}`);
    if (!res.ok) throw new Error("Failed to fetch recipe");
    return res.json();

}

export async function searchRecipes(query) {
  const res= await fetch(
    `${API_BASE}/recipes?search=${encodeURIComponent(query)}`
  );
  if(!res.ok) {
    throw new Error("Failed to search recipes");
  }
  return res.json();
}

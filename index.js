function scaleRecipe(recipe,  targetServings){

  if (typeof targetServings !== "number" || isNaN(targetServings)){
    throw new Error ("Target servings must be a number.");
  }

  if (targetServings <= 0) {
    throw new Error ("Target servings must be greater than 0.");
  }

    const factor = targetServings / recipe.servings;

    return recipe.ingredients.map(item => {
        const scaledQuantity = item.quantity * factor;

        return{
            name : item.name,
            quantity: Number(scaledQuantity.toFixed(2)),
            unit: item.unit
        };
    });
} 

try {
const targetServings = "abs";
const scaledIngredients = scaleRecipe(recipe, targetServings);

scaledIngredients.forEach(item => {
    console.log(`${item.name}: ${item.quantity} ${item.unit}`);
});
} catch (error) {
   console.error("Error:", error.message);
}
const recipe = {
  name: "Pancakes",
  servings: 6,
  ingredients: [
    { name: "Flour", quantity: 2, unit: "cups" },
    { name: "Milk", quantity: 1.5, unit: "cups" },
    { name: "Eggs", quantity: 2, unit: "pcs" }
  ]
};

function scaleRecipe(recipe,  targetServings){
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

const targetServings = 10;
const scaledIngredients = scaleRecipe(recipe, targetServings);

scaledIngredients.forEach(item => {
    console.log(`${item.name}: ${item.quantity} ${item.unit}`);
})
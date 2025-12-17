const recipe = {
  name: "Pancakes",
  servings: 6,
  ingredients: [
    { name: "Flour", quantity: 2, unit: "cups" },
    { name: "Milk", quantity: 1.5, unit: "cups" },
    { name: "Eggs", quantity: 2, unit: "pcs" }
  ]
};

const unitConversions = {
  cups: {
    tbsp: 16,
    tsp: 48
  },
  tbsp: {
    cups: 1 / 16,
    tsp: 3
  },
  tsp: {
    tbsp: 1 / 3,
    cups: 1 / 48
  }
};

function convertUnit (quantity, fromUnit, toUnit){
  if (fromUnit === toUnit)
    return quantity;
   const conversion = unitConversions[fromUnit]?.[toUnit];

   if (!conversion){
    throw new Error (`Cannot convert from ${fromUnit} to ${toUnit}`);
   }
   return quantity * conversion;
}

function canConvert(fromUnit, toUnit){
  return unitConversions [fromUnit]?.[toUnit] !== undefined;
}

function scaleRecipe(recipe,  targetServings, targetUnit = null){

  if (typeof targetServings !== "number" || isNaN(targetServings)){
    throw new Error ("Target servings must be a number.");
  }

  if (targetServings <= 0) {
    throw new Error ("Target servings must be greater than 0.");
  }

    const factor = targetServings / recipe.servings;

    return recipe.ingredients.map(item => {
      let quantity = item.quantity * factor;
      let unit = item.unit;

      if (targetUnit && canConvert (item.unit, targetUnit)){
        quantity = convertUnit (quantity, item.unit, targetUnit);
        unit = targetUnit;
      }

        return{
            name : item.name,
            quantity: Number(quantity.toFixed(2)),
            unit: item.unit
        };
    });
} 

const targetServingsInput = process.argv[2];
const targetUnit = process.argv[3] || null;

const targetServings = Number (targetServingsInput);

if (!targetServingsInput){
  console.error("Usage: node index.js <servings> [unit]");
  process.exit(1);
}

try{
const scaledIngredients = scaleRecipe(recipe, targetServings, targetUnit);
 
console.log(`\nScaled recipe for ${targetServings} servings:\n`);

scaledIngredients.forEach(item => {
    console.log(`${item.name}: ${item.quantity} ${item.unit}`);
});
} catch (error) {
   console.error("Error:", error.message);
}

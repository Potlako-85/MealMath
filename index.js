function scaleIngredient(amount, baseServings, targetServings)
{
    return (amount / baseServings) * targetServings;

}

const ingredients = [{name: "flour", amount: 200, unit: "g"},
    {name: "sugar", amount: 100, unit: "g"},
    {name: "butter", amount: 50, unit: "g"}
];

const baseServings = 4;
const targetServings = Number(process.argv[2]);

if (!targetServings || targetServings <= 0)
{
   console.log("Please enter a avlid number of servings.");
   Processing.exit(1);
}
ingredients.forEach(item => {
    const scaled = scaleIngredient(item.amount, baseServings, targetServings);
    console.log(`${item.name}: ${scaled}${item.unit}`);
})
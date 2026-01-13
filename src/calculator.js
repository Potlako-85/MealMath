export function roundQuantity(value){
    if (value < 1) return Math.round(value * 10)/10;
    if (value < 10) return Math.round(value * 2)/2;
    return Math.round(value);
}

export const unitGroups = {
    mass: ["g", "kg"],
    volume: ["ml", "l"],
    count: ["pcs"],
};

const conversionTable = {
  g: { unit: "kg", factor: 1000 },
  kg: { unit: "g", factor: 1 / 1000 },

  ml: { unit: "l", factor: 1000 },
  l: { unit: "ml", factor: 1 / 1000 },
};


export function checkUnitCompatibility(unit) {
  if (unitGroups.mass.includes(unit)) return "mass";
  if (unitGroups.volume.includes(unit)) return "volume";
  if (unitGroups.count.includes(unit)) return "count";
  return null;
}

export function normalizeUnit(quantity, unit) {
  const rule = conversionTable[unit];
  if (!rule) return { quantity, unit };

  if (quantity >= rule.factor) {
    return {
      quantity: quantity / rule.factor,
      unit: rule.unit,
    };
  }

  return { quantity, unit };
}

export function scaleRecipe(recipe, targetServings) {
  if (!Number.isFinite(targetServings) || targetServings <= 0) {
    throw new Error("Servings must be a positive number");
  }

  const factor = targetServings / recipe.servings;

  return recipe.ingredients.map((item) => {
    const type = checkUnitCompatibility(item.unit);

    if (!type) {
      throw new Error(`Unknown unit: ${item.unit}`);
    }

    const scaled = item.quantity * factor;

   const normalized = normalizeUnit(scaled, item.unit);

return {
  ...item,
  unit: normalized.unit,
  scaledQuantity: roundQuantity(normalized.quantity),
   };
  });
}




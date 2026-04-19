// =========================
// Unit Groups
// =========================
export const unitGroups = {
  mass: ["g", "kg", "oz"],
  volume: ["ml", "l", "tsp", "tbsp", "cup"],
  count: ["pcs"],
};

// =========================
// Conversion Factors to Base Units
// =========================
const toBaseUnit = {
  // Mass
  g: 1,
  kg: 1000,
  oz: 28.3495,

  // Volume
  ml: 1,
  l: 1000,
  tsp: 5,
  tbsp: 15,
  cup: 240,

  // Count
  pcs: 1,
};

const fromBaseUnit = {
  mass: [
    { unit: "kg", factor: 1000 },
    { unit: "g", factor: 1 },
    { unit: "oz", factor: 28.3495 },
  ],
  volume: [
    { unit: "l", factor: 1000 },
    { unit: "cup", factor: 240 },
    { unit: "tbsp", factor: 15 },
    { unit: "tsp", factor: 5 },
    { unit: "ml", factor: 1 },
  ],
  count: [
    { unit: "pcs", factor: 1 }
  ],
};

// =========================
// Helper Functions
// =========================

// Determine the type of a unit (mass, volume, count)
export function checkUnitCompatibility(unit) {
  if (unitGroups.mass.includes(unit)) return "mass";
  if (unitGroups.volume.includes(unit)) return "volume";
  if (unitGroups.count.includes(unit)) return "count";
  return null;
}

export function convertToBase(quantity, unit) {
  const factor = toBaseUnit[unit];
  if (!factor) return null;
  return quantity * factor;
}

export function convertFromBase(quantity, type) {
  const units = fromBaseUnit[type];
  for (const option of units) {
    const value = quantity / option.factor;
    if (value >= 1) {
      return { quantity: value, unit: option.unit };
    }
  }

  const last = units[units.length - 1];
  return { quantity: quantity / last.factor, unit: last.unit };
}

export function roundQuantity(value) {
  if (value < 1) return Math.round(value * 10) / 10;
  if (value < 10) return Math.round(value * 2) / 2;
  return Math.round(value);
}

export function toFraction(value) {
  const fractions = [
    { value: 0.25, label: "1/4" },
    { value: 0.33, label: "1/3" },
    { value: 0.5, label: "1/2" },
    { value: 0.66, label: "2/3" },
    { value: 0.75, label: "3/4" },
  ];
  const whole = Math.floor(value);
  const decimal = value - whole;
  const match = fractions.find(f => Math.abs(decimal - f.value) < 0.05);
  if (!match) return value;
  if (whole === 0) return match.label;
  return `${whole} ${match.label}`;
}

// =========================
// Main Scaling Function
// =========================
export function scaleRecipe(recipe, targetServings) {
  if (!Number.isFinite(targetServings) || targetServings <= 0) {
    throw new Error("Servings must be a positive number");
  }

  const factor = targetServings / recipe.servings;

  return recipe.ingredients.map((item) => {
    const type = checkUnitCompatibility(item.unit);

    if (!type) {
      return {
        ...item,
        scaledQuantity: roundQuantity(item.quantity * factor),
        unit: item.unit,
        error: `Unknown unit: ${item.unit}`,
      };
    }

    const baseQuantity = convertToBase(item.quantity, item.unit);
    if (baseQuantity === null) {
      return {
        ...item,
        scaledQuantity: roundQuantity(item.quantity * factor),
        unit: item.unit,
        error: `Cannot convert unit: ${item.unit}`,
      };
    }

    const scaledBase = baseQuantity * factor;

    const converted = convertFromBase(scaledBase, type);

    return {
      ...item,
      unit: converted.unit,
      scaledQuantity: roundQuantity(converted.quantity),
    };
  });
}
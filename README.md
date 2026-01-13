<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# 🍽️ MealMath (MVP)

MealMath is a recipe-scaling calculator that helps users accurately adjust ingredient quantities based on the number of servings they want to cook for.

The project began as a **command-line MVP**, focusing on core calculation logic, unit conversions, and input validation. It is actively being developed into a full web application.

---

## ✨ Features

- Scale recipes up or down based on target servings
- Automatic ingredient quantity recalculation
- Basic unit conversion support (`cups`, `tbsp`, `tsp`)
- Input validation with clear error messages
- Command-line interface (CLI) usage
- Designed with future UI and database integration in mind

---

## 🧠 How It Works

The program performs the following steps:

1. Calculates a scaling factor using  
   `targetServings / originalServings`
2. Applies the factor to each ingredient
3. Optionally converts units if a compatible target unit is provided
4. Rounds quantities to two decimal places for readability

All logic is isolated into pure functions to allow easy reuse in future versions (web UI, API, database).

---

## ▶️ Usage

### Run the program:

```node index.js <servings> [unit]```

### Example
node index.js 10 tbsp

### Output
Scaled recipe for 10 servings:

Flour: 53.33 tbsp
Milk: 40 tbsp
Eggs: 3.33 pcs

---

## 🛠️ Tech Stack

-JavaScript (Node.js)

-No external libraries (logic-first MVP)

---

## 🛣️ Roadmap

-Web-based UI (React)

-Recipe selection and categorization

-User-added recipes

-Database-backed persistence

-Search and filtering

-Nutritional information

-Image-based recipe input (OCR exploration)

---

## 👤 Author

Potlako Makofane
3rd Year Computer Science Student

This project is part of a personal portfolio focused on building real, scalable software systems.

---

## 📝 Notes

This repository represents an early-stage MVP.
The project is under active development and will continue to evolve as new features and architectural improvements are added.

---
>>>>>>> 16a65ca44e5248ce77e3461c7be88e619927ae74

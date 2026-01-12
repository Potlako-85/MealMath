MealMath (MVP)

MealMath is a recipe-scaling calculator designed to help users accurately adjust ingredient quantities based on the number of servings they want to cook for. The project started as a command-line MVP focused on 

core calculation logic and unit conversions, and is being actively evolved into a full web application.

This repository currently contains the initial MVP, which prioritizes correctness, validation, and extensibility.

Features:

-Scale recipes up or down based on target servings

-Automatic ingredient quantity recalculation

-Basic unit conversion support (cups, tbsp, tsp)

-Input validation with clear error messages

-Command-line interface (CLI) usage

-Designed with future UI and database integration in mind

The core logic:

1.Calculates a scaling factor using
targetServings / originalServings

2.Applies the factor to each ingredient

3.Optionally converts units if a compatible target unit is provided

4.Rounds quantities to two decimal places for readability

All logic is isolated into pure functions to make future reuse (web UI, API, database) straightforward.

To run the program:
node index.js <servings> [unit]

Example: 
Input
node index.js 10 tbsp
Output
Scaled recipe for 10 servings:

Flour: 53.33 tbsp
Milk: 40 tbsp
Eggs: 3.33 pcs

Tech Stack:
-JavaScript (Node.js)
-No external libraries (logic-first MVP)

Roadmap:
This MVP is the foundation for future versions, including:

-Web-based UI (React)

-Recipe selection and categorization

-User-added recipes

-Database-backed persistence

-Search and filtering

-Nutritional information

-Image-based recipe input (OCR exploration)

The current implementation was intentionally kept simple to ensure correctness before adding complexity.

Author:
Potlako Makofane

3rd year Computer Science Student

This project is part of a personal portfolio focused on building real, scalable software systems.

Notes

This repository represents an early-stage MVP. The project is under active development and will evolve significantly as features are added and the architecture grows.

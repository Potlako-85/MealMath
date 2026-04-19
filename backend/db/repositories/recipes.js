export default function makeRecipeRepository(db){
    return{
        async getAll() {
         return await db.all(
            'SELECT id, name, category FROM recipes ORDER BY category, name'
         );
        },

        async getById(id){
            const recipe = await db.get(
                `SELECT id, name, description, category, servings
                FROM recipes
                WHERE id=?`,
                id
            );

            if (!recipe) return null;

            const ingredients = await db.all(
                `SELECT ri.id AS recipeIngredientId,
                 i.id AS ingredientId,
                 i.name,
                 ri.quantity,
                ri.unit
                FROM recipe_ingredients ri
                JOIN ingredients i ON ri.ingredient_id = i.id
                WHERE ri.recipe_id = ?`,
                id
            );
            return {...recipe, ingredients};

        },

        async search(query) {
            const likeQuery = `%${query.toLowerCase()}%`;

            return await db.all(
                `SELECT DISTINCT r.id, r.name, r.category
                FROM recipes r
                LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
                LEFT JOIN ingredients i ON ri.ingredient_id = i.id
                WHERE LOWER(r.name) LIKE ?
                  OR LOWER(r.category) LIKE ?
                  OR LOWER(i.name) LIKE ?
                ORDER BY r.name`,
                likeQuery,
                likeQuery,
                likeQuery
            );
        },
        //For future:
        //async create
        //async update
       //async delete
    };
}
import React from "react"
import IngredientsList from "./components/IngredientsList"
import GptRecipe from "./components/GptRecipe"
import getRecipeFromGPT from "./ai"

export default function MainContent() {
    const [ingredients, setIngredients] = React.useState(
        []
    );
    const [recipe, setRecipe] = React.useState("");

    async function getRecipe() {
        try {
            const recipeMarkdown = await getRecipeFromGPT(ingredients);
            setRecipe(recipeMarkdown);
        } catch (error) {
            console.error("Failed to fetch the recipe:", error);
        }
    }

    function addIngredient(event) {
        event.preventDefault(); // Prevent the form from refreshing the page
        const formData = new FormData(event.target);
        const newIngredient = formData.get("ingredient");
        if (newIngredient) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
        }
        event.target.reset(); // Clear the input field
    }

    return (
        <main>
            <h3 className="help-text">Add at least 3 ingredients to ask chef GPT for a recipe</h3>

            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button type="submit">Add ingredient</button>
            </form>


            {ingredients.length > 0 && (
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            )}

            {recipe && <GptRecipe recipe={recipe} />}
        </main>
    );
}
import { Button } from "@heroui/react";
import { memo } from "react"
import IngredientAndQuantityForm from "./IngredientAndQuantityForm";
import { formsConfig } from "@/config";
import { useIngredient } from "@/hooks/useIngredient.";

const RecipeIngredients = memo(() => {
    const { ingredients, addIngredient } = useIngredient();

    const isAddingIngredientsDisabled = ingredients.length >= formsConfig.maxIngredientsPerRecipe;

    return (
        <div>
            {ingredients.map(({ ingredientId, quantity, formId }) => (
                <IngredientAndQuantityForm
                    formId={formId}
                    ingredientValue={ingredientId}
                    key={formId}
                    quantityValue={quantity.toString()}
                />
            ))}

            <Button onPress={addIngredient} isDisabled={isAddingIngredientsDisabled}>+</Button>
        </div>
    )
});

export default RecipeIngredients;

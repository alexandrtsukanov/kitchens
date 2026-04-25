import { Button } from "@heroui/react";
import { memo } from "react"
import IngredientAndQuantityForm from "./IngredientAndQuantityForm";
import { formsConfig } from "@/config";
import { IRecipeIngridientForm } from "@/model";

interface IProps {
    ingredients: IRecipeIngridientForm[];
    changeIngredient: (id: number, value: string) => void;
    changeQuantity: (id: number, value: number) => void;
    addIngredient: () => void;
    removeIngredient: (id: number) => void;
}

const RecipeIngredients = memo(({
    ingredients,
    changeIngredient,
    changeQuantity,
    addIngredient,
    removeIngredient,
}: IProps) => {
    const isAddingIngredientsDisabled = ingredients.length >= formsConfig.maxIngredientsPerRecipe;
    
    return (
        <>
            {ingredients.map(({ ingredientId, quantity, formId }) => (
                <IngredientAndQuantityForm
                    formId={formId}
                    ingredientValue={ingredientId}
                    key={formId}
                    quantityValue={quantity.toString()}
                    changeIngredient={changeIngredient}
                    changeQuantity={changeQuantity}
                    removeIngredient={removeIngredient}
                />
            ))}

            <Button
                onPress={addIngredient}
                isDisabled={isAddingIngredientsDisabled}
                variant="secondary"
            >
                +
            </Button>
        </>
    )
});

export default RecipeIngredients;

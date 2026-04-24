import { IRecipeIngridientForm } from "@/model";
import { useIngredientsState } from "@/store/ingredients";
import { useCallback, useState } from "react";

export function useIngredient() {
    const [ingredients, setIngredients] = useState<IRecipeIngridientForm[]>([
        { ingredientId: '', ingredient: null, quantity: 1, formId: Math.random() },
    ]);

    const { ingredientsState: { data: allIngredients } } = useIngredientsState();

    const changeIngredient = useCallback((id: number, value: string) => {
        const ingredient = allIngredients.find(ingr => ingr.id === value);

        if (!ingredient) return;

        setIngredients(prev => prev.map(ingr => ingr.formId === id ? { ...ingr, ingredientId: value, ingredient } : ingr));
    }, []);

    const changeQuantity = useCallback((id: number, value: number) => {
        setIngredients(prev => prev.map(ingr => ingr.formId === id ? { ...ingr, quantity: value } : ingr));
    }, []);

    const addIngredient = useCallback(() => {
        setIngredients(prev => [...prev, { ingredientId: '', ingredient: null, quantity: 1, formId: Math.random() }]);
    }, [])

    const removeIngredient = useCallback((id: number) => {
        setIngredients(prev => {
            if (prev.length === 1) {
                return prev;
            }

            return prev.filter(ingr => ingr.formId !== id)
        });
    }, []);

    return {
        ingredients,
        changeIngredient,
        changeQuantity,
        addIngredient,
        removeIngredient,
    }
};

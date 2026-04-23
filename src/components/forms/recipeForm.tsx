'use client';

import { Button, Form } from "@heroui/react";
import { ChangeEvent, SyntheticEvent, useCallback, useMemo, useState, useTransition } from "react";
import Input from "../UI/input";
import { formsConfig } from "@/config";
import { IRecipeForm } from "@/model/recipe";
import IngredientAndQuantityForm from "../layout/IngredientAndQuantityForm";
import { useRecipesState } from "@/store/recipe";

const initFormData: IRecipeForm = {
    name: '',
    description: '',
    imageUrl: '',
    ingredients: [],
}

const RecipeForm = () => {
    const [formData, setFormData] = useState<IRecipeForm>(initFormData);
    const [ingredients, setIngredients] = useState([{ ingredientId: '', quantity: 1, formId: Math.random() }]);
    const [error, setError] = useState<string | null>(null);

    const { addRecipe, recipesState: { error: recipeError } } = useRecipesState();

    const changeIngredient = useCallback((id: number, value: string) => {
        setIngredients(prev => prev.map(ingr => ingr.formId === id ? { ...ingr, ingredientId: value } : ingr));
    }, []);

    const changeQuantity = useCallback((id: number, value: number) => {
        setIngredients(prev => prev.map(ingr => ingr.formId === id ? { ...ingr, quantity: value } : ingr));
    }, []);

    const validateQuantity = useCallback((value: string) => {
        if (isNaN(parseFloat(value)))  {
            return formsConfig.quantityMustBeNumber;
        }

        return true;
    }, []);

    const addIngredient = useCallback(() => {
        setIngredients(prev => [...prev, { ingredientId: '', quantity: 1, formId: Math.random() }]);
    }, [])

    const removeIngredient = useCallback((id: number) => {
        setIngredients(prev => {
            if (prev.length === 1) {
                return prev;
            }

            return prev.filter(ingr => ingr.formId !== id)
        });
    }, []);

    const changeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, name: event.target.value }));
    }, []);

    const validateName = useCallback((value: string) => {
        if (!value) {
            return formsConfig.ingredientsNameRequired;
        }

        return true;
    }, []); 

    const changeDescription = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, description: event.target.value }));
    }, []);

    const changeImageUrl = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, imageUrl: event.target.value }));
    }, []);

    const [isPending, startTransition] = useTransition();

    const isAddingIngredientsDisabled = ingredients.length === formsConfig.maxIngredientsPerRecipe;

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        startTransition(async () => {
            await addRecipe(formData);
    
            if (!!recipeError) {
                setError(recipeError);

                return;
            } else {
                setError(null);
            }
            
            setFormData(initFormData);
        });
    };

    const ingredientsRendered = useMemo(() => {
        return (
            <div>
                {ingredients.map(({ ingredientId, quantity, formId }) => (
                    <IngredientAndQuantityForm
                        formId={formId}
                        ingredientValue={ingredientId}
                        key={formId}
                        onIngredientChange={changeIngredient}
                        onRemove={removeIngredient}
                        onQuantityChange={changeQuantity}
                        quantityValue={quantity.toString()}
                        validateQuantity={validateQuantity}
                    />
                ))}
                <Button onPress={addIngredient} isDisabled={isAddingIngredientsDisabled}>+</Button>
            </div>
        )
    }, [ingredients, addIngredient]);
    
    return (
        <Form onSubmit={handleSubmit} className="w-full px-1 py-4 flex flex-col gap-4">
            {!!error && <p className="text-red-500 mb-4">{error}</p>}

            <Input
                label="Ingredient name"
                name="name"
                onChange={changeName}
                placeholder="enter ingredient name"
                validate={validateName}
                value={formData.name}
            />

            <Input
                label="Description"
                name="description"
                onChange={changeDescription}
                placeholder="Enter description (not required)"
                value={formData.description}
            />
    
            <Input
                label="Image URL"
                name="imageUrl"
                onChange={changeImageUrl}
                placeholder="Insert image URL (not required)"
                value={formData.imageUrl ?? ''}
            />

            {ingredientsRendered}

            <Button type="submit" isPending={isPending}>Add recipe</Button>
        </Form>
    )
}

export default RecipeForm;

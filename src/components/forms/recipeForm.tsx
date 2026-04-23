'use client';

import { Button, Form } from "@heroui/react";
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useMemo, useState, useTransition } from "react";
import Input from "../UI/input";
import { formsConfig } from "@/config";
import { IRecipeForm, IRecipeIngredient } from "@/model";
import IngredientAndQuantityForm from "../layout/IngredientAndQuantityForm";
import { useRecipesState } from "@/store/recipe";
import { usePathname } from "next/navigation";
import { getRecipe } from "@/actions/recipes";
import { TIngredient } from "@/model";
import { useIngredientsState } from "@/store/ingredients";

const initFormData: IRecipeForm = {
    name: '',
    description: '',
    imageUrl: '',
    ingredients: [],
}

type IRecipeIngridientForm = Pick<IRecipeIngredient, 'quantity'> & {
    formId: number;
    ingredientId: string | null;
    ingredient: TIngredient | null;
};

const mapIngredient = (rawIngredient: IRecipeIngridientForm): IRecipeIngredient | null => {
    const { ingredient, ingredientId, quantity } = rawIngredient;
    if (!ingredient || !ingredientId) return null;

    return { ingredient, ingredientId, quantity };
}

const RecipeForm = () => {
    const [formData, setFormData] = useState<IRecipeForm>(initFormData);
    const [error, setError] = useState<string | null>(null);
    const [ingredients, setIngredients] = useState<IRecipeIngridientForm[]>([
        { ingredientId: null, ingredient: null, quantity: 1, formId: Math.random() },
    ]);

    const pathname = usePathname();
    const isNew = pathname.includes('/new');

    const { addRecipe, updateRecipe, recipesState: { error: recipeError } } = useRecipesState();
    const { ingredientsState: { data: allIngredients } } = useIngredientsState();

    useEffect(() => {
        if (isNew) return;

        try {
            const getEditingRecipe = async () => {
                const recipeId = getRecipeIdFromUrl(pathname);
                const recipe = await getRecipe(recipeId);

                if (recipe.status === 'error' || !recipe.data) {
                    setError(recipe.message ?? '');
                } else {
                    setError(null);
                    setFormData(recipe.data);
                }
            }

            getEditingRecipe();
        } catch (error) {
            const ownError = error as Error;
            setError(ownError.message);
        }
    }, []);

    const changeIngredient = useCallback((id: number, value: string) => {
        const ingredient = allIngredients.find(ingr => ingr.id === value);

        if (!ingredient) return;

        setIngredients(prev => prev.map(ingr => ingr.formId === id ? { ...ingr, ingredientId: value, ingredient } : ingr));
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

    const isAddingIngredientsDisabled = ingredients.length >= formsConfig.maxIngredientsPerRecipe;

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        startTransition(async () => {
            if (isNew) {
                const validatedIngredients = ingredients
                    .map(mapIngredient)
                    .filter(Boolean)

                if (!validatedIngredients.length) {
                    setError('Recipe cannot be without ingredients');
                    return;
                } else {
                    setError(null);
                }

                await addRecipe({
                    ...formData,
                    ingredients: validatedIngredients as IRecipeIngredient[],
                });
            } else {
                const recipeId = getRecipeIdFromUrl(pathname);
                await updateRecipe(recipeId, formData);
            }
    
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

            <Button onPress={addIngredient} isDisabled={isAddingIngredientsDisabled}>+</Button>

            {isNew
                ? (
                    <Button type="submit" isPending={isPending}>Add recipe</Button>
                ) : (
                    <>
                        <Button type="submit" isPending={isPending}>Save</Button>
                        <Button isPending={isPending} onPress={() => navigate('/')}>Cancel</Button>
                    </>
                )
            }

            <Button type="submit" isPending={isPending}>Add recipe</Button>
        </Form>
    )
}

export default RecipeForm;

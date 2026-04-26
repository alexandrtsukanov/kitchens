'use client';

import { Button, Form } from "@heroui/react";
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState, useTransition } from "react";
import { formsConfig, siteConfig } from "@/config";
import { IRecipeForm, IRecipeIngredient, IRecipeIngridientForm } from "@/model";
import { useRecipesState } from "@/store/recipe";
import { usePathname, useParams, useRouter } from "next/navigation";
import { useIngredientsState } from "@/store/ingredients";
import RecipeFormData from "../layout/recipeFormData";
import RecipeIngredients from "../layout/recipeIngredients";

const initFormData: IRecipeForm = {
    name: '',
    description: '',
    imageUrl: '',
    ingredients: [],
};

const initIngredients = [
    { ingredientId: '', ingredient: null, quantity: 1, formId: Math.random() },
];

const RecipeForm = () => {
    const [formData, setFormData] = useState<IRecipeForm>(initFormData);
    const [error, setError] = useState<string | null>(null);
    const [ingredients, setIngredients] = useState<IRecipeIngridientForm[]>(initIngredients);

    const pathname = usePathname();
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const isNewRecipe = pathname.includes(siteConfig.isNewRecipePath);

    const { addRecipe, updateRecipe, recipesState: { data: recipes, error: recipeError } } = useRecipesState();
    const { ingredientsState: { data: allIngredients } } = useIngredientsState();

    useEffect(() => {
        if (isNewRecipe || !recipes.length) return;

        const recipeId = params.id;        
        const recipeToUpdate = recipes.find(recipe => recipe.id === recipeId);

        if (!recipeToUpdate) {
            setError(siteConfig.recipeNotFound);
        } else {
            setError(null);
            setFormData({
                ...initFormData,
                name: recipeToUpdate.name,
                description: recipeToUpdate.description,
                imageUrl: recipeToUpdate.imageUrl ?? '',
            });
            setIngredients(recipeToUpdate.ingredients.map(({ ingredientId, ingredient, quantity }) => ({
                ingredientId, ingredient, quantity, formId: Math.random()
            })));
        }
    }, [recipes]);

    const changeIngredient = useCallback((id: number, value: string) => {
        const ingredient = allIngredients.find(ingr => ingr.id === value);

        if (!ingredient) return;

        setIngredients(prev => prev.map(ingr => ingr.formId === id ? { ...ingr, ingredientId: value, ingredient } : ingr));
    }, [allIngredients]);

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

            return prev.filter(ingr => ingr.formId !== id);
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
    }, [formData]); 

    const changeDescription = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, description: event.target.value }));
    }, []);

    const changeImageUrl = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, imageUrl: event.target.value }));
    }, []);

    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        startTransition(async () => {
            const validatedIngredients = ingredients
                .filter(ingr => !!ingr.ingredient)
                .map(({ ingredient, ingredientId, quantity }) => ({ ingredient, ingredientId, quantity }));

                if (!validatedIngredients.length) {
                    setError(formsConfig.noIngredientsMsg);
                    return;
                } else {
                    setError(null);
                }

            if (isNewRecipe) {
                await addRecipe({
                    ...formData,
                    ingredients: validatedIngredients as IRecipeIngredient[],
                });
            } else {
                const recipeId = params.id;
                await updateRecipe(recipeId, {
                    ...formData,
                    ingredients: validatedIngredients as IRecipeIngredient[],
                });
            }
    
            if (recipeError) {
                setError(recipeError);

                return;
            } else {
                setError(null);
            }
            
            router.push('/');
        });
    };
    
    return (
        <Form onSubmit={handleSubmit} className="w-full px-1 py-4 flex flex-col gap-4">
            {!!error && <p className="text-red-500 mb-4">{error}</p>}
            
            <RecipeFormData
                changeName={changeName}
                validateName={validateName}
                name={formData.name}
                changeDescription={changeDescription}
                description={formData.description}
                changeImageUrl={changeImageUrl}
                imageUrl={formData.imageUrl}
            />

            <RecipeIngredients
                ingredients={ingredients}
                changeIngredient={changeIngredient}
                changeQuantity={changeQuantity}
                addIngredient={addIngredient}
                removeIngredient={removeIngredient}
            />

            {isNewRecipe
                ? (
                    <Button type="submit" isPending={isPending}>Add recipe</Button>
                ) : (
                    <div className="flex gap-2">
                        <Button type="submit" isPending={isPending}>Save</Button>
                        <Button onPress={() => router.push('/')} variant="danger-soft">Cancel</Button>
                    </div>
                )
            }
        </Form>
    )
}

export default RecipeForm;

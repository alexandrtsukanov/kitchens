'use client';

import { Button, Form } from "@heroui/react";
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { formsConfig } from "@/config";
import { IRecipeForm, IRecipeIngredient, IRecipeIngridientForm } from "@/model";
import { useRecipesState } from "@/store/recipe";
import { usePathname, useParams, useRouter } from "next/navigation";
import { getRecipe } from "@/actions/recipes";
import { useIngredientsState } from "@/store/ingredients";
import RecipeFormData from "../layout/recipeFormData";
import RecipeIngredients from "../layout/recipeIngredients";
import { useIngredient } from "@/hooks/useIngredient.";

const initFormData: IRecipeForm = {
    name: '',
    description: '',
    imageUrl: '',
    ingredients: [],
}

const RecipeForm = () => {
    const [formData, setFormData] = useState<IRecipeForm>(initFormData);
    const [error, setError] = useState<string | null>(null);

    const pathname = usePathname();
    const params = useParams();
    const router = useRouter();

    const isNewRecipe = pathname.includes('/new');

    const { addRecipe, updateRecipe, recipesState: { error: recipeError } } = useRecipesState();
    const { ingredientsState: { data: allIngredients } } = useIngredientsState();

    const { ingredients } = useIngredient();

    useEffect(() => {
        if (isNewRecipe) return;

        try {
            const getEditingRecipe = async () => {
                const recipeId = params.id as string;
                const recipeResponse = await getRecipe(recipeId);

                if (recipeResponse.status === 'error' || !recipeResponse.data) {
                    setError(recipeResponse.message ?? '');
                } else {
                    setError(null);
                    setFormData({
                        ...initFormData,
                        name: recipeResponse.data.name,
                        description: recipeResponse.data.description,
                    });
                }
            }

            getEditingRecipe();
        } catch (error) {
            const ownError = error as Error;
            setError(ownError.message);
        }
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

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        startTransition(async () => {
            if (isNewRecipe) {
                const validatedIngredients = ingredients
                    .filter(ingr => !!ingr.ingredient)
                    .map(({ ingredient, ingredientId, quantity }) => ({ ingredient, ingredientId, quantity }))

                if (!validatedIngredients.length) {
                    setError(formsConfig.noIngredientsMsg);
                    return;
                } else {
                    setError(null);
                }

                await addRecipe({
                    ...formData,
                    ingredients: validatedIngredients as IRecipeIngredient[],
                });
            } else {
                const recipeId = params.id as string;
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

            <RecipeIngredients />

            {isNewRecipe
                ? (
                    <Button type="submit" isPending={isPending}>Add recipe</Button>
                ) : (
                    <>
                        <Button type="submit" isPending={isPending}>Save</Button>
                        <Button onPress={() => router.push('/')}>Cancel</Button>
                    </>
                )
            }

            <Button type="submit" isPending={isPending}>Add recipe</Button>
        </Form>
    )
}

export default RecipeForm;

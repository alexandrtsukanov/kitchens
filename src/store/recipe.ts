import { create } from "zustand";
import { createRecipe, getRecipes, removeRecipe, updateRecipe } from "@/actions/recipes";
import { TRecipe, IRecipeForm } from "@/model/recipe";

interface IRecipesState {
    recipesState: {
        data: TRecipe[];
        error: string | null;
        isLoading: boolean;
    };
    setRecipes: () => Promise<void>;
    addRecipe: (recipeFormData: IRecipeForm) => Promise<void>;
    updateRecipe: (id: string, recipeFormData: IRecipeForm) => Promise<void>;
    removeRecipe: (id: string) => Promise<void>;
}

export const useRecipesState = create<IRecipesState>((set) => ({
    recipesState: {
        data: [],
        error: null,
        isLoading: false,
    },
    setRecipes: async () => {
        set(prev => ({ ...prev, recipesState: { ...prev.recipesState, isLoading: true, error: null } }));

        try {
            const allRecipesResponse = await getRecipes();
            const { data } = allRecipesResponse

            if (allRecipesResponse.status === 'error') {
                throw new Error(allRecipesResponse.message ?? 'Error');
            }

            set(prev => ({
                ...prev,
                recipesState: {
                    ...prev.recipesState,
                    data: data,
                }
            }));
        } catch(err) {
            const error = err as Error;
            set(prev => ({ ...prev, recipesState: { ...prev.recipesState, error: error.message } }));
        } finally {
            set(prev => ({ ...prev, recipesState: { ...prev.recipesState, isLoading: false, error: null } }));
        }
    },
    addRecipe: async (formData: IRecipeForm) => {
        set(prev => ({ ...prev, recipesState: { ...prev.recipesState, isLoading: true, error: null } }));

        try {
            const newRecipeResponse = await createRecipe(formData);

            if (newRecipeResponse.status === 'error' || !newRecipeResponse.data) {
                throw new Error(newRecipeResponse.message ?? 'Error');
            }

            const { data: newRecipe } = newRecipeResponse;

            set(prev => ({
                ...prev,
                recipesState: {
                    ...prev.recipesState,
                    data: [...prev.recipesState.data, newRecipe as TRecipe] }
                }));
        } catch(err) {
            const error = err as Error;
            set(prev => ({ ...prev, recipesState: { ...prev.recipesState, error: error.message } }));
        } finally {
            set(prev => ({ ...prev, recipesState: { ...prev.recipesState, isLoading: false, error: null } }));
        }
    },
    updateRecipe: async (id: string, recipeFormData: IRecipeForm) => {
        set(prev => ({ ...prev, recipesState: { ...prev.recipesState, isLoading: true, error: null } }));

        try {
            const updateRecipeResponse = await updateRecipe(id, recipeFormData);

            if (updateRecipeResponse.status === 'error' || !updateRecipeResponse.data) {
                throw new Error(updateRecipeResponse.message ?? 'Error');
            }

            const { data: updatedRecipe } = updateRecipeResponse;

            set(prev => ({
                ...prev,
                recipesState: {
                    ...prev.recipesState,
                    data: prev.recipesState.data.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe as TRecipe : recipe) },
            }));
        } catch(err) {
            const error = err as Error;
            set(prev => ({ ...prev, recipesState: { ...prev.recipesState, error: error.message } }));
        } finally {
            set(prev => ({ ...prev, recipesState: { ...prev.recipesState, isLoading: false, error: null } }));
        } 

    },
    removeRecipe: async (id: string) => {
        set(prev => ({ ...prev, recipesState: { ...prev.recipesState, isLoading: true, error: null } }));

        try {
            const removeRecipeResponse = await removeRecipe(id);

            if (removeRecipeResponse.status === 'error' || !removeRecipeResponse.data) {
                throw new Error(removeRecipeResponse.message ?? 'Error');
            }

            const { data: removedRecipe } = removeRecipeResponse;

            set(prev => ({
                ...prev,
                recipesState: {
                    ...prev.recipesState,
                    data: prev.recipesState.data.filter(recipe => recipe.id !== removedRecipe.id) },
            }));
        } catch(err) {
            const error = err as Error;
            set(prev => ({ ...prev, recipesState: { ...prev.recipesState, error: error.message } }));
        } finally {
            set(prev => ({ ...prev, recipesState: { ...prev.recipesState, isLoading: false, error: null } }));
        } 
    },
}));

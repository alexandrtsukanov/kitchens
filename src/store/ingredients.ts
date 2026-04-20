import { createIngredient, getIngredients, removeIngredient } from "@/actions/ingredients";
import { TIngredient, IIngredientForm } from "@/model";
import { create } from "zustand";

interface IIngredientsState {
    ingredientsState: {
        data: TIngredient[];
        error: string | null;
        isLoading: boolean;
    };
    getIngredients: () => Promise<void>;
    addIngredient: (ingredientsFormData: IIngredientForm) => Promise<void>;
    removeIngredient: (id: string) => Promise<void>;
}

export const useAuthState = create<IIngredientsState>((set) => ({
    ingredientsState: {
        data: [],
        error: null,
        isLoading: false,
    },
    getIngredients: async () => {
        set(prev => ({ ...prev, ingredientsState: { ...prev.ingredientsState, isLoading: true, error: null } }));

        try {
            const allIngredientsResponse = await getIngredients();

            if (allIngredientsResponse.status === 'error') {
                throw new Error(allIngredientsResponse.message ?? 'Error');
            }

            set(prev => ({ ...prev, ingredientsState: { ...prev.ingredientsState, data: allIngredientsResponse.data } }));
        } catch(err) {
            const error = err as Error;
            set(prev => ({ ...prev, ingredientsState: { ...prev.ingredientsState, error: error.message } }));
        } finally {
            set(prev => ({ ...prev, ingredientsState: { ...prev.ingredientsState, isLoading: false, error: null } }));
        }
    },
    addIngredient: async (formData: IIngredientForm) => {
        set(prev => ({ ...prev, ingredientsState: { ...prev.ingredientsState, isLoading: true, error: null } }));

        try {
            const newIngredientResponse = await createIngredient(formData);

            if (newIngredientResponse.status === 'error' || !newIngredientResponse.data) {
                throw new Error(newIngredientResponse.message ?? 'Error');
            }

            const { data: newIngredient } = newIngredientResponse;

            set(prev => ({ ...prev, ingredientsState: { ...prev.ingredientsState, data: [...prev.ingredientsState.data, newIngredient] } }));
        } catch(err) {
            const error = err as Error;
            set(prev => ({ ...prev, ingredientsState: { ...prev.ingredientsState, error: error.message } }));
        } finally {
            set(prev => ({ ...prev, ingredientsState: { ...prev.ingredientsState, isLoading: false, error: null } }));
        }
    },
    removeIngredient: async (id: string) => {
        set(prev => ({ ...prev, ingredientsState: { ...prev.ingredientsState, isLoading: true, error: null } }));

        try {
            const removeIngredientResponse = await removeIngredient(id);

            if (removeIngredientResponse.status === 'error' || !removeIngredientResponse.data) {
                throw new Error(removeIngredientResponse.message ?? 'Error');
            }

            const { data: removedIngredient } = removeIngredientResponse;

            set(prev => ({
                ...prev,
                ingredientsState: {
                    ...prev.ingredientsState,
                    data: prev.ingredientsState.data.filter(ingr => ingr.id !== removedIngredient.id) }
            }));
        } catch(err) {
            const error = err as Error;
            set(prev => ({ ...prev, ingredientsState: { ...prev.ingredientsState, error: error.message } }));
        } finally {
            set(prev => ({ ...prev, ingredientsState: { ...prev.ingredientsState, isLoading: false, error: null } }));
        } 
    },
}));

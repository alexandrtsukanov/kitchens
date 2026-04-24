import { TIngredient } from "./ingredients";

export interface IRecipeIngredient {
    id?: string;
    ingredientId: string;
    ingredient: TIngredient;
    quantity: number;
}

export interface IRecipeForm {
    name: string;
    description: string;
    imageUrl?: string;
    ingredients: IRecipeIngredient[];
}

export type TRecipe = Omit<IRecipeForm, 'imageUrl'> & {
    id: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    imageUrl: string | null;
};

export type IRecipeIngridientForm = Pick<IRecipeIngredient, 'quantity' | 'ingredientId'> & {
    formId: number;
    ingredient: TIngredient | null;
};

import { TIngredient } from "./ingredients";

interface IRecipeIngredient {
    id: string;
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

export interface IIngredientForm {
    name: string;
    category: string;
    unit: string;
    description: string;
    price: number | null;
};

export type TIngredient = Omit<IIngredientForm, 'description'> & {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
    description: string | null;
}
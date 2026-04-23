export interface IIngredientForm {
    name: string;
    category: string;
    unit: string;
    description: string;
    price: number | null;
};

export type TIngredient = Omit<IIngredientForm, 'description'> & {
    id: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    description: string | null;
};

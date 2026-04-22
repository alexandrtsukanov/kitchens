export interface IIngredientForm {
    name: string;
    category: string;
    unit: string;
    description: string;
    price: number | null;
};

export type TIngredient = Omit<IIngredientForm, 'description'> & {
    id: string;
    description: string | null;
};

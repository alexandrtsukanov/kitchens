import { IOption } from "@/model";

export const CATEGORY_OPTIONS: IOption[] = [
    { value: 'VEGETABLES', label: 'Vegetables' },
    { value: 'FRUITS', label: 'Fruits' },
    { value: 'MEAT', label: 'Meat' },
    { value: 'DAIRY', label: 'Dairy' },
    { value: 'SPICES', label: 'Spices' },
    { value: 'OTHER', label: 'Other' },
] as const;

export const UNIT_OPTIONS: IOption[] = [
    { value: 'KILOGRAMS', label: 'Kilograms' },
    { value: 'GRAMS', label: 'Grams' },
    { value: 'LITERS', label: 'Liters' },
    { value: 'MILLILITERS', label: 'Mililiters' },
    { value: 'PIECES', label: 'Pieces' },
] as const;

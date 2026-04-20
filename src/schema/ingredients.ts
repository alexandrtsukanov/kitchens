import z, { object, string, number } from "zod";

export const ingredientsSchema = object({
    name: string().min(1, 'Name is required'),
    category: z.enum([
        'VEGETABLES',
        'FRUITS',
        'MEAT',
        'DAIRY',
        'SPICES',
        'OTHER',
    ]),
    unit: z.enum([
        'KILOGRAMS',
        'GRAMS',
        'LITERS',
        'MILLILITERS',
        'PIECES',
    ]),
    price: number({ error: 'Price must be a number' })
        .min(0)
        .nullable(),
    description: string().optional(),
});

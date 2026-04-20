'use server';

import prisma from "@/lib/prisma";
import { IIngredientForm } from "@/model";
import { ingredientsSchema } from "@/schema/ingredients";

export const createIngredient = async (formData: IIngredientForm) => {
    try {
       const validatedIngredientsData = ingredientsSchema.parse(formData);
       const newIngredient = await prisma.ingredient.create({ data: validatedIngredientsData });

       return { data: newIngredient };
    } catch(err) {
        console.error(err);
        const error = err as Error;

        return {
            status: 'error',
            message: error.message,
            data: null,
        }
    }
};

export const getIngredients = async () => {
    try {
        const result = await prisma.ingredient.findMany();

        return { data: result };
    } catch(err) {
        console.error(err);
        const error = err as Error;

        return {
            status: 'error',
            message: error.message,
            data: [],
        }
    }
};

export const removeIngredient = async (id: string) => {
    try {
        const ingredientToDelete = await prisma.ingredient.delete({ where: { id } });

        return { data: ingredientToDelete };
    } catch(err) {
        console.error(err);
        const error = err as Error;

        return {
            status: 'error',
            message: error.message,
            data: null,
        }
    }
};


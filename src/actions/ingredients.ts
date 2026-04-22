'use server';

import prisma from "@/lib/prisma";
import { IIngredientForm } from "@/model";
import { ingredientsSchema } from "@/schema/ingredients";

export const createIngredient = async (formData: IIngredientForm) => {
    try {
       const validatedIngredientsData = ingredientsSchema.parse(formData);
       const newIngredient = await prisma.ingredient.create({ data: validatedIngredientsData });

       return { status: 'ok', data: newIngredient };
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

        return { status: 'ok', data: result };
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
        const deletedIngredient = await prisma.ingredient.delete({ where: { id } });

        return { status: 'ok', data: deletedIngredient };
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


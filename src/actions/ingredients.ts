'use server';

import prisma from "@/lib/prisma";
import { IIngredientForm } from "@/model";
import { ingredientsSchema } from "@/schema/ingredients";

export const createIngredient = async (formData: IIngredientForm) => {
    try {
        console.log('formData on server => ', formData);
        
       const validatedIngredientsData = ingredientsSchema.parse(formData);

       const newIngredient = await prisma.ingredient.create({ data: validatedIngredientsData });

       return { ok: true, ingredient: newIngredient };
    } catch(err) {
        console.error(err);
        const error = err as Error;

        return {
            status: 'error',
            message: error.message,
        }
    }
}
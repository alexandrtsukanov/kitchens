'use server';

import { formsConfig } from "@/config/forms.config";
import prisma from "@/lib/prisma";
import { IRecipeForm } from "@/model/recipe";

export async function getRecipes() {
    try {
        const recipes = await prisma.recipe.findMany({
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    }
                }
            }
        });

        return { status: 'ok', data: recipes };
    } catch (error) {
        const err = error as Error;

        return {
            status: 'error',
            message: err.message,
            data: [],
        }
    }
}

export async function getRecipe(id: string) {
    try {
        const recipe = await prisma.recipe.findUnique({
            where: { id },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    }
                }
            }
        });

        return { status: 'ok', data: recipe };
    } catch (error) {
        const err = error as Error;

        return {
            status: 'error',
            message: err.message,
            data: null,
        }
    }
};

export async function createRecipe(recipeData: IRecipeForm) {
    try {
        const data: Omit<IRecipeForm, 'ingredients'> = {
            name: recipeData.name,
            description: recipeData.description,
            imageUrl: recipeData.imageUrl,
        };

        const { ingredients } = recipeData;

        if (!data.name || !ingredients.length) {
            return {
                status: 'error',
                message: formsConfig.recipeErrorMsg,
                data: null,
            }
        }

        const newRecipe = await prisma.recipe.create({
            data: {
                ...data,
                ingredients: {
                    create: ingredients.map(({ ingredientId, quantity }) => ({
                        ingredient: { connect: { id: ingredientId } },
                        quantity,
                    }))
                }
            },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });

        return { status: 'ok', data: newRecipe };
    } catch (error) {
        const ownError = error as Error;

        return {
            status: 'error',
            message: ownError.message,
            data: null,
        }
    }
};

export async function updateRecipe(id: string, recipeData: IRecipeForm) {
    try {
        const data: Omit<IRecipeForm, 'ingredients'> = {
            name: recipeData.name,
            description: recipeData.description,
            imageUrl: recipeData.imageUrl,
        };

        const { ingredients } = recipeData;

        if (!data.name || !ingredients.length) {
            return {
                status: 'error',
                message: formsConfig.recipeErrorMsg,
                data: null,
            }
        }

        const updatedRecipe = await prisma.recipe.update({
            where: { id },
            data: {
                ...data,
                ingredients: {
                    deleteMany: {},
                    create: ingredients.map(({ ingredientId, quantity }) => ({
                        ingredient: { connect: { id: ingredientId } },
                        quantity,
                    })),
                }
            },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });

        return { status: 'ok', data: updatedRecipe };
    } catch (error) {
        const ownError = error as Error;

        return {
            status: 'error',
            message: ownError.message,
            data: null,
        }
    }
};

export async function removeRecipe(id: string) {
    try {
        await prisma.recipeIngredient.deleteMany({ where: { recipeId: id } });
        const deletedRecipe = await prisma.recipe.delete({ where: { id } });

        return { status: 'ok', data: deletedRecipe };
    } catch (error) {
        const ownError = error as Error;

        return {
            status: 'error',
            message: ownError.message,
            data: null,
        }
    }
};

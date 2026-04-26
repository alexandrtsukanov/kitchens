'use client';

import RecipeForm from "@/components/forms/recipeForm";

const CreateRecipePage = () => {
    return (
        <div className="flex flex-col items-center min-w-[600px]">
            <h1 className="text-3xl font-bold">Recipe creation</h1>

            <RecipeForm />
        </div>
    )
}

export default CreateRecipePage;

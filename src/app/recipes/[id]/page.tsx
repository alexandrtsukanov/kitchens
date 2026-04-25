import RecipeForm from "@/components/forms/recipeForm";

const EditRecipePage = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">Edit creation</h1>

            <RecipeForm />
        </div>
    )
}

export default EditRecipePage;

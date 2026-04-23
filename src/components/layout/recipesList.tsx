'use client'

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useRecipesState } from "@/store/recipe";
import RecipeCard from "./recipeCard";
import { useAuthState } from "@/store/auth";
// import { useMemo } from "react";

const RecipesList = () => {
    const { recipesState: { data: recipes } } = useRecipesState();
    const { authState: { isAuth } } = useAuthState();

    const router = useRouter();

    // const recipesRendered = useMemo(() => {}, [recipes]);

    return (
        <div>
            {isAuth && <Button onPress={() => router.push('/recipes/new')}>Create recipe</Button>}

            {recipes.map(({ name, description, imageUrl, id, ingredients }) => (
                <RecipeCard
                    key={id}
                    id={id}
                    name={name}
                    description={description}
                    ingredients={ingredients} 
                    {...(imageUrl && { imageUrl })}                   
                />
            ))}
        </div>
    );
};

export default RecipesList;

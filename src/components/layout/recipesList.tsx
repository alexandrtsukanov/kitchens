'use client'

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useRecipesState } from "@/store/recipe";
import RecipeCard from "./recipeCard";
import { useAuthState } from "@/store/auth";
import { siteConfig } from "@/config";
// import { useMemo } from "react";

const RecipesList = () => {
    const { recipesState: { data: recipes, isLoading } } = useRecipesState();
    const { authState: { isAuth } } = useAuthState();

    const router = useRouter();

    // const recipesRendered = useMemo(() => {}, [recipes]);

    if (isLoading) {
        return <p>Loading ...</p>
    }

    return (
        <div className="flex flex-col items-center">
            {isAuth && <Button onPress={() => router.push('/recipes/new')}>Create recipe</Button>}

            {recipes.length === 0
                ? <p>{siteConfig.noResipesYet}</p>
                : (
                    <div className="flex flex-wrap gap-2 w-[560px]">
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
                )
            }
        </div>
    );
};

export default RecipesList;

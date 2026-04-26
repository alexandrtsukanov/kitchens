'use client'

import { Button } from "@heroui/react";
import { useRecipesState } from "@/store/recipe";
import RecipeCard from "./recipeCard";
import { useAuthState } from "@/store/auth";
import { siteConfig } from "@/config";
import Link from "next/link";

const RecipesList = () => {
    const { recipesState: { data: recipes, isLoading } } = useRecipesState();
    const { authState: { isAuth } } = useAuthState();    

    if (isLoading) {
        return <p>Loading ...</p>
    }

    return (
        <div className="flex flex-col items-center">
            {isAuth && 
                <Link href={`/recipes/${siteConfig.isNewRecipePath}`}>
                    <Button>Create recipe</Button>
                </Link>
            }

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

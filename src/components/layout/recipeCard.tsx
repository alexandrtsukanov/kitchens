'use client';

import { siteConfig } from "@/config";
import { unitBriefings } from "@/consts/ingredients";
import { IRecipeForm } from "@/model/recipe";
import { useAuthState } from "@/store/auth";
import { useRecipesState } from "@/store/recipe";
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

interface IProps extends IRecipeForm { id: string };

const RecipeCard = ({
    id,
    name,
    description,
    imageUrl,
    ingredients,
}: IProps) => {
    const { removeRecipe } = useRecipesState();
    const { authState: { isAuth } } = useAuthState();

    const onRemoveRecipe = async () => {
        try {
            await removeRecipe(id);
        } catch(error) {
            alert(siteConfig.errorRecipeRemoveMsg);
        }
    }

    return (
        <Card className="flex flex-col gap-2 items-center max-h-[360px] w-[calc(1/3 - 16px)]">
            <Image
                src={imageUrl ?? '/logo_tatar_kitchen.jpeg'}
                alt={name}
                height={64}
                width={96}
            />
            <Card.Content>
                <Card.Title>{name}</Card.Title>
                <Card.Description>{description}</Card.Description>

                <ul className="max-h-16 overflow-y-scroll">
                   {ingredients.map(({ id, ingredient, quantity }) => (
                        <li key={id}>
                            {ingredient.name} {quantity} {unitBriefings[ingredient.unit] ?? 'pc'}
                        </li>
                   ))} 
                </ul>
            </Card.Content>

            {isAuth && (
                <Card.Footer>
                    <Link href={`/recipes/${id}`}>
                        <Button variant="secondary">Edit</Button>
                    </Link>
                    <Button onPress={onRemoveRecipe} variant="danger-soft">Remove</Button>
                </Card.Footer>
            )}
        </Card>
    )
}

export default RecipeCard;

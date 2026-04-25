'use client';

import { useRouter } from "next/navigation";
import { IRecipeForm } from "@/model/recipe";
import { useAuthState } from "@/store/auth";
import { useRecipesState } from "@/store/recipe";
import { Button, Card } from "@heroui/react";
import Image from "next/image";

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

    const router = useRouter();

    const onRemoveRecipe = () => {
        removeRecipe(id);
    }

    return (
        <Card className="flex flex-col gap-2 items-center max-h-[360px] w-[calc(1/3 - 16px)]">
            <Image
                src={imageUrl ?? '/logo_tatar_kitchen.jpeg'}
                className=""
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
                            {ingredient.name} {quantity}
                        </li>
                   ))} 
                </ul>
            </Card.Content>

            {isAuth && (
                <Card.Footer>
                    <Button onPress={() => router.push(`/recipes/${id}`)} variant="secondary">Edit</Button>
                    <Button onPress={onRemoveRecipe} variant="danger-soft">Remove</Button>
                </Card.Footer>
            )}
        </Card>
    )
}

export default RecipeCard;

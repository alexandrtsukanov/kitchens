import { IRecipeForm } from "@/model/recipe";
import { useAuthState } from "@/store/auth";
import { useRecipesState } from "@/store/recipe";
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";

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

    const onRemoveRecipe = () => {
        removeRecipe(id);
    }

    return (
        <Card>
            <Image src={imageUrl ?? '/'} className="" alt={name} />
            <Card.Content>
                <Card.Title>{name}</Card.Title>
                <Card.Description>{description}</Card.Description>

                <ul>
                   {ingredients.map(({ id, ingredient, quantity }) => (
                        <li key={id}>
                            {ingredient.name} {quantity}
                        </li>
                   ))} 
                </ul>
            </Card.Content>

            {isAuth && (
                <Card.Footer>
                    <Button onPress={() => navigate(`/recipes/${id}`)}>Edit</Button>
                    <Button onPress={onRemoveRecipe} variant="danger-soft">Remove</Button>
                </Card.Footer>
            )}
        </Card>
    )
}

export default RecipeCard;

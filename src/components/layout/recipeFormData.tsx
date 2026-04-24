import { ChangeEvent } from "react";
import Input from "../UI/input";
import { TValidate } from "@/model";

interface IProps {
    changeName: (event: ChangeEvent<HTMLInputElement>) => void;
    validateName: TValidate;
    name: string;
    changeDescription: (event: ChangeEvent<HTMLInputElement>) => void;
    description: string;
    changeImageUrl: (event: ChangeEvent<HTMLInputElement>) => void;
    imageUrl?: string;
}

const RecipeData = ({
    changeName,
    validateName,
    name,
    changeDescription,
    description,
    changeImageUrl,
    imageUrl,
}: IProps) => {
    return (
        <div>
            <Input
                label="Ingredient name"
                name="name"
                onChange={changeName}
                placeholder="enter ingredient name"
                validate={validateName}
                value={name}
            />

            <Input
                label="Description"
                name="description"
                onChange={changeDescription}
                placeholder="Enter description (not required)"
                value={description}
            />
    
            <Input
                label="Image URL"
                name="imageUrl"
                onChange={changeImageUrl}
                placeholder="Insert image URL (not required)"
                value={imageUrl ?? ''}
            />
        </div>
    )
}

export default RecipeData;

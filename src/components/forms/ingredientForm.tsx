'use client';

import { Button, Form } from "@heroui/react";
import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react";
import { IIngredientForm } from "@/model";
import Input from "../UI/input";
import { formsConfig } from "@/config";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/consts/ingredients";
import { createIngredient } from "@/actions";
import Select from "../UI/select";

const initFormData: IIngredientForm = {
    name: '',
    category: '',
    unit: '',
    description: '',
    price: null,
}

const IngredientForm = () => {
    const [formData, setFormData] = useState<IIngredientForm>(initFormData);

    const changeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, name: event.target.value }));
    }, []);

    const validateName = useCallback((value: string) => {
        if (!value) {
            return formsConfig.ingredientsNameRequired;
        }

        return true;
    }, []);

    const changeCategory = useCallback((value: string) => {
        setFormData(prev => ({ ...prev, category: value }));
    }, []);

    const changeUnit = useCallback((value: string) => {
        setFormData(prev => ({ ...prev, unit: value }));
    }, []);

    const changePrice = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = !event.target.value || isNaN(parseFloat(event.target.value)) ? null : parseFloat(event.target.value)

        setFormData(prev => ({ ...prev, price: value }));
    }, []);

    const validatePrice = useCallback((value: string) => {
        if (!value) {
            return formsConfig.ingredientsPriceRequired;
        }

        const num = parseFloat(value);

        if (isNaN(num) || num < 0) {
            return formsConfig.ingredientsPricePositive;
        }

        return true;
    }, []);

    const changeDescription = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, description: event.target.value }));
    }, []);

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await createIngredient(formData);

        setFormData(initFormData);

        console.log('Form submitted');
    };

    return (
        <Form onSubmit={handleSubmit} className="w-[560px] px-1 py-4 flex flex-col gap-4">
            <Input
                label="Ingredient name"
                name="name"
                onChange={changeName}
                placeholder="nter ingredient name"
                validate={validateName}
                value={formData.name}
            />

            <div className="flex gap-4 w-full">
                <div className="w-1/3">
                    <Select
                        options={CATEGORY_OPTIONS}
                        label="Category"
                        onChange={changeCategory}    
                        value={formData.category}
                    />
                </div>
                <div className="w-1/3">
                    <Select
                        options={UNIT_OPTIONS}
                        label="Unit"
                        onChange={changeUnit}    
                        value={formData.unit}
                    />
                </div>
                <div className="w-1/3">
                    <Input
                        label="Select price"
                        name="number"
                        onChange={changePrice}
                        placeholder="RUB"
                        validate={validatePrice}
                        value={formData.price !== null ? formData.price.toString() : ''}                       
                    />
                </div>
            </div>

            <Input
                label="Description"
                name="description"
                onChange={changeDescription}
                placeholder="Enter description (not required)"
                value={formData.description}
            />
    
            <Button type="submit">Add ingredient</Button>
        </Form>
    )
}

export default IngredientForm;

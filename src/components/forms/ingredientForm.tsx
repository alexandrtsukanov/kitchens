'use client';

import { Button, Form, Select } from "@heroui/react";
import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react";
import { IIngredientForm } from "@/model";
import Input from "../UI/input";
import { formsConfig } from "@/config";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/consts/ingredients";

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

    const changePrice = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value ? parseFloat(event.target.value) : null;

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
        setFormData(prev => ({ ...prev, name: event.target.value }));
    }, []);

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormData(initFormData);

        console.log('Form submitted');
    };

    return (
        <Form onSubmit={handleSubmit} className="w-[400px] px-1 py-4 flex flex-col gap-4">
            <Input
                label="Enter ingredient name"
                name="name"
                onChange={changeName}
                placeholder=""
                validate={validateName}
                value={formData.name}
            />

            <div className="flex gap-4 w-full">
                <div className="w-1/3">
                    <Select>
                        {CATEGORY_OPTIONS.map(({ value, label }) => (
                            <div key={value} className="text-black">{label}</div>
                        ))}
                    </Select>
                </div>
                <div className="w-1/3">
                    <Select>
                        {UNIT_OPTIONS.map(({ value, label }) => (
                            <div key={value} className="text-black">{label}</div>
                        ))}
                    </Select>                  
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

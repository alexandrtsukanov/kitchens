'use client';

import { ChangeEvent, memo, useCallback } from 'react'
import Select from '../UI/select';
import Input from '../UI/input';
import { Button } from '@heroui/react';
import { IOption, TIngredient } from '@/model';
import { useIngredientsState } from '@/store/ingredients';
import { formsConfig } from '@/config';
import { useIngredient } from '@/hooks/useIngredient.';

interface IProps {
    ingredientValue: string,
    quantityValue: string,
    formId: number,
}

const createIngredientOptions = (data: TIngredient[]): IOption[]=> {
    return data.map(({ id, name }) => ({ value: id, label: name }));
}

const IngredientAndQuantityForm = memo(({
    ingredientValue,
    quantityValue,
    formId,
}: IProps) => {
    const { ingredientsState: { data: allIngredients } } = useIngredientsState();

    const { changeIngredient, changeQuantity, removeIngredient } = useIngredient();

    const onIngredientChange = useCallback((value: string) => {
        changeIngredient(formId, value);
    }, [changeIngredient]);

    const onQuantityChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = !event.target.value || isNaN(parseFloat(event.target.value)) ? parseFloat(event.target.value) : 1;

        changeQuantity(formId, value);
    }, [changeQuantity]);

    const onRemove = () => {
        removeIngredient(formId);
    };

    const validateQuantity = useCallback((value: string) => {
        if (isNaN(parseFloat(value)))  {
            return formsConfig.quantityMustBeNumber;
        }

        return true;
    }, []);

    return (
        <div className="flex gap-4 w-full">
            <div className="w-6/3">
                <Select
                    options={createIngredientOptions(allIngredients)}
                    label="Ingredient"
                    onChange={onIngredientChange}    
                    value={ingredientValue}
                    placeholder="select ingredient"
                />
            </div>

            <div className="w-2/9">
                <Input
                    label="Amount"
                    name="number"
                    onChange={onQuantityChange}
                    placeholder="amount"
                    validate={validateQuantity}
                    value={quantityValue}                       
                />
            </div>

            <div className="w-1/9">
                <Button onPress={onRemove}>-</Button>
            </div>
        </div>
    );
});

export default IngredientAndQuantityForm;

IngredientAndQuantityForm.displayName = 'IngredientAndQuantityForm';

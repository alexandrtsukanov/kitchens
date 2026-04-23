'use client';

import { ChangeEvent, memo, useCallback } from 'react'
import Select from '../UI/select';
import Input from '../UI/input';
import { Button } from '@heroui/react';
import { IOption, TIngredient } from '@/model';
import { useIngredientsState } from '@/store/ingredients';

interface IProps {
    onIngredientChange: (id: number, value: string) => void,
    onQuantityChange: (id: number, value: number) => void,
    onRemove: (id: number) => void,
    ingredientValue: string,
    quantityValue: string,
    formId: number,
    validateQuantity: (value: string) => void,
}

const createIngredientOptions = (data: TIngredient[]): IOption[]=> {
    return data.map(({ id, name }) => ({ value: id, label: name }));
}

const IngredientAndQuantityForm = memo(({
    onIngredientChange,
    onQuantityChange,
    onRemove,
    ingredientValue,
    quantityValue,
    formId,
    validateQuantity,
}: IProps) => {
    const { ingredientsState: { data: allIngredients } } = useIngredientsState();

    const onOwnIngredientChange = useCallback((value: string) => {
        onIngredientChange(formId, value)
    }, [onIngredientChange]);


    const onOwnQuantityChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = !event.target.value || isNaN(parseFloat(event.target.value)) ? parseFloat(event.target.value) : 1;

        onQuantityChange(formId, value);
    }, [onQuantityChange]);

    const onOwnRemove = () => {
        onRemove(formId);
    }

    return (
        <div className="flex gap-4 w-full">
            <div className="w-6/3">
                <Select
                    options={createIngredientOptions(allIngredients)}
                    label="Ingredient"
                    onChange={onOwnIngredientChange}    
                    value={ingredientValue}
                    placeholder="select ingredient"
                />
            </div>

            <div className="w-2/9">
                <Input
                    label="Amount"
                    name="number"
                    onChange={onOwnQuantityChange}
                    placeholder=""
                    validate={validateQuantity}
                    value={quantityValue}                       
                />
            </div>

            <div className="w-1/9">
                <Button onPress={onOwnRemove}>-</Button>
            </div>
        </div>
    );
});

export default IngredientAndQuantityForm;

IngredientAndQuantityForm.displayName = 'IngredientAndQuantityForm';

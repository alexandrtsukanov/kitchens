'use client';

import { memo } from "react";
import { siteConfig } from "@/config";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/consts/ingredients";
import { useIngredientsState } from "@/store/ingredients";
import { getlabel } from "@/utils/app";
import { Button, Table as DefaultTable } from "@heroui/react";

const IngredientsTable = memo(() => {
    const { ingredientsState: { data, isLoading }, removeIngredient } = useIngredientsState();

    console.log('ingredients =>', data);
    

    const deleteIngredient = async (id: string) => {
        await removeIngredient(id);
    }
    
    if (isLoading) {
        <p>Loading ...</p>
    }

    if (!data.length) {
        return<h1>No ingredients</h1>
    };

    return (
        <DefaultTable>
            <DefaultTable.ScrollContainer>
                <DefaultTable.Content aria-label="Team members" className="min-w-[600px]">

                <DefaultTable.Header>
                    {siteConfig.ingredientsTableHeaderItems.map((header, index) => {
                        const isRowHeader = index === 0;

                        return (
                            <DefaultTable.Column isRowHeader={isRowHeader} key={header}>Role</DefaultTable.Column>
                        )
                    })}
                </DefaultTable.Header>

                <DefaultTable.Body>
                    {data.map(row => (
                        <DefaultTable.Row key={row.id}>
                            <DefaultTable.Cell>{row.name}</DefaultTable.Cell>
                            <DefaultTable.Cell>{getlabel(CATEGORY_OPTIONS, row.category)}</DefaultTable.Cell>
                            <DefaultTable.Cell>{getlabel(UNIT_OPTIONS, row.unit)}</DefaultTable.Cell>
                            <DefaultTable.Cell>{row.price ? `${row.price} RUB` : '-'}</DefaultTable.Cell>
                            <DefaultTable.Cell>{row.description ?? '-'}</DefaultTable.Cell>
                            <DefaultTable.Cell>
                                <Button onPress={() => deleteIngredient(row.id)} variant="danger-soft">Remove</Button>
                            </DefaultTable.Cell>
                        </DefaultTable.Row>
                    ))}
                </DefaultTable.Body>
                </DefaultTable.Content>
            </DefaultTable.ScrollContainer>
        </DefaultTable>
    )
})

export default IngredientsTable;

IngredientsTable.displayName = 'IngredientsTable';

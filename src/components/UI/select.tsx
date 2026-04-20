'use client';

import { memo } from "react";
import { Label, Select as DeafultSelect, ListBox } from "@heroui/react";
import { IOption } from "@/model";

interface IProps {
    options: IOption[];
    label: string;
    onChange: (value: string) => void;
    value: string;
}

const Select = memo(({ options, label, onChange, value }: IProps) => {
    return (
        // @ts-ignore
        <DeafultSelect onChange={onChange} value={value}>
            <Label>{label}</Label>

            <DeafultSelect.Trigger className="rounded-lg border bg-surface p-2">
                <DeafultSelect.Value />
                <DeafultSelect.Indicator />
            </DeafultSelect.Trigger>

            <DeafultSelect.Popover>
                <ListBox>
                    {options.map(({ value, label }) => (
                        <ListBox.Item key={value} id={value} textValue={label}>
                            {label}
                        </ListBox.Item>
                    ))}
                </ListBox>
            </DeafultSelect.Popover>
        </DeafultSelect>
    );
})

export default Select;

Select.displayName = 'Select';

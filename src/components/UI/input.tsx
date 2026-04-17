import { ChangeEvent, memo } from "react";
import { TextField, Label, Input as DefaultInput, FieldError } from "@heroui/react";
import { TValidate } from "@/model";

interface IProps {
    name: string;
    label: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
    validate?: TValidate;
}

const Input = memo(
    ({
        name,
        label,
        value,
        onChange,
        type = 'text',
        placeholder = 'Enter ...',
        validate,
    }: IProps) => {
        return (
            <TextField name={name} type={type} validate={() => validate?.(value)}>
                <Label>{label}</Label>
                <DefaultInput
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                />
                <FieldError />
            </TextField>
        );
    }
)

export default Input;

Input.displayName = 'Input';

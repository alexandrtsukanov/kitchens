import { ValidationError } from "next/dist/compiled/amphtml-validator";

export interface INavbarItem {
    href: string;
    label: string;
}

export interface IUserHeaderAction {
    value: string;
    label: string;
    variant: "primary" | "secondary" | "danger" | "danger-soft" | "ghost" | "outline" | "tertiary" | undefined;
    onPress: () => void;
}

export type TValidate = (value: string) => true | ValidationError | null | undefined;

export interface IUser {
    email: string;
    password: string;
}

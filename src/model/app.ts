import { ValidationError } from "next/dist/compiled/amphtml-validator";

export type TPage = '/' | '/ingredients' | '/about';

interface INavbarItem {
    href: TPage;
    label: string;
    content: string;
}

export type TPages = Record<TPage, INavbarItem>;

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

export interface IOption {
    value: string;
    label: string;
}

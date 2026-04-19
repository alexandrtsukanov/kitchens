import { ValidationError } from "next/dist/compiled/amphtml-validator";

interface INavbarItem {
    href: string;
    label: string;
    content: string;
}

type TPage = 'index' | 'ingredients' | 'about';

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

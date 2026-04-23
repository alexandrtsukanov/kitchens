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

export type NotNullableProps<T, K extends keyof T> = { [P in K]: Exclude<T[K], null | undefined> } & Omit<T, K>;

// type ExtractNotNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] };

// export type NotNullableProps2<T, K extends keyof T> = ExtractNotNever<NotNullableProps<T, K>>;

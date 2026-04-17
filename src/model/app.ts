import { ValidationError } from "next/dist/compiled/amphtml-validator";

export interface INavbarItem {
    href: string;
    label: string;
}

export type TValidate = (value: string) => true | ValidationError | null | undefined;

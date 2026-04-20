import { IOption, TPages } from "@/model";

export const getNavbarItems = (config: TPages) => Object.values(config);

export const getlabel = (options: IOption[], value: string) => {
    const foundItem = options.find(option => option.value === value);

    return foundItem ? foundItem.label : value;
};

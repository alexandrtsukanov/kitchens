'use client';

import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthState } from "@/store/auth";
import { useIngredientsState } from "@/store/ingredients";
import { useRecipesState } from "@/store/recipe";

interface IProps {
    children: ReactNode;
}

const Loader = ({ children }: IProps) => {
    const { data: session, status } = useSession();
    const { setAuthState, authState: { isAuth } } = useAuthState();
    const { setIngredients } = useIngredientsState();
    const { setRecipes } = useRecipesState();

    useEffect(() => {
        setRecipes();
    }, []);

    useEffect(() => {
        setAuthState(status, session);
    }, [status, session]);

    useEffect(() => {
        if (isAuth) {
            setIngredients();
        }
    }, [isAuth]);

    return (
        <>{children}</>
    );
};

export default Loader;

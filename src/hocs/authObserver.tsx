'use client';

import { useAuthState } from "@/store/auth";
import { useIngredientsState } from "@/store/ingredients";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

interface IProps {
    children: ReactNode;
}

const AuthObserver = ({ children }: IProps) => {
    const { data: session, status } = useSession();
    const { setAuthState, authState: { isAuth } } = useAuthState();
    const { setIngredients } = useIngredientsState();

    console.log('session =>', session);
    console.log('status =>', status);

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

export default AuthObserver;

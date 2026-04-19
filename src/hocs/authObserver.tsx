'use client';

import { useAuthState } from "@/store/auth";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

interface IProps {
    children: ReactNode;
}

const AuthObserver = ({ children }: IProps) => {
    const { data: session, status } = useSession();
    const { setState } = useAuthState();

    useEffect(() => {
        setState(status, session);
    }, [status, session]);

    return (
        <>{children}</>
    );
};

export default AuthObserver;

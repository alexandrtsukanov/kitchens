'use client';

import { useAuthState } from "@/store/auth";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

interface IProps {
    children: ReactNode;
}

const AuthObserver = ({ children }: IProps) => {
    const { data: session, status } = useSession();
    const { setAuthState } = useAuthState();

    console.log('session =>', session);
    console.log('status =>', status);

    useEffect(() => {
        setAuthState(status, session);
    }, [status, session]);

    return (
        <>{children}</>
    );
};

export default AuthObserver;

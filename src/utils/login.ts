'use client';

import { loginUser } from "@/actions";

interface IParams {
    email: string;
    password: string;
    errorHandler: (message: string | null) => void;
    closeHandler: () => void;
}

export async function loginUserCommon({
    email,
    password,
    errorHandler,
    closeHandler,
}: IParams) {
    const loginResult = await loginUser(email, password);

    if (loginResult && loginResult.status && loginResult.status === 'error') {
        errorHandler(loginResult.message);

        return;
    } else {
        errorHandler(null);
    }

    window.location.reload();
    closeHandler();
};

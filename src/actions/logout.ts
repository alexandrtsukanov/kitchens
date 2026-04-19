'use server';

import { signOut } from "@/auth/auth";

export const logoutUser = async () => {
    try {
        const singOutResult = await signOut({ redirect: false });
        console.log(singOutResult);

        return singOutResult;
    } catch (e) {
        const error = e as Error;

        return {
            status: 'error',
            message: error.message,
        }
    }
}

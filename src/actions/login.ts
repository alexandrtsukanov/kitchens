'use server';

import { signIn } from "@/auth/auth";

export const loginUser = async (email: string, password: string) => {
    try {
        const singInResult = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        return singInResult;
    } catch (e) {
        console.error('error =>', e);
        
        const error = e as Error;

        return {
            status: 'error',
            message: error.message,
        }
    }
}

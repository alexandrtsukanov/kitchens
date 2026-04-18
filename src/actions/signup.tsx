'use server';

import prisma from "@/lib/prisma";
import { IUser } from "@/model";

export const createUser = async (userData: IUser) => {
    const { email, password } = userData;

    try {
        const newUser = await prisma.user.create({
            data: { email, password }
        });

        console.log('newUser =>', newUser);

        return newUser;
    } catch (e) {
        console.error('error =>', e);

        return {
            status: 'error',
            message: 'Sign up error',
        }
    }
}

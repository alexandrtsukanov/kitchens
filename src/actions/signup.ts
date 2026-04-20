'use server';

import { authConfig } from "@/config";
import prisma from "@/lib/prisma";
import { saltAndHashPassword } from "@/utils";

export const createUser = async (email: string, password: string) => {
    try {
        if (!password || !email) {
            throw new Error(authConfig.nessesaryPasswordAndEmailMsg);
        }

        const candidate = await prisma.user.findUnique({
            where: { email },
        });

        if (candidate) {
            throw new Error(authConfig.registreredUserExistsMsg);
        }

        const hashedPassword = await saltAndHashPassword(password);

        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        console.log('newUser =>', newUser);

        return { newUser };
    } catch (e) {
        console.error('error =>', e);

        const error = e as Error;

        return {
            status: 'error',
            message: error.message,
        }
    }
}

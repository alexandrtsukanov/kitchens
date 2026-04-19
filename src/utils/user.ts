import prisma from "@/lib/prisma";

export async function getUserFromDb(email: string) {
    return await prisma.user.findUnique({ where: { email } });
};

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/schema/auth";
import { getUserFromDb } from "@/utils";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "@/config";
import bcrypt from "bcryptjs";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                try {  
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error(authConfig.nessesaryPasswordAndEmailMsg);
                    }

                    const { email, password } = await signInSchema.parseAsync(credentials);
            
                    const user = await getUserFromDb(email);
            
                    if (!user) {
                        throw new Error(authConfig.invalidAuthMsg);
                    }

                    const isPasswordValid = await bcrypt.compare(password, user.password);

                    if (!isPasswordValid) {
                        throw new Error(authConfig.invalidAuthMsg);
                    }
            
                    return { id: user.id, email: user.email };
                } catch (error) {
                    return null;
                }
            }
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: authConfig.maxAge,
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }

            return token;
        }
    }
})
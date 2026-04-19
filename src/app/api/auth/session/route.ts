// 'use server';

// import { signIn } from "@/auth/auth";

// export const loginUser = async (email: string, password: string) => {
//     try {
//         await signIn('credentials', {
//             email,
//             password,
//             redirect: false,
//         });
//     } catch (e) {
//         console.error('error =>', e);
        
//         const error = e as Error;

//         return {
//             status: 'error',
//             message: error.message,
//         }
//     }
// }

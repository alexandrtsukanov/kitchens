import { authConfig } from "@/config";
import bcrypt from "bcryptjs";

export async function saltAndHashPassword(password: string) {
    try {
        return await bcrypt.hash(password, authConfig.hashSalt);
    } catch(e) {
        return password;
    }
};

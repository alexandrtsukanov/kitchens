import { authConfig, formsConfig } from "@/config";
import { object, string } from "zod";

const {
    emailRequiredMsg,
    passwordRequiredMsg,
    passwordShortOnServer,
    passwordLongOnServer,
} = authConfig;

const { passwordMinLength, passwordMaxLength } = formsConfig;
 
export const signInSchema = object({
    email: string({ error: emailRequiredMsg })
        .min(1, emailRequiredMsg),
    password: string({ error: passwordRequiredMsg })
        .min(1, passwordRequiredMsg)
        .min(passwordMinLength, passwordShortOnServer)
        .max(passwordMaxLength, passwordLongOnServer),
});

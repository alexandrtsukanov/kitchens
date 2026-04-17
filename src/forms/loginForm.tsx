'use client';

import { Button, Form } from "@heroui/react";
import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react";
import Input from "@/components/UI/input";
import { formsConfig } from "@/config/forms.config";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const changeEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }, []);

    const changePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const validateEmail = useCallback((value: string) => {
        const emailRegexp = formsConfig.emailRegexp;

        if (emailRegexp.test(value)) {
            return true;
        }

        return formsConfig.incorrectEmailMsg;
    }, []);

    const validatePassword = useCallback((value: string) => {
        if (!value) {
            return formsConfig.noPassworsMsg;
        }
            
        if (value.length < formsConfig.passwordMinLength) {
            return formsConfig.shortPasswordMsg;
        }

        return true;
    }, []);

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log("Form submitted");
    };
    
    return (
        <Form onSubmit={handleSubmit} className="px-1 py-4 flex flex-col gap-4">
            <Input
                label="Enter your email"
                name="email"
                onChange={changeEmail}
                placeholder=""
                type="email"
                validate={validateEmail}
                value={email}
            />

            <Input
                label="Enter your password"
                name="password"
                onChange={changePassword}
                placeholder=""
                type="password"
                validate={validatePassword}
                value={password}
            />

            <Button type="submit">Log in</Button>
        </Form>
    );
}

export default LoginForm;

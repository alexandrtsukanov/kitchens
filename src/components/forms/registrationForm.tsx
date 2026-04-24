'use client';

import { Button, Form } from "@heroui/react";
import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react";
import Input from "@/components/UI/input";
import { formsConfig } from "@/config";
import { createUser } from "@/actions/signup";
import { loginUserCommon } from "@/utils/login";

interface IProps {
    onClose: () => void;
}

const RegistrationForm = ({ onClose }: IProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState<string | null>(null);

    const changeEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }, []);

    const changePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const changePasswordConfirmation = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirmation(event.target.value);
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

    const validatePasswordConfirmation = useCallback((value: string) => {
        if (password !== value) return formsConfig.passwordNotConfirmedMsg;
        
        return true;
    }, [password]);

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const createdUser = await createUser(email, password);

        console.log('createUserResult =>', createdUser);

        if (createdUser.status && createdUser.status === 'error') {
            setError(createdUser.message || '');

            return;
        } else {
            setError(null);
        }

        loginUserCommon({
            email,
            password,
            errorHandler: setError,
            closeHandler: onClose,
        });
    };
    
    return (
        <>
            {!!error && <p className="text-red-500 mb-4">{error}</p>}

            <Form onSubmit={handleSubmit} className="px-1 py-4 flex flex-col gap-4">
                <Input
                    label="Enter your email"
                    name="email"
                    onChange={changeEmail}
                    placeholder="email"
                    type="email"
                    validate={validateEmail}
                    value={email}
                />

                <Input
                    label="Create a password"
                    name="password"
                    onChange={changePassword}
                    placeholder="password"
                    type="password"
                    validate={validatePassword}
                    value={password}
                />

                <Input
                    label="Confirm the password"
                    name="password"
                    onChange={changePasswordConfirmation}
                    placeholder="password"
                    type="password"
                    validate={validatePasswordConfirmation}
                    value={passwordConfirmation}
                />

                <div className="flex gap-2">
                    <Button type="submit">Sign up</Button>
                    <Button onPress={onClose} variant="secondary">Cancel</Button>
                </div>
            </Form>
        </>
    );
}

export default RegistrationForm;

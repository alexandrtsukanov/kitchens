'use client';

import { Button, Form } from "@heroui/react";
import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react";
import Input from "@/components/UI/input";
import { registrationConfig } from "@/config/registration.config";

interface IProps {
    onClose: () => void;
}

const RegistrationForm = ({ onClose }: IProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

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
        const emailRegexp = registrationConfig.emailRegexp;

        if (emailRegexp.test(value)) {
            return true;
        }

        return registrationConfig.incorrectEmailMsg;
    }, []);

    const validatePassword = useCallback((value: string) => {
        if (!value) {
            return registrationConfig.noPassworsMsg;
        }
            
        if (value.length < registrationConfig.passwordMinLength) {
            return registrationConfig.shortPasswordMsg;
        }

        return true;
    }, []);

    const validatePasswordConfirmation = useCallback((value: string) => {
        if (password !== value) return registrationConfig.passwordNotConfirmedMsg;
        
        return true;
    }, [password]);

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log("Form submitted");
    };
    
    return (
        <Form onSubmit={handleSubmit}>
            <Input
                label="Enter your emai"
                name="email"
                onChange={changeEmail}
                placeholder="Enter your email..."
                type="email"
                validate={validateEmail}
                value={email}
            />

            <Input
                label="Create a password"
                name="password"
                onChange={changePassword}
                placeholder=""
                type="password"
                validate={validatePassword}
                value={password}
            />

            <Input
                label="Confirm the password"
                name="password"
                onChange={changePasswordConfirmation}
                placeholder=""
                type="password"
                validate={validatePasswordConfirmation}
                value={passwordConfirmation}
            />

            <Button type="submit">Submit</Button>
        </Form>
    );
}

export default RegistrationForm;

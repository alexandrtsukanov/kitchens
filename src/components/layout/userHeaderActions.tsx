'use client';

import { Button } from "@heroui/react";
import { useState } from "react";
import { IUserHeaderAction } from "@/model";
import RegistrationModal from "../modals/registrationModal";
import LoginModal from "../modals/loginModal";

const UserHeaderActions = () => {
    const [isOpenRegistration, setIsOpenRegistration] = useState(false);
    const [isOpenLogin, setIsOpenLogin] = useState(false);

    const openRegistrationModal = () => setIsOpenRegistration(prev => !prev);
    const openLoginModal = () => setIsOpenLogin(prev => !prev);
    const closeRegistrationModal = () => setIsOpenRegistration(prev => !prev);
    const closeLoginModal = () => setIsOpenLogin(prev => !prev);

    const userActions: IUserHeaderAction[] = [
        { value: 'signup', label: 'Sign Up', variant: 'primary', onPress: openRegistrationModal },
        { value: 'login', label: 'Log In', variant: 'secondary', onPress: openLoginModal  }, 
    ];

    return (
        <>
            <ul className="flex items-center gap-4">
                {userActions.map(({ value, label, variant, onPress }) => {
                    return (
                        <Button key={value} variant={variant} onPress={onPress}>
                            {label}
                        </Button>
                    )
                })}
            </ul>

            <RegistrationModal isOpen={isOpenRegistration} onClose={closeRegistrationModal} />
            <LoginModal isOpen={isOpenLogin} onClose={closeLoginModal} />
        </>
    )
}

export default UserHeaderActions;

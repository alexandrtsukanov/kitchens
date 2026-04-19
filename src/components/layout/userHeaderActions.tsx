'use client';

import { Button } from "@heroui/react";
import { useState } from "react";
import { IUserHeaderAction } from "@/model";
import RegistrationModal from "../modals/registrationModal";
import LoginModal from "../modals/loginModal";
import { logoutUser } from "@/actions/logout";
import { useSession } from "next-auth/react";

const UserHeaderActions = () => {
    const [isOpenRegistration, setIsOpenRegistration] = useState(false);
    const [isOpenLogin, setIsOpenLogin] = useState(false);

    const { data: session, status } = useSession();

    const isAuth = status === 'authenticated';

    console.log('session =>', session);
    console.log('status =>', status);

    const openRegistrationModal = () => setIsOpenRegistration(true);
    const openLoginModal = () => setIsOpenLogin(true);

    const closeRegistrationModal = () => setIsOpenRegistration(false);
    const closeLoginModal = () => setIsOpenLogin(false);

    let userActions: IUserHeaderAction[];

    if (isAuth) {
        userActions = [
            { value: 'logout', label: 'Log Out', variant: 'secondary', onPress: logoutUser  }, 
        ]
    } else {
        userActions = [
            { value: 'signup', label: 'Sign Up', variant: 'primary', onPress: openRegistrationModal },
            { value: 'login', label: 'Log In', variant: 'secondary', onPress: openLoginModal  },
        ]
    }

    return (
        <div className="flex items-center gap-4">
            {isAuth && <p>Hello, {session.user?.email}!</p>}

            <ul className="flex items-center gap-2">
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
        </div>
    )
}

export default UserHeaderActions;

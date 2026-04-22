'use client';

import { Button } from "@heroui/react";
import { useState } from "react";
import { IUserHeaderAction } from "@/model";
import RegistrationModal from "../modals/registrationModal";
import LoginModal from "../modals/loginModal";
import { logoutUser } from "@/actions/logout";
import { useAuthState } from "@/store/auth";

const UserHeaderActions = () => {
    const [isOpenRegistration, setIsOpenRegistration] = useState(false);
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { authState: { isAuth, session, status }, setAuthState } = useAuthState();

    const openRegistrationModal = () => setIsOpenRegistration(true);
    const openLoginModal = () => setIsOpenLogin(true);

    const closeRegistrationModal = () => setIsOpenRegistration(false);
    const closeLoginModal = () => setIsOpenLogin(false);

    const logout = async () => {
        try {
            await logoutUser();
            setAuthState('unauthenticated', null);
            window.location.reload();
        } catch(e) {
            const error = e as Error;
            setError(error.message)
        }
    }

    let userActions: IUserHeaderAction[];

    if (isAuth) {
        userActions = [
            { value: 'logout', label: 'Log Out', variant: 'secondary', onPress: logout }, 
        ]
    } else {
        userActions = [
            { value: 'signup', label: 'Sign Up', variant: 'primary', onPress: openRegistrationModal },
            { value: 'login', label: 'Log In', variant: 'secondary', onPress: openLoginModal  },
        ]
    }

    if (status === 'loading') {
        return <p>Loading ...</p>;
    }

    return (
        <div className="flex items-center gap-4">
            {isAuth && session && <p>Hello, {session.user?.email}!</p>}

            <ul className="flex items-center gap-2">

                {!!error && <p style={{ color: 'red' }}>{error}</p>}

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

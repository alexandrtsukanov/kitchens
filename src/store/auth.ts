import { TSessionStatus } from "@/model";
import { Session } from "next-auth";
import { create } from "zustand";

interface IAuthState {
    authState: {
        isAuth: boolean;
        status: TSessionStatus;
        session: Session | null;
    };
    setAuthState: (status: TSessionStatus, session: Session | null) => void;
}

export const useAuthState = create<IAuthState>((set) => ({
    authState: {
        isAuth: false,
        status: 'loading',
        session: null,
    },
    setAuthState: (status: TSessionStatus, session: Session | null) => {
        set({
            authState: {
                isAuth: status === 'authenticated',
                status,
                session,
            }
        })
    }
}));

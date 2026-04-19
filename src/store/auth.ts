import { TSessionStatus } from "@/model";
import { Session } from "next-auth";
import { create } from "zustand";

interface IAuthState {
    state: {
        isAuth: boolean;
        status: TSessionStatus;
        session: Session | null;
    };
    setState: (status: TSessionStatus, session: Session | null) => void;
}

export const useAuthState = create<IAuthState>((set) => ({
    state: {
        isAuth: false,
        status: 'unauthenticated',
        session: null,
    },
    setState: (status: TSessionStatus, session: Session | null) => {
        set({
            state: {
                isAuth: status === 'authenticated',
                status,
                session,
            }
        })
    }
}));

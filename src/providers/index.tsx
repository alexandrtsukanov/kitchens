import { auth } from '@/auth/auth';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface IProps {
    children: ReactNode;
};

const Providers = async ({ children }: IProps) => {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default Providers;

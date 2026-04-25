'use client';

import { siteConfig } from "@/config";
import { useSearchParams } from "next/navigation";

const ErrorPage = () => {
    const searchParams = useSearchParams();
    const message = searchParams.get(siteConfig.errorMessageKey) ?? 'Unknown error';

    return (
        <div className="flex justify-center items-center h-full w-full">
            <p className="text-red-500 text-3xl">{message}</p>
        </div>
    )
}

export default ErrorPage;

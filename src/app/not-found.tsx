'use client';

import { layoutConfig } from "@/config/layout.config";
import { Button } from "@heroui/react";
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div
            className="flex flex-col items-center justify-center"
            style={{
                height: `calc(100vh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight})`
            }}
        >
            <div className="text-8xl font-bold text-gray-300">404</div>

            <h1 className="text-3x1 font-bold tracking-tight">Page not found</h1>

            <div className="pt-6">
                <Link href="/">
                    <Button>Return to home page</Button >
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;

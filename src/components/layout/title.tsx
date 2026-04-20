'use client';

import { siteConfig } from "@/config";
import { TPage } from "@/model";
import { usePathname } from "next/navigation";

const Title = () => {
    const pathname = usePathname();

    const currentPathItem = siteConfig.navbarItems[pathname as TPage];
    const title = currentPathItem ? currentPathItem.label : siteConfig.title;

    return (
        <div className="w-full flex justify-center px-6 mt-6 mb-12">
            <h1 className="text-3xl font-bold">{title}</h1>
        </div>
    );
};

export default Title;

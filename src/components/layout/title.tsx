'use client';

import { siteConfig } from "@/config";
import { usePathname } from "next/navigation";

const Title = () => {
    const pathname = usePathname();

    const currentPathItem = Object.values(siteConfig.navbarItems).find(path => path.href === pathname);

    const title = currentPathItem ? currentPathItem.label : siteConfig.title;

    return (
        <div className="w-full text justify-center mt-6 mb-12">
            <h1 className="text-3xl font-bold">{title}</h1>
        </div>
    );
};

export default Title;

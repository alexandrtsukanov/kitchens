'use client';

import { siteConfig } from "@/config";
import { TPage } from "@/model";
import { usePathname } from "next/navigation";

const Content = () => {
    const pathname = usePathname();

    const currentPathItem = siteConfig.navbarItems[pathname as TPage];
;
    const title = currentPathItem ? currentPathItem.label : siteConfig.title;
    const content = currentPathItem ? currentPathItem.content : siteConfig.notFoundContent;

    return (
        <div>
            <div className="w-full flex justify-center px-6 mt-6 mb-12">
                <h1 className="text-3xl font-bold">{title}</h1>
            </div>

            <p className="px-6">{content}</p>
        </div>
    );
};

export default Content;

'use client';

import { Link } from "@heroui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";
import UserHeaderActions from "./userHeaderActions";
import { useAuthState } from "@/store/auth";
import { useMemo } from "react";

const Logo = () => (
    <Image
        alt=""
        height={26}
        src="/logo_tatar_kitchen.jpeg"
        width={26}
        priority
    />
)

const Header = () => {
    const pathname = usePathname();
    const { authState: { isAuth } } = useAuthState();

    const actualNavbarItems = useMemo(() => {
        return Object.values(siteConfig.navbarItems)
            .filter(item => {
                if (item.href === '/ingredients') {
                    return isAuth;
                }
                
                return true;
            });
    }, [isAuth]);
        
    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header
                className="flex items-center justify-between px-6"
                style={{ height: layoutConfig.headerHeight }}
            >
                <Link href="/" className="flex items-center gap-2 no-underline">
                    <Logo />
                    <p className="font-bold">{siteConfig.title}</p>
                </Link>

                <ul className="flex items-center gap-4">
                    {actualNavbarItems.map(({ href, label }) => {
                        const isActive = href === pathname;

                        return (
                            <Link
                                className={`px-3 py-1
                                  ${isActive ? "text-blue-500" : "text-foreground"}
                                  hover:text-blue-300 hover:border
                                  hover:border-blue-300 hover:rounded-md
                                  transition-colors
                                  transition-border
                                  duration-200`
                                }
                                href={href}
                                key={href}
                            >
                                {label}
                            </Link>
                        )
                    })}
                </ul>

                <UserHeaderActions />
            </header>
        </nav>
    )
}
  
export default Header;

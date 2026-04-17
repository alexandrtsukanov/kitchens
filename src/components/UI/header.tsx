'use client';

import { Link } from "@heroui/react";
import Image from "next/image";
import { INavbarItem } from "@/model";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";

const navbarItems: INavbarItem[] = [
    { href: '/', label: 'Recipes' },
    { href: '/ingredients', label: 'Ingredients' }, 
    { href: '/about', label: 'About' }, 
];

const userActions: INavbarItem[] = [
    { href: '/signup', label: 'Sign Up' },
    { href: '/login', label: 'Log In' }, 
];

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

    return (
        <nav className={`sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg h-[${layoutConfig.headerHeight}]`}>
            <header className="flex h-16 items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2 no-underline">
                    <Logo />
                    <p className="font-bold">{siteConfig.title}</p>
                </Link>

                <ul className="flex items-center gap-4">
                    {navbarItems.map(({ href, label }) => {
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

                <ul className="flex items-center gap-4">
                    {userActions.map(({ href, label }) => {
                        return (
                            <Link href={href} key={href}>{label}</Link>
                        )
                    })}
                </ul>
            </header>
        </nav>
    )
}
  
export default Header;

'use client';

import { Link } from "@heroui/react";
import { INavbarItem } from "@/model";
import { usePathname } from "next/navigation";

interface IProps {
    items: INavbarItem[];
}

/**
 * Deprecated
 */
const NavbarItemsMapper = ({ items }: IProps) => {
    const pathname = usePathname();

    return (
        <ul className="flex items-center gap-4">
            {items.map(({ href, label }) => {
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
    )
}

export default NavbarItemsMapper;

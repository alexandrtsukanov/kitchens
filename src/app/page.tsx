import { siteConfig } from "@/config";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black">
            {siteConfig.navbarItems.index.content}
        </div>
    );
}

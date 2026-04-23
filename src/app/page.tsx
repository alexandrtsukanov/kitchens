import Content from "@/components/layout/content";
import RecipesList from "@/components/layout/recipesList";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 font-sans dark:bg-black">
            <Content />
            <RecipesList />
        </div>
    );
}

import RecipesList from "@/components/layout/recipesList";
import Title from "@/components/layout/title";

export default function Home() {
    return (
        <div className="flex flex-col flex-4 font-sans dark:bg-black">
            <Title />
            <RecipesList />
        </div>
    );
}

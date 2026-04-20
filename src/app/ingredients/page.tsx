'use client';

import IngredientForm from "@/components/forms/ingredientForm";
import Content from "@/components/layout/content";
import IngredientsTable from "@/components/tables/ingredients";
import { useAuthState } from "@/store/auth";

const Ingredients = () => {
    // const { authState: { isAuth } } = useAuthState();

    // if (!isAuth) {
    //     return null;
    // }

    return (  
        <div>
            <Content />
            <IngredientForm />
            <IngredientsTable />
        </div>
    )
}
  
export default Ingredients;

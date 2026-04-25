import { TPages } from "@/model";

interface ISiteConfig {
    title: string;
    description: string;
    navbarItems: TPages,
    notFoundContent: string;
    ingredientsTableHeaderItems: string[],
    errorMessageKey: string,
    permissionDeniedMsg: string,
    noResipesYet: string;
}

export const siteConfig: ISiteConfig = {
    title: "Tatar kitchen",
    description: "Tatar kitchen recipes",
    navbarItems: {
        '/':  {
            href: '/',
            label: 'Recipes',
            content: 'Recipes',
        },
        '/ingredients': {
            href: '/ingredients',
            label: 'Ingredients',
            content: 'Choose Ingredients',
        },
        '/about': {
            href:'/about',
            label: 'About',
            content: `
                Татарская кухня - это яркое сочетание сытных мясных блюд, ароматной выпечки и нежных молочных продуктов, о
                тражающее богатую историю и гостеприимство татарского народа. Основу кухни составляют блюда, которые веками 
                отовили кочевые предки татар, а позже дополнили традиции оседлого земледелия. Главные блюда татарской 
                кухни Эчпочмак - треугольные пирожки с начинкой из рубленого мяса, картофеля и лука. Их особенность в том, 
                что перед выпечкой в середину добавляют немного бульона, благодаря чему начинка остается сочной. 
                Бэлиш - большой пирог с уткой, говядиной или курицей, смешанными с картофелем и луком.
                Традиционно его готовили в печи и подавали на праздники. Чак-чак - знаменитое татарское лакомство из обжаренных в меду 
                шариков теста. Это обязательный атрибут свадеб, торжеств и чаепитий. Кыстыбый - тонкие лепешки с начинкой из картофельного 
                пюре или пшенной каши. Их едят горячими, смазывая маслом. Шулпа (суп) - наваристый бульон с кусочками мяса, 
                картофелем и домашней лапшой.
            `
        },
    },
    notFoundContent: 'Oops, we did not found requested information',
    ingredientsTableHeaderItems: [
        'Name',
        'Category',
        'Unit',
        'Price per unit',
        'Description',
        'Actions',
    ],
    errorMessageKey: 'message',
    permissionDeniedMsg: '403 not available',
    noResipesYet: 'No resipes yet',
};

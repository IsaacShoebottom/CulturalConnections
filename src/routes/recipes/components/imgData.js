export const presetCards = [
        {
                name: "Beef Stroganoff",
                url: "recipes/beef-stroganoff.jpg",
                keyword: ["meat"],
                country: "russia",
                difficulty: "medium",
                price: "medium",
                stars: 4,
                descr: "Unused field",
                href: "/recipes/beef-stroganoff"
        },
        {
                name: "Belgian Waffles",
                url: "recipes/belgian-waffles.jpg",
                keyword: ["vegetarian", "unhealthy"],
                country: "belgium",
                difficulty: "medium",
                price: "low",
                stars: 2,
                descr: "Unused field",
                href: "/recipes/belgian-waffles"
        },
        {
                name: "BLT",
                url: "/recipes/blt.jpg",
                keyword: ["unhealthy", "meat"],
                country: "united kingdom",
                difficulty: "low",
                price: "low",
                stars: 3,
                descr: "Bacon Lettuce Tomatoe",
                href: "/recipes/blt"
        },
        {
                name: "Colcannon",
                url: "/recipes/colcannon.jpg",
                keyword: ["vegetarian", "kosher"],
                country: "ireland",
                difficulty: "high",
                price: "low",
                stars: 3,
                descr: "Unused field",
                href: "/recipes/colcannon"
        },
        {
                name: "Curry",
                url: "recipes/curry.jpg",
                keyword: ["meat", "kosher"],
                country: "india",
                difficulty: "high",
                price: "medium",
                stars: 5,
                descr: "Eat it by the spoonful!",
                href: "/recipes/curry"
        },
        {
                name: "Grilled Cheese",
                url: "/recipes/grilled-cheese.jpg",
                keyword: ["vegetarian", "unhealthy"],
                country: "United States",
                difficulty: "low",
                price: "low",
                stars: 5,
                descr: "Unused field",
                href: "/recipes/grilled-cheese"
        },
        {
                name: "Instant Noodles",
                url: "recipes/instant-noodles.jpg",
                keyword: ["unhealthy", "vegetarian"],
                country: "japan",
                difficulty: "low",
                price: "low",
                stars: 3,
                descr: "On a budget?",
                href: "/recipes/instant-noodles"
        },
        {
                name: "Mapo Tofu",
                url: "recipes/mapo-tofu.jpg",
                keyword: ["meat"],
                country: "china",
                difficulty: "medium",
                price: "low",
                stars: 5,
                descr: "Unused field",
                href: "/recipes/mapo-tofu"
        },
        {
                name: "Moussaka",
                url: "recipes/moussaka.jpg",
                keyword: ["meat"],
                country: "greece",
                difficulty: "high",
                price: "high",
                stars: 5,
                descr: "Unused field",
                href: "/recipes/moussaka"
        },
        {
                name: "Perogies",
                url: "recipes/perogies.jpg",
                keyword: ["vegetarian", "kosher"],
                country: "poland",
                difficulty: "high",
                price: "high",
                stars: 2,
                descr: "Unused field",
                href: "/recipes/perogies"
        },
        {
                name: "Pork Abodo",
                url: "recipes/pork-abodo.jpg",
                keyword: ["meat"],
                country: "philippines",
                difficulty: "medium",
                price: "high",
                stars: 4,
                descr: "Unused field",
                href: "/recipes/pork-abodo"
        },
        {
                name: "Poutine",
                url: "/recipes/poutine.jpg",
                keyword: ["unhealthy", "kosher"],
                country: "canada",
                difficulty: "medium",
                price: "low",
                stars: 3,
                descr: "Canada's signature!",
                href: "/recipes/poutine"
        },
        {
                name: "Salad",
                url: "/recipes/salad.jpg",
                keyword: ["vegan", "vegetarian", "kosher"],
                country: "united states",
                difficulty: "low",
                price: "low",
                stars: 2,
                descr: "The perfect diet food!",
                href: "/recipes/salad"
        },
        {
                name: "Seafood Paella",
                url: "/recipes/seafood-paella.jpg",
                keyword: ["meat", "kosher"],
                country: "Spain",
                difficulty: "high",
                price: "high",
                stars: 4,
                descr: "Unused field",
                href: "/recipes/seafood-paella"
        },
        {
                name: "Steak and Eggs",
                url: "recipes/steak-and-eggs.jpg",
                keyword: ["meat", "kosher"],
                country: "united states",
                difficulty: "medium",
                price: "high",
                stars: 4,
                descr: "Lots of protein",
                href: "/recipes/steak-and-eggs"
        },
        {
                name: "Steak",
                url: "recipes/steak.jpg",
                keyword: ["meat", "kosher"],
                country: "united states",
                difficulty: "medium",
                price: "high",
                stars: 4,
                descr: "Medium or Medium Rare?",
                href: "/recipes/steak"
        },
        {
                name: "Sushi",
                url: "recipes/sushi.jpg",
                keyword: ["vegetarian", "kosher"],
                country: "japan",
                difficulty: "high",
                price: "medium",
                stars: 4,
                descr: "Not your average california roll!",
                href: "/recipes/sushi"
        },
        {
                name: "Swedish Meatballs",
                url: "recipes/swedish-meatballs.jpg",
                keyword: ["meat"],
                country: "sweden",
                difficulty: "high",
                price: "medium",
                stars: 1,
                descr: "Unused field",
                href: "/recipes/swedish-meatballs"
        },
        {
                name: "Tattie Scones",
                url: "recipes/tattie-scones.jpg",
                keyword: ["vegan", "vegetarian", "unhealthy"],
                country: "scotland",
                difficulty: "low",
                price: "low",
                stars: 4,
                descr: "Scottish 'hash browns'",
                href: "/recipes/tattie-scones"
        },
        {
                name: "Tteokbokki",
                url: "recipes/tteokbokki.jpg",
                keyword: ["meat"],
                country: "south korea",
                difficulty: "medium",
                price: "high",
                stars: 4,
                descr: "Unused field",
                href: "/recipes/tteokbokki"
        }
];

export const categories = ["all", "nature", "cars", "people"];

/** shuffle an array randomly */
export function shuffle(unshuffled) {
        let shuffled = unshuffled
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
        return shuffled;
}
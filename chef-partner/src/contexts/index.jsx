import {useState} from "react";
import {createContext} from "react";

export const RecipeContext = createContext(); //kosong karena nanti mau pake provider, akan dianggap jadi sebuah componnt

export const RecipeProvider = ({children}) => {
	const [recipe, setRecipe] = useState({
		title: "Stracciatella (Italian Wedding Soup)",
		ingredients:
			"3 1/2 c Chicken broth; homemade|1 lb Fresh spinach; wash/trim/chop|1 Egg|1 c Grated parmesan cheese; --or--|1 c Romano cheese; freshly grated|Salt and pepper; to taste",
		servings: "4 servings",
		instructions:
			'Bring 1 cup of the broth to a boil. Add spinach and cook until softened but still bright green. Remove spinach with a slotted spoon and set aside. Add remaining broth to pot. Bring to a boil. Meanwhile, beat egg lightly with a fork. Beat in 1/4 cup of cheese. When broth boils pour in egg mixture, stirring constantly for a few seconds until it cooks into "rags." Add reserved spinach, salt and pepper. Serve immediately, passing remaining cheese. NOTES: Someone asked for this recipe a while back. I believe this soup, known as "Stracciatella" is synonymous with Italian Wedding Soup, however, I seem to remember from I-don\'t-know-where that Italian Wedding Soup is the same as this but with the addition of tiny meatballs.',
	});
	return (
		<RecipeContext.Provider value={{recipe, setRecipe}}>
			{children}
		</RecipeContext.Provider>
	);
};

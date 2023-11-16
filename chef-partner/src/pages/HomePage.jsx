import axios from "axios";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import RecipeCard from "../components/RecipeCards";

const Home = () => {
	let [searchParams, setSearchParams] = useSearchParams();
	useEffect(() => {
		const fetchData = async () => {
			const {data} = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}recipe?query=chicken+soup`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
					},
				}
			);
			console.log(data);
			console.log(searchParams.get("query"));
			setRecipes(data);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const {data} = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}recipe?query=${searchParams.get(
					"query"
				)}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
					},
				}
			);
			console.log(data);
			console.log(searchParams.get("query"));
			setRecipes(data);
		};

		fetchData();
	}, [searchParams]);
	const [recipes, setRecipes] = useState([
		// {
		// 	title: "Stracciatella (Italian Wedding Soup)",
		// 	ingredients:
		// 		"3 1/2 c Chicken broth; homemade|1 lb Fresh spinach; wash/trim/chop|1 Egg|1 c Grated parmesan cheese; --or--|1 c Romano cheese; freshly grated|Salt and pepper; to taste",
		// 	servings: "4 servings",
		// 	instructions:
		// 		'Bring 1 cup of the broth to a boil. Add spinach and cook until softened but still bright green. Remove spinach with a slotted spoon and set aside. Add remaining broth to pot. Bring to a boil. Meanwhile, beat egg lightly with a fork. Beat in 1/4 cup of cheese. When broth boils pour in egg mixture, stirring constantly for a few seconds until it cooks into "rags." Add reserved spinach, salt and pepper. Serve immediately, passing remaining cheese. NOTES: Someone asked for this recipe a while back. I believe this soup, known as "Stracciatella" is synonymous with Italian Wedding Soup, however, I seem to remember from I-don\'t-know-where that Italian Wedding Soup is the same as this but with the addition of tiny meatballs.',
		// },
	]);
	let [query, setQuery] = useState();

	function handleSubmit(event) {
		event.preventDefault();
		// The serialize function here would be responsible for
		// creating an object of { key: value } pairs from the
		// fields in the form that make up the query.
		// console.log(event);
		let params = {[event.target.attributes.name.value]: query};
		setSearchParams(params);
	}

	return (
		<>
			<section className="bg-[#FFF5EA] h-full min-h-[100dvh] flex flex-col items-center w-full py-10">
				<div className="mb-3 w-5/6 sm:w-2/3 my-5">
					<h1 className="text-red-700 text-xl mb-2">Find Recipes</h1>
					<div className="relative mb-4 flex w-full flex-wrap items-stretch">
						<input
							type="search"
							className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l bg-[#F1FAFF] border-4 border-orange-700 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
							placeholder="Taiwanese Fried Rice"
							aria-label="Search"
							name="recipe"
							aria-describedby="button-addon1"
							onChange={(e) => setQuery(e.target.value)}
						/>

						{/* <!--Search button--> */}
						{/* <Link to={{pathname: "/", search: `?query=${searchRecipe}`}}></Link> */}
						<button
							className="relative z-[2] flex items-center rounded-r bg-red-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
							type="button"
							name="query"
							id="button-addon1"
							data-te-ripple-init
							data-te-ripple-color="light"
							onClick={handleSubmit}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="h-5 w-5"
								name="query"
							>
								<path
									fillRule="evenodd"
									d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>
				<section className="flex flex-col items-center sm:flex-row flex-wrap gap-4 sm:justify-center">
					{recipes &&
						recipes?.map((recipe) => {
							return (
								<RecipeCard
									key={`${recipe.title}${recipe.servings[0]}${recipe.instructions[0]}`}
									recipeSingle={recipe}
								/>
							);
						})}
				</section>
			</section>
		</>
	);
};

export default Home;

import {useContext, useEffect, useState} from "react";
import {PocketContext, RecipeContext} from "../contexts";
import axios from "axios";
import {useParams} from "react-router-dom";

const RecipeDetail = () => {
	const {recipe, setRecipe} = useContext(RecipeContext);

	useEffect(() => {
		document.title = recipe.title;
	}, []);

	const id = useParams();
	console.log(id);

	useEffect(() => {
		const fetchRecipe = async () => {
			const {data} = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}favorite/${id.recipe}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
					},
				}
			);
			console.log(data);
			setRecipe(data);
		};
		fetchRecipe();
	}, []);

	console.log(recipe);
	function sortAndFormatIngredients(ingredientsList) {
		const sortedIngredients = [];

		for (const ingredient of ingredientsList) {
			const ingredientName = ingredient.split(",")[0].trim();
			let category = "";

			if (isVegetable(ingredientName)) {
				category = "🥦";
			} else if (isSeasoning(ingredientName)) {
				category = "🧂";
			} else if (isMeatProduct(ingredientName)) {
				category = "🥩";
			} else {
				category = "🥫";
			}

			sortedIngredients.push(`${category}${ingredient}`);
		}

		return sortedIngredients;
	}

	function isVegetable(ingredientName) {
		const vegetableKeywords = [
			"carrot",
			"celery",
			"onion",
			"garlic",
			"potato",
			"mushroom",
			"pepper",
			"tomato",
			"broccoli",
			"cauliflower",
			"spinach",
			"kale",
			"lettuce",
			"parsley",
			"almond",
			"olive",
			"ginger",
			"cilantro",
			"lime",
			"tofu",
			"scallion",
			"vegetable",
			"acorn",
			"oregano",
			"basil",
			"thyme",
			"lemon",
			"turmeric",
			"asparagus",
			"avocado",
			"beets",
			"bell pepper",
			"bok choy",
			"brussels sprouts",
			"cabbage",
			"chard",
			"corn",
			"cucumber",
			"eggplant",
			"endive",
			"fennel",
			"green beans",
			"jicama",
			"kale",
			"leek",
			"mushroom",
			"okra",
			"parsnip",
			"peaches",
			"peas",
			"pineapple",
			"plum",
			"pumpkin",
			"radish",
			"rhubarb",
			"rutabaga",
			"snap peas",
			"snow peas",
			"spinach",
			"squash",
			"sweet potato",
			"swiss chard",
			"turnip",
			"watermelon",
			"watermelon radish",
			"zucchini",
		];

		for (const keyword of vegetableKeywords) {
			if (ingredientName.toLowerCase().includes(keyword.toLowerCase())) {
				return true;
			}
		}

		return false;
	}

	function isSeasoning(ingredientName) {
		const seasoningKeywords = [
			"salt",
			"coriander",
			"pepper",
			"sugar",
			"cumin",
			"paprika",
			"garlic powder",
			"onion powder",
			"oregano",
			"basil",
			"thyme",
			"rosemary",
			"bay leaf",
			"allspice",
			"baking powder",
			"baking soda",
			"black peppercorns",
			"cayenne pepper",
			"celery salt",
			"chili powder",
			"cinnamon",
			"cloves",
			"crushed red pepper flakes",
			"curry powder",
			"dried dill",
			"dried oregano",
			"dried thyme",
			"fenugreek",
			"garlic salt",
			"ground ginger",
			"ground nutmeg",
			"ground paprika",
			"italian seasoning",
			"lemon pepper",
			"onion salt",
			"paprika",
			"red pepper flakes",
			"sea salt",
			"sesame seeds",
			"sriracha sauce",
			"tabasco sauce",
			"white pepper",
		];

		for (const keyword of seasoningKeywords) {
			if (ingredientName.toLowerCase().includes(keyword.toLowerCase())) {
				return true;
			}
		}

		return false;
	}

	function isMeatProduct(ingredientName) {
		const meatProductKeywords = [
			"chicken",
			"hare",
			"meat",
			"egg",
			"mutton",
			"beef",
			"pork",
			"lamb",
			"fish",
			"turkey",
			"fillet",
			"beef brisket",
			"beef chuck roast",
			"beef flank steak",
			"beef ground beef",
			"beef short ribs",
			"beef sirloin steak",
			"beef strip steak",
			"chicken breasts",
			"chicken drumsticks",
			"chicken thighs",
			"chicken wings",
			"ground lamb",
			"lamb chops",
			"lamb leg",
			"lamb shoulder",
			"pork belly",
			"pork chops",
			"pork loin",
			"pork shoulder",
			"salmon",
			"shrimp",
			"steak",
			"swordfish",
			"turkey breast",
			"turkey ground turkey",
			"veal cutlets",
			"veal tenderloin",
		];

		for (const keyword of meatProductKeywords) {
			if (ingredientName.toLowerCase().includes(keyword.toLowerCase())) {
				return true;
			}
		}

		return false;
	}

	const formattedIngredients = sortAndFormatIngredients(
		recipe.ingredients.split("|")
	);

	const saveFavorite = async () => {
		const response = await axios.post(
			`${import.meta.env.VITE_SERVER_URL}favorite`,
			recipe,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			}
		);
		console.log(response);
	};
	let utterance = new SpeechSynthesisUtterance();
	utterance.voice = window.speechSynthesis.getVoices()[8];
	const speak = (text) => {
		// Set the text and voice of the utterance
		utterance.text = text;

		// Speak the utterance
		window.speechSynthesis.speak(utterance);
	};

	useEffect(() => {
		setSteps(recipe.instructions.split("."));
	}, []);

	const [steps, setSteps] = useState();
	const [stepIndex, setStepIndex] = useState(0);

	const handleSpeech = (index) => {
		speak(steps[index]);
	};
	const {access, setAccess} = useContext(PocketContext);

	const handlePocketSave = async () => {
		const currentUrl = window.location.href;
		try {
			if (localStorage.getItem("pocketAccessToken")) {
				const {data} = await axios.post(
					`${import.meta.env.VITE_SERVER_URL}pocket`,
					{
						url: currentUrl,
						title: recipe.title,
						tags: "",
						access_token: localStorage.getItem("pocketAccessToken"),
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("access_token")}`,
						},
					}
				);
				console.log(data);
			} else {
				// const redirect_uri = `http://localhost:5173/detail/${id.recipe}`;
				const redirect_uri = `https://w4zf1p6s-5173.asse.devtunnels.ms/authPocket`;

				const {data} = await axios.post(
					`${import.meta.env.VITE_SERVER_URL}pocketCode`,
					{
						redirect_uri,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("access_token")}`,
							"Access-Control-Allow-Origin": "*",
						},
					}
				);
				console.log(data);
				const request_token = data.split("=")[1];
				localStorage.setItem("pocketCode", request_token);

				window.open(
					`https://getpocket.com/auth/authorize?request_token=${request_token}&redirect_uri=${redirect_uri}`
				);

				setAccess(request_token);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<section className="bg-[#FFF5EA] h-full min-h-[100dvh] flex flex-col w-full p-10">
				<h1 className=" text-red-700 text-6xl">{recipe.title}</h1>
				<br />
				<h1 className="text-xl text-red-700">Servings: {recipe.servings}</h1>
				<br />
				<h1 className="text-xl text-red-700 flex flex-col gap-2 max-w-[500px]">
					Ingredients:
					{formattedIngredients.map((ingredient, i) => {
						return <p key={i}>{ingredient}</p>;
					})}
				</h1>
				<br />
				<h1 className="text-xl text-red-700 flex flex-col gap-2 max-w-[800px]">
					Steps:
					{recipe.instructions.split(".").map((step, i) => (
						<p key={i}>
							{i + 1}. {step}
						</p>
					))}
				</h1>
				<br />
				<button
					className="btn w-2/5 sm:w-4/12 lg:w-2/12 bg-red-700 text-white"
					onClick={() => {
						handleSpeech(stepIndex);
						setStepIndex(stepIndex + 1);
						if (stepIndex == steps.length - 1) {
							setStepIndex(0);
						}
					}}
				>
					Listen
				</button>
				<br />
				<br />
				<div className="flex gap-2">
					<button
						className="btn btn-outline w-3/5 sm:w-2/5 lg:w-1/5 btn-error"
						onClick={saveFavorite}
					>
						<span className="text-3xl">♡</span> Add to Favorites
					</button>
					<button
						className="btn btn-outline w-2/5 sm:w-4/12 lg:w-2/12 btn-error"
						onClick={handlePocketSave}
					>
						<span className="text-3xl">♡</span> Add to Pocket
					</button>
				</div>
			</section>
		</>
	);
};

export default RecipeDetail;

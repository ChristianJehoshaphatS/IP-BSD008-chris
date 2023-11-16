import axios from "axios";
import {useEffect, useState} from "react";
import RecipeCard from "../components/RecipeCards";

const Favorites = () => {
	useEffect(() => {
		const getFavorites = async () => {
			const {data} = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}favorite`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
					},
				}
			);
			console.log(data);
			setFavorites(data);
		};
		getFavorites();
	}, []);

	const [favorites, setFavorites] = useState([{}]);
	return (
		<>
			<section className="bg-[#FFF5EA] h-full min-h-[100dvh] flex flex-col items-center w-full 	">
				<br />

				<h1 className="text-4xl text-red-700">
					{localStorage.getItem("username")}'s Favorites
				</h1>
				<br />
				<div className="flex flex-col md:flex-row gap-4 flex-wrap items-center md:justify-center">
					{favorites.map((recipe) => (
						<RecipeCard recipeSingle={recipe} />
					))}
				</div>
			</section>
		</>
	);
};

export default Favorites;

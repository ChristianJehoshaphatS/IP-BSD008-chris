import axios from "axios";
import {useEffect, useState} from "react";
import RecipeCard from "../components/RecipeCards";

const Favorites = () => {
	const [favorites, setFavorites] = useState([{}]);

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

	useEffect(() => {
		getFavorites();
	}, []);

	const handleUnfav = async (id) => {
		await axios.delete(`${import.meta.env.VITE_SERVER_URL}favorite/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
			},
		});
		getFavorites();
	};

	return (
		<>
			<section className="bg-[#FFF5EA] h-full min-h-[100dvh] flex flex-col items-center w-full py-10">
				<br />

				<h1 className="text-4xl text-red-700 text-center mx-4">
					{localStorage.getItem("username")}'s Favorites
				</h1>
				<br />
				<div className="flex flex-col md:flex-row gap-4 flex-wrap items-center md:justify-center">
					{favorites.map((recipe) => (
						<RecipeCard
							recipeSingle={recipe}
							del={true}
							handleUnfav={handleUnfav}
						/>
					))}
				</div>
			</section>
		</>
	);
};

export default Favorites;

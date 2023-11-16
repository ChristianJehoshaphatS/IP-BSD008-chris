import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {RecipeContext} from "../contexts";
import axios from "axios";

const EditRecipe = () => {
	const {recipe, setRecipe} = useContext(RecipeContext);

	useEffect(() => {
		document.title = recipe.title;
	}, []);

	const [edit, setEdit] = useState({
		title: "",
		servings: "",
		ingredients: "",
		instructions: "",
	});

	const id = useParams();
	console.log(id);

	const navigate = useNavigate();

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
			setEdit(data);
		};
		fetchRecipe();
	}, []);

	const handleChange = (e) => {
		console.log(edit);
		setEdit({...edit, [e.target.name]: e.target.value});
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		console.log(edit);
		const {data} = await axios.put(
			`${import.meta.env.VITE_SERVER_URL}favorite/${id.recipe}`,
			edit,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			}
		);
		console.log(data);
		navigate(`/detail/${id.recipe}`);
	};

	return (
		<>
			<section className="bg-[#FFF5EA] h-full min-h-[100dvh] flex flex-col items-center w-full 	">
				<form
					className="flex flex-col items-center w-full text-3xl gap-3 my-5"
					onSubmit={handleUpdate}
				>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						id=""
						value={edit.title}
						onChange={handleChange}
						className="input input-bordered input-error w-full max-w-xs bg-white place text-red-700"
					/>
					<label htmlFor="servings">Servings</label>
					<input
						type="text"
						name="servings"
						id=""
						value={edit.servings}
						className="input input-bordered input-error w-full max-w-xs bg-white place text-red-700"
					/>
					<label htmlFor="ingredients">Ingredients</label>
					<input
						type="text"
						name="ingredients"
						id=""
						value={edit.ingredients}
						className="input input-bordered input-error w-full max-w-xs bg-white place text-red-700"
					/>
					<label htmlFor="instructions">Instructions</label>
					<input
						type="text"
						name="instructions"
						id=""
						value={edit.instructions}
						className="input input-bordered input-error w-full max-w-xs bg-white place text-red-700"
					/>
					<button type="submit" className="btn btn-error">
						Submit
					</button>
				</form>
			</section>
		</>
	);
};

export default EditRecipe;

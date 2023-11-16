import {Link, useNavigate} from "react-router-dom";
import {RecipeContext} from "../contexts";
import {useContext} from "react";

const RecipeCard = ({recipeSingle, del, handleUnfav}) => {
	const navigate = useNavigate();
	const {recipe, setRecipe} = useContext(RecipeContext);

	return (
		<>
			<div className="card w-72 sm:w-96 h-96 sm:h-72 bg-white shadow-xl">
				<div className="card-body text-red-700">
					<h2 className="card-title">{recipeSingle.title}</h2>
					<p>Servings: {recipeSingle.servings}</p>
					<div className="card-actions justify-end">
						{del && (
							<button
								className="btn bg-slate-800 text-white"
								onClick={() => handleUnfav(recipeSingle.id)}
							>
								Unfavorite
							</button>
						)}
						<button
							className="btn bg-red-700 text-white border-0"
							onClick={() => {
								if (recipeSingle.id) {
									navigate(`/detail/${recipeSingle.id}`);
								} else {
									navigate(`/detail/${recipeSingle.title}`);
								}

								setRecipe(recipeSingle);
							}}
						>
							View Recipe
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default RecipeCard;

import {Link, useNavigate} from "react-router-dom";
import {RecipeContext} from "../contexts";
import {useContext} from "react";

const RecipeCard = ({recipeSingle}) => {
	const navigate = useNavigate();
	const {recipe, setRecipe} = useContext(RecipeContext);

	return (
		<>
			<div className="card w-72 sm:w-96 h-52 bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title">{recipeSingle.title}</h2>
					<p>Servings: {recipeSingle.servings}</p>
					<div className="card-actions justify-end">
						<button
							className="btn btn-primary"
							onClick={() => {
								navigate(`/detail/${recipeSingle.title}`);
								console.log(recipe, "before");
								console.log(recipeSingle);
								setRecipe(recipeSingle);
								setTimeout(() => {
									console.log(recipe, "after");
								}, 1000);
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

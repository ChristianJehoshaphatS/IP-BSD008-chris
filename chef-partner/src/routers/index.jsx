import {createBrowserRouter, redirect} from "react-router-dom";
import Parent from "../pages/ParentPage";
import Home from "../pages/HomePage";
import RecipeDetail from "../pages/RecipeDetailPage";
import EditRecipe from "../pages/EditRecipePage";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import Favorites from "../pages/FavoritesPage";
import {googleLogout} from "@react-oauth/google";

const router = createBrowserRouter([
	{
		element: <Parent />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/favorites",
				element: <Favorites />,
			},
			{
				path: "/detail/:recipe",
				element: <RecipeDetail />,
			},
			{
				path: "/edit/:recipe",
				element: <EditRecipe />,
			},
		],
		loader: () => {
			if (!localStorage.access_token) {
				return redirect("/login");
			}
			return null;
		},
	},
	{
		path: "/login",
		element: <Login />,
		loader: () => {
			if (localStorage.access_token) {
				return redirect("/");
			}
			return null;
		},
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/logout",
		element: <Register />,
		loader: () => {
			if (localStorage.access_token) {
				localStorage.clear();
				googleLogout();
				return redirect("/");
			}
			return null;
		},
	},
]);

export default router;

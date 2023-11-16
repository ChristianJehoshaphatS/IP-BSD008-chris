import {RouterProvider} from "react-router-dom";
import router from "./routers";
import {RecipeProvider} from "./contexts";

function App() {
	return (
		<>
			<RecipeProvider>
				<RouterProvider router={router} />
			</RecipeProvider>
		</>
	);
}

export default App;

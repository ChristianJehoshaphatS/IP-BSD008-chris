import {RouterProvider} from "react-router-dom";
import router from "./routers";
import {PocketProvider, RecipeProvider} from "./contexts";

function App() {
	return (
		<>
			<PocketProvider>
				<RecipeProvider>
					<RouterProvider router={router} />
				</RecipeProvider>
			</PocketProvider>
		</>
	);
}

export default App;

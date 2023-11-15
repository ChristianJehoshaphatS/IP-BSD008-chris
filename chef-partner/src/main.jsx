import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {GoogleOAuthProvider} from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId="881043672131-oagg27vj217rl088be3guvja90pip4t0.apps.googleusercontent.com">
			<App />
		</GoogleOAuthProvider>
	</React.StrictMode>
);

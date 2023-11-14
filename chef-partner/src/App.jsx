import {useState} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

import {GoogleLogin} from "@react-oauth/google";

function App() {
	const [count, setCount] = useState(0);

	async function googleLogin(codeResponse) {
		try {
			console.log(codeResponse);
			const {data} = await axios.post(
				"http://localhost:3000/google-auth",
				null,
				{
					headers: {
						token: codeResponse.credential,
					},
				}
			);

			console.log(data);
		} catch (error) {}
	}

	// const googleLogin = useGoogleLogin({
	// 	flow: "auth-code",
	// 	onSuccess: async (codeResponse) => {
	// 		console.log(codeResponse);
	// 		const tokens = await axios.post("http://localhost:3001/auth/google", {
	// 			code: codeResponse.code,
	// 		});

	// 		console.log(tokens);
	// 	},
	// 	onError: (errorResponse) => console.log(errorResponse),
	// });

	return (
		<>
			<GoogleLogin onSuccess={googleLogin} />
		</>
	);
}

export default App;

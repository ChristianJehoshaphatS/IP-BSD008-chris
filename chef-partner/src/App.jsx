import {useState} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import GoogleLoginButton from "./components/GoogleLoginButton";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<GoogleLoginButton />
		</>
	);
}

export default App;

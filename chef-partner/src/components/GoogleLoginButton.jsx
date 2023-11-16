import {GoogleLogin} from "@react-oauth/google";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const GoogleLoginButton = () => {
	const navigate = useNavigate();
	async function googleLogin(codeResponse) {
		try {
			console.log(codeResponse);
			const {data} = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}google-auth`,
				null,
				{
					headers: {
						token: codeResponse.credential,
					},
				}
			);

			// console.log(data);
			localStorage.setItem("access_token", data.access_token);
			localStorage.setItem("username", data.name);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<>
			<GoogleLogin
				onSuccess={googleLogin}
				onError={() => {
					console.log("Login Failed");
				}}
			/>
			;
		</>
	);
};

export default GoogleLoginButton;

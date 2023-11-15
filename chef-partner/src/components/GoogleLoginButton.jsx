import {GoogleLogin} from "@react-oauth/google";
import axios from "axios";
const GoogleLoginButton = () => {
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
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<>
			<GoogleLogin onSuccess={googleLogin} />;
		</>
	);
};

export default GoogleLoginButton;

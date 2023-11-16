import {useContext, useEffect} from "react";
import {PocketContext} from "../contexts";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const PocketLogin = () => {
	let accessToken = localStorage.getItem("pocketCode");
	const navigate = useNavigate();
	useEffect(() => {
		const authorizePocket = async (request_token) => {
			try {
				console.log(request_token);
				const response = await axios.post(
					`${import.meta.env.VITE_SERVER_URL}pocketAuthorize`,
					{
						code: request_token,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("access_token")}`,
						},
					}
				);
				console.log(response);
				localStorage.setItem("pocketAccessToken", response.data.access_token);
				navigate("/favorites");
			} catch (error) {
				console.log(error);
			}
		};

		authorizePocket(accessToken);
	}, []);
	return (
		<>
			<h1>Regirecting you back to Chef-Partner</h1>
		</>
	);
};

export default PocketLogin;

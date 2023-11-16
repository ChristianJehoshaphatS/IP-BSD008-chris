import {Outlet} from "react-router-dom";
import NavBar from "../components/NavBar";

const Parent = () => {
	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
};

export default Parent;

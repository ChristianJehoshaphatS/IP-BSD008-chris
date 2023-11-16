import {Link} from "react-router-dom";
import logo from "../assets/logo.png";
import menu from "../assets/align-right-svgrepo-com.svg";
const NavBar = () => {
	return (
		<>
			<nav className="flex items-center gap-2 justify-between pl-6 sm:pr-6 bg-red-600">
				<div className="flex items-center gap-4 text-white">
					<img src={logo} className="h-16 py-3" alt="Sample image" />
					<p>Chef Partner</p>
				</div>

				<div className="sm:flex gap-2 text-xl hidden text-white">
					<Link to="/">Home</Link>
					<Link to="/favorites"> Favorites</Link>
					<Link to="/logout"> Logout</Link>
				</div>
				<div className="dropdown dropdown-end sm:hidden bg-red-600">
					<label tabIndex={0} className="btn btn-ghost btn-circle">
						<img src={menu} className="invert h-4/6" />
					</label>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content z-[10] bg-red-600 shadow w-52 text-white "
					>
						<li className="hover:bg-red-800 rounded-md border-r-2 my-1">
							<Link className="hover:text-white" to="/">
								Home
							</Link>
						</li>
						<li className="hover:bg-red-800 rounded-md border-r-2 my-1">
							<Link className="hover:text-white" to="/favorites">
								{" "}
								Favorites
							</Link>
						</li>
						<li className="hover:bg-red-800 rounded-md border-r-2 my-1">
							<Link className="hover:text-white" to="/logout">
								Logout
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default NavBar;

import {useEffect, useState} from "react";
import loginImage from "../assets/CHEF_PARTNER.png";
import GoogleLoginButton from "../components/GoogleLoginButton";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Login = ({logout}) => {
	const navigate = useNavigate();
	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setLoginForm({...loginForm, [e.target.name]: e.target.value});
		console.log(loginForm);
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		const {data} = await axios.post(
			`${import.meta.env.VITE_SERVER_URL}login`,
			loginForm
		);
		// console.log(data);
		localStorage.setItem("access_token", data.access_token);
		localStorage.setItem("username", data.name);
		navigate("/");
	};
	return (
		<section
			className="h-full lg:h-screen min-h-[100dvh] bg-cover p-10"
			style={{
				backgroundImage: `url(
				"https://i.pinimg.com/736x/82/ee/af/82eeaf6f753418f28e413ba448926188.jpg"
			)`,
			}}
		>
			<div className="h-full">
				{/* <!-- Left column container with background--> */}
				<div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between bg-[#ffffffe9] p-6 sm:p-16">
					<div className="shrink-1 mb-0 grow-0 basis-auto md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
						<img
							src={loginImage}
							className="w-full p-[1vh] h-96 md:h-full"
							alt="Sample image"
						/>
					</div>

					{/* <!-- Right column container --> */}
					<div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 flex flex-col text-center">
						<h1 className="text-red-700 text-5xl my-10">Welcome Back!</h1>
						<form className="flex flex-col" onSubmit={handleLogin}>
							{/* <!--Sign in section--> */}
							<div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between p-2 gap-2">
								<p className="mb-0 mr-4 text-lg text-red-700 m-5">
									Sign in with
								</p>

								<GoogleLoginButton />
							</div>

							{/* <!-- Separator between social media sign in and email/password sign in --> */}
							<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t after:mt-0.5 after:flex-1 after:border-t ">
								<p className="mx-4 mb-0 text-center font-semibold dark:text-red-700">
									Or
								</p>
							</div>

							{/* <!-- Email input --> */}
							<div className="relative mb-6">
								<label htmlFor="email" className="text-red-700 text-xl">
									Email address
								</label>
								<hr />

								<input
									type="text"
									className="block min-h-[auto] placeholder-white text-white w-full rounded border-0 bg-[#A73121] px-3 py-[0.32rem] leading-[2.15] outline-none"
									name="email"
									placeholder="Email address"
									onChange={handleChange}
									value={loginForm.email}
								/>
							</div>
							{/* <!-- Password input --> */}
							<div className="relative mb-6" data-te-input-wrapper-init>
								<label htmlFor="password" className="text-red-700 text-xl">
									Password
								</label>
								<hr />
								<input
									type="password"
									className="block min-h-[auto] placeholder-white text-white w-full rounded border-0 bg-[#A73121] px-3 py-[0.32rem] leading-[2.15] outline-none"
									name="password"
									placeholder="Password"
									onChange={handleChange}
									value={loginForm.password}
								/>
							</div>

							{/* <!-- Login button --> */}
							<div className="text-center lg:text-left">
								<button
									type="submit"
									className="inline-block rounded bg-[#A73121] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#F1EB90] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
									data-te-ripple-init
									data-te-ripple-color="light"
								>
									Login
								</button>

								{/* <!-- Register link --> */}
								<p className="mb-0 mt-2 pt-1 text-sm font-semibold text-red-700">
									Don't have an account?{" "}
									<Link
										to="/register"
										className="underline text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700 hover:text-yellow-500"
									>
										Register
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;

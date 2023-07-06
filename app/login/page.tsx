"use client";
import correctImage from "../../public/correct.svg";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler } from "react-hook-form";

// import {
// 	signInWithEmailAndPassword,
// 	GoogleAuthProvider,
// 	signInWithPopup,
// } from "firebase/auth";

type Inputs = {
	email: string;
	password: string;
};

const Login = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
	} = useForm<Inputs>({
		defaultValues: {
			email: "ee",
			password: "",
		},
	});

	const isDisabled =
		Boolean(errors?.email) ||
		Boolean(errors?.password) ||
		!Boolean(getValues("password")) ||
		!Boolean(getValues("email"));

	const onSubmitSignup: SubmitHandler<Inputs> = (data) => {
		console.log(data);
	};

	// const  SignUserWithEmail = async()=> {
	// 	// const user = await signInWithEmailAndPassword()
	// }

	return (
		<div className="signupPage mt-14 md:h-screen">
			<div className="my-max2 grid h-full grid-cols-1 items-center gap-7 md:grid-cols-2">
				<div>
					<span className="flex items-center justify-center gap-3 md:justify-start">
						<div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#15AABF] p-2">
							<Image
								src={correctImage}
								height={25}
								width={25}
								alt="universal"
							/>
						</div>
						<p className="text-md font-normal text-white ">
							Project Management App
						</p>
					</span>

					<h1 className=" mx-auto my-2 max-w-xl text-center text-4xl font-bold text-white sm:text-5xl md:my-3 md:max-w-2xl md:text-left md:text-6xl md:font-bold ">
						Everything you need in one place
					</h1>

					<p className="xs:text-md mx-auto mt-5 max-w-md text-center font-normal text-[#909296] sm:text-[18px] md:mx-0 md:mr-auto md:text-left  ">
						Manage your boards using Drag-n-Drop, create adittional boards and
						tasks.
					</p>
				</div>
				<div>
					<form
						onSubmit={handleSubmit(onSubmitSignup)}
						className="mx-auto max-w-md rounded-xl  border border-[#68686896] bg-[#101113] p-5 text-[#909296] shadow-md md:max-w-md"
					>
						<Link href="/">
							<MdClose
								className="mb-3 ml-auto block active:scale-[1.05]"
								size={20}
								color="white"
								cursor={"pointer"}
							/>
						</Link>
						<div className="flex flex-col justify-center p-3">
							<h3 className="mb-3 text-2xl font-medium text-white">
								Log in to your account
							</h3>

							<label className="flex flex-col" htmlFor="email">
								Email
								<input
									id="email"
									type="email"
									{...register("email", {
										required: "Email is required",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: "Invalid email address",
										},
									})}
									aria-invalid={errors.email ? "true" : "false"}
									className="focus:borderwhite my-2 rounded-md border border-[#68686896] bg-transparent p-2 text-white"
								/>
							</label>

							{errors.email && (
								<p className="text-sm text-[crimson]" role="alert">
									{errors.email?.message}
								</p>
							)}
							<label className="flex flex-col" htmlFor="password">
								Password
								<input
									id="password"
									{...register("password", {
										required: "Password is required",
										minLength: {
											value: 8,
											message: "Passwords must be at least 8 characters long",
										},
									})}
									type="password"
									aria-invalid={errors.password ? "true" : "false"}
									className="my-2 rounded-md border border-[#68686896] bg-transparent p-2 text-white focus:border-white"
								/>
							</label>

							{errors.password && (
								<p className="text-sm text-[crimson]" role="alert">
									{errors.password?.message}
								</p>
							)}

							<span className="text-sm">
								Dont have an account?{" "}
								<Link href="/signup" className="text-white">
									Sign up
								</Link>
							</span>
							<button
								className={` mt-6  rounded-md bg-[#333232b0] px-7 py-2 text-white shadow-md transition-colors hover:bg-[#3517a1] ${
									!isDisabled && "active:scale-[1.03]"
								} disabled:bg-[#80808081] `}
								type="submit"
								disabled={isDisabled}
							>
								Login
							</button>
							<button
								className=" mt-6 flex flex-wrap items-center justify-center gap-3 rounded-md bg-[#333232b0] px-7 py-2 text-white shadow-md transition-colors hover:bg-[white] hover:text-black active:scale-[1.03] disabled:bg-[#68686896]"
								type="submit"
							>
								Signup with Google <FcGoogle size={20} />
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default Login;

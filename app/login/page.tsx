"use client";
import correctImage from "../../public/correct.svg";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../../configs/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";

type Inputs = {
	email: string;
	password: string;
};

const Login = () => {
	const router = useRouter();
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
	} = useForm<Inputs>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		//redirect to rollingboard if the user is already logged in
		const unsubscribe = auth?.onAuthStateChanged((user) => {
			if (user) router.push("/rollingboard");
		});

		return () => {
			unsubscribe();
		};
	}, [router]);

	function handleCreateUserError(errorCode: string) {
		switch (errorCode) {
			case "auth/network-request-failed":
				toast.error("Network erorr", {
					position: toast.POSITION.TOP_CENTER,
				});
				break;
			case "auth/user-not-found":
				toast.error("There is no user with that account", {
					position: toast.POSITION.TOP_CENTER,
				});
				break;
			case "auth/invalid-email":
				toast.error("Invalid email. Please enter a valid email address.", {
					position: toast.POSITION.TOP_CENTER,
				});
				break;
			case "auth/email-already-in-use":
				toast.error("The email address is already in use by another account.", {
					position: toast.POSITION.TOP_CENTER,
				});
				break;
			case "auth/weak-password":
				toast.error("The password must be at least 6 characters long.", {
					position: toast.POSITION.TOP_CENTER,
				});
				break;
			default:
				toast.error("An error occurred while signing in", {
					position: toast.POSITION.TOP_CENTER,
				});
				break;
		}
	}

	const loginUsingGoogle = async () => {
		const provider = new GoogleAuthProvider();
		const results = await signInWithPopup(auth, provider);
		const user = results?.user;
		const userDisplayName = results?.user?.displayName;
		userDisplayName &&
			toast.success(`Welcome ${userDisplayName}`, {
				position: toast.POSITION.TOP_CENTER,
			});

		if (user) {
			const timeout = setTimeout(() => {
				router.push("/rollingboard");
			}, 1000);

			return () => {
				clearTimeout(timeout);
			};
		}
	};

	const onSubmitSignup: SubmitHandler<Inputs> = async (data) => {
		try {
			const userCredentials = await signInWithEmailAndPassword(
				auth,
				data?.email,
				data?.password
			);
			const user = userCredentials?.user;
			const userName = user?.email?.slice(0, user?.email?.indexOf("@"));
			userName &&
				toast.success(`Welcome ${userName}`, {
					position: toast.POSITION.TOP_CENTER,
				});

			if (user) {
				const timeout = setTimeout(() => {
					router.push("/rollingboard");
				}, 1000);

				return () => {
					clearTimeout(timeout);
				};
			}
		} catch (error) {
			const errorCode = (error as any).code;
			console.log(error);
			handleCreateUserError(errorCode);
		}
	};

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
									disabled={isSubmitting}
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
									disabled={isSubmitting}
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
								disabled={isSubmitting}
								className={` mt-6  rounded-md bg-[#333232b0] px-7 py-2 text-white shadow-md transition-colors hover:bg-[#3517a1] disabled:bg-[#80808081] `}
								type="submit"
							>
								Sign In
							</button>
							<button
								onClick={loginUsingGoogle}
								disabled={isSubmitting}
								className=" mt-6 flex disabled:bg-[#80808081] disabled:text-white flex-wrap items-center justify-center gap-3 rounded-md bg-[#333232b0] px-7 py-2 text-white shadow-md transition-colors hover:bg-[white] hover:text-black active:scale-[1.03] "
								type="button"
							>
								Sign in with Google <FcGoogle size={20} />
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default Login;

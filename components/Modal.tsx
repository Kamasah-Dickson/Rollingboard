import { MdClose } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";
import { auth, database } from "@/configs/firebase";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "./SignupLogic";
import uuid from "react-uuid";
import {
	EmailAuthProvider,
	reauthenticateWithCredential,
	updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import NewProject from "./NewProject";
import { ref, remove, set } from "firebase/database";
import { Iproject } from "@/fakeData";
interface Imodal {
	setShowModal: Dispatch<SetStateAction<boolean>>;
	profileType: string;
	projectID?: string;
	setProjectData?: Dispatch<SetStateAction<Iproject[]>>;
	projectData?: Iproject[];
}

const Modal = ({
	setShowModal,
	profileType,
	projectID,
	setProjectData,
	projectData,
}: Imodal) => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			description: "",
			projectName: "",
		},
	});

	const router = useRouter();
	const handleModalContentClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.stopPropagation();
	};

	const handleSignOut = () => {
		auth.signOut();
		setShowModal(false);
		router.push("/login");
	};

	function handleErroCode(errorCode: string) {
		switch (errorCode) {
			case "auth/network-request-failed":
				toast.error("Network erorr", {
					position: toast.POSITION.TOP_CENTER,
				});
				break;
			case "auth/wrong-password":
				toast.error("The password you entered is wrong", {
					position: toast.POSITION.TOP_CENTER,
				});
				break;
			case "auth/user-mismatch":
				toast.error("User mismatched", {
					position: toast.POSITION.TOP_CENTER,
				});
				break;
			case "auth/invalid-email":
				toast.error("Invalid email. Please enter a valid email address.", {
					position: toast.POSITION.TOP_CENTER,
				});
				break;
			default:
				toast.error("An error occurred while authenticating", {
					position: toast.POSITION.TOP_CENTER,
				});
				break;
		}
	}

	const handleUpdateProfile: SubmitHandler<Inputs> = async (data) => {
		if (profileType === "newProject") {
			try {
				await set(ref(database, "projects/" + uuid()), {
					uid: uuid(),
					projectName: data.projectName,
					description: data.description,
				});
				toast.success("New project successfully created", {
					position: toast.POSITION.TOP_CENTER,
				});
			} catch (error) {
				console.log(error);
			}
			setShowModal(false);
		} else {
			try {
				const credential = EmailAuthProvider.credential(
					data.email || "",
					data.password
				);

				const response = await reauthenticateWithCredential(
					auth?.currentUser as any,
					credential
				);
				if (response.user.uid === auth?.currentUser?.uid) {
					await updateProfile(response.user, {
						displayName: data.name,
					});
					toast.success("Profile name updated", {
						position: toast.POSITION.TOP_CENTER,
					});
					setShowModal(false);
				} else {
					toast.error("Your credentials do not match");
				}
			} catch (error) {
				console.log(error);
				const errorCode = (error as any).code;

				handleErroCode(errorCode);
			}
		}
	};

	const handleRemove = async () => {
		// update project by removing it
		try {
			await remove(ref(database, "projects/" + projectID));

			//sync with app if offline
			if (!projectData) {
				return;
			} else {
				const filteredEntries = Object.entries(projectData).filter(
					([key, value]) => key !== projectID
				);
				const filteredData = Object.fromEntries(filteredEntries);
				if (setProjectData) {
					setProjectData(filteredData as unknown as Iproject[]);
				}
			}
		} catch (error) {
			console.log(error);
		}
		setShowModal(false);
	};

	return (
		<>
			<div
				onClick={() => setShowModal(false)}
				className="modal overflow-y-scroll px-4 z-50 absolute top-0 flex flex-col justify-center left-0 w-full h-screen bg-[rgba(5,5,5,0.56)]"
			>
				<div
					onClick={handleModalContentClick}
					className=" p-5 max-w-[26rem] mx-auto w-full bg-[#101113] border border-[#8080801f] rounded-xl"
				>
					<MdClose
						size={20}
						color="white"
						className="active:scale-[1.03] select-none mb-3 max-w-fit ml-auto"
						cursor={"pointer"}
						onClick={() => setShowModal(false)}
					/>
					<form
						onSubmit={handleSubmit(handleUpdateProfile)}
						method="post"
						className="p-3"
					>
						{profileType === "edit" ? (
							<>
								<h3 className="text-white text-xl mb-5">Edit Profile</h3>
								<label
									className="text-[#555555] text-sm flex flex-col"
									htmlFor="name"
								>
									Name
									<input
										{...register("name", {
											required: "Name is required",
										})}
										aria-invalid={errors.name ? "true" : "false"}
										required={true}
										disabled={isSubmitting}
										type="text"
										className="bg-transparent p-2 my-1 text-white text-md mt-1 border border-[#909296] rounded-md focus:border-white"
									/>
								</label>
								{errors.name && (
									<p className="text-sm text-[crimson]" role="alert">
										{errors.name?.message}
									</p>
								)}
								<label
									className="text-[#555555] text-sm flex flex-col my-3"
									htmlFor="name"
								>
									Email
									<input
										{...register("email", {
											required: "Email is required",
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
												message: "Invalid email address",
											},
										})}
										required={true}
										disabled={isSubmitting}
										type="email"
										className="bg-transparent p-2 my-1 text-white text-md mt-1 border border-[#909296] rounded-md focus:border-white"
									/>
								</label>
								{errors.email && (
									<p className="text-sm text-[crimson]" role="alert">
										{errors.email?.message}
									</p>
								)}
								<label
									className="text-[#555555] text-sm flex flex-col"
									htmlFor="name"
								>
									Password
									<input
										{...register("password", {
											required: "Password is required",
											minLength: {
												value: 8,
												message: "Passwords must be at least 8 characters long",
											},
										})}
										aria-invalid={errors.password ? "true" : "false"}
										required={true}
										disabled={isSubmitting}
										type="password"
										className="bg-transparent p-2 my-1 text-white text-md mt-1 border border-[#909296] rounded-md focus:border-white"
									/>
								</label>

								{errors.password && (
									<p className="text-sm text-[crimson]" role="alert">
										{errors.password?.message}
									</p>
								)}
								<button
									disabled={isSubmitting}
									className={` ${
										!isSubmitting && "active:scale-[1.02]"
									} bg-[#25262B] disabled:bg-[#80808081] transition-colors block text-white mx-auto mt-5 hover:bg-[#3e3e42] p-2 text-xs md:text-sm rounded-md`}
									type="submit"
								>
									Accept Changes
								</button>
							</>
						) : profileType === "signout" ? (
							<>
								<p className="text-white text-center">
									Do you want to log out ?
								</p>
								<div className="flex items-center gap-4 text-white text-xs justify-center mt-5">
									<button
										onClick={handleSignOut}
										className="bg-[crimson] py-2 px-7 rounded-md active:scale-[1.02]"
									>
										Yes
									</button>
									<button
										onClick={() => setShowModal(false)}
										className="px-9 active:scale-[1.02] py-2 rounded-md bg-black"
									>
										No
									</button>
								</div>
							</>
						) : profileType === "alert" ? (
							<>
								<p className="text-white text-center">
									Are you sure you want to remove this project?
								</p>
								<div className="flex items-center gap-4 text-white text-xs justify-center mt-5">
									<button
										type="button"
										onClick={() => handleRemove()}
										className="bg-[crimson] py-2 px-7 rounded-md active:scale-[1.02]"
									>
										Yes
									</button>
									<button
										onClick={() => setShowModal(false)}
										className="px-9 active:scale-[1.02] py-2 rounded-md bg-black"
									>
										No
									</button>
								</div>
							</>
						) : (
							profileType === "newProject" && (
								<NewProject
									errors={errors}
									isSubmitting={isSubmitting}
									register={register}
								/>
							)
						)}
					</form>
				</div>
			</div>
		</>
	);
};

export default Modal;

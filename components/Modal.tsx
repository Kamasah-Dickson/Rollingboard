import { MdClose } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";
import { auth } from "@/configs/firebase";
import { useRouter } from "next/navigation";
interface Imodal {
	setShowModal: Dispatch<SetStateAction<boolean>>;
	profileType: string;
}

const Modal = ({ setShowModal, profileType }: Imodal) => {
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

	return (
		<>
			<div
				onClick={() => setShowModal(false)}
				className="modal overflow-y-scroll px-4 z-50 absolute top-0 flex flex-col justify-center left-0 w-full h-screen bg-[rgba(5,5,5,0.61)]"
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
					<div className="p-3">
						{profileType === "edit" && (
							<>
								<h3 className="text-white text-xl mb-5">Edit Profile</h3>
								<label
									className="text-[#555555] text-sm flex flex-col"
									htmlFor="name"
								>
									Name
									<input
										type="text"
										className="bg-transparent p-2 text-white text-md mt-1 border border-[#909296] rounded-md focus:border-white"
									/>
								</label>
								<label
									className="text-[#555555] text-sm flex flex-col my-3"
									htmlFor="name"
								>
									Login
									<input
										type="text"
										className="bg-transparent p-2 text-white text-md mt-1 border border-[#909296] rounded-md focus:border-white"
									/>
								</label>
								<label
									className="text-[#555555] text-sm flex flex-col"
									htmlFor="name"
								>
									Password
									<input
										type="text"
										className="bg-transparent p-2 text-white text-md mt-1 border border-[#909296] rounded-md focus:border-white"
									/>
								</label>
								<button
									className="bg-[#25262B] transition-colors block text-white mx-auto mt-5 hover:bg-[#3e3e42] p-2 text-xs md:text-sm rounded-md active:scale-[1.02]"
									type="button"
								>
									Accept Changes
								</button>
							</>
						)}
						{profileType === "signout" && (
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
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;

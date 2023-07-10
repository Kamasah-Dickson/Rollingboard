import { MdClose } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";

interface Imodal {
	setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ setShowModal }: Imodal) => {
	const handleModalContentClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.stopPropagation();
	};

	return (
		<>
			<div
				onClick={() => setShowModal(false)}
				className=" overflow-y-scroll px-4 z-50 absolute top-0 flex flex-col justify-center left-0 w-full h-screen bg-[rgba(5,5,5,0.89)]"
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
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;

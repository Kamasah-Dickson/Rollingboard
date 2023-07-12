import { Dispatch, SetStateAction } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import defaultProfile from "../public/default-profile.jpg";

import Image from "next/image";
import { auth } from "@/configs/firebase";
import Modal from "./Modal";
import { useRef } from "react";
import { toast } from "react-toastify";
import { storage } from "../configs/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

interface IProfile {
	setShowProfile: Dispatch<SetStateAction<boolean>>;
	showProfile: boolean;
	setShowNav: Dispatch<SetStateAction<boolean>>;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	showModal: boolean;
	profileType: string;
	setProfileType: Dispatch<SetStateAction<string>>;
}

const UserProfile = ({
	setShowProfile,
	showProfile,
	setShowNav,
	showModal,
	setShowModal,
	profileType,
	setProfileType,
}: IProfile) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileUpload = () => {
		fileInputRef?.current?.click();
	};

	const uploadImage = async (file: any) => {
		const storageRef = ref(
			storage,
			`images/${auth?.currentUser?.uid}/default-profile.jpg`
		);

		try {
			const uploadTask = await uploadBytesResumable(storageRef, file);
			toast.success("Profile updated successfully");

			const snapshot = uploadTask;
			getDownloadURL(snapshot.ref).then(async (downloadURL) => {
				await updateProfile(auth?.currentUser as any, {
					photoURL: downloadURL,
				});
			});
		} catch (error) {
			toast.error("Error uploading image");
		}
	};

	const handleSelectedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		uploadImage(selectedFile);
	};

	return (
		<>
			<div
				onClick={() => (setShowProfile(false), setShowNav(false))}
				className={`${
					showProfile ? "translate-x-[0%] " : "translate-x-[100%]"
				}   z-20 text-white profile absolute right-0 top-0  h-screen w-full bg-[#000000a8]`}
			></div>
			<div
				className={` ${
					showProfile ? "translate-x-0" : "translate-x-[100%] "
				} my-trans overflow-y-scroll overflow-hidden border-l-[#8080801f] border-l z-30 text-white absolute right-0 top-0 h-screen w-[75%] md:w-[45%] lg:w-[28%] bg-[#0f111b]`}
			>
				<MdClose
					color="white"
					className="active:scale-[1.03] absolute right-5 top-5"
					onClick={() => (setShowProfile(false), setShowNav(false))}
					size={20}
					cursor={"pointer"}
				/>
				<div className="h-[150px] flex items-center my-gradient w-full"></div>
				<div className="flex relative gap-2 p-5 -top-16 flex-col">
					<div className="w-full flex items-end gap-5 flex-wrap">
						<div className="w-[100px] rounded-full h-[100px] bg-[#a9a9b3d7]">
							<Image
								src={(auth?.currentUser?.photoURL as string) || defaultProfile}
								width={100}
								height={100}
								alt="profile"
								className="rounded-full h-[100px] object-cover"
							/>
						</div>
						<div>
							<h2 className="font-medium text-lg">
								{auth?.currentUser?.displayName ?? "New user"}
							</h2>
							<span className="text-xs font-normal text-[#909296]">
								ID:{auth?.currentUser?.uid.slice(0, 25).toLocaleLowerCase()}
							</span>
						</div>
					</div>
					<div className="flex gap-5 mt-3 flex-wrap">
						<button
							onClick={() => (setShowModal(true), setProfileType("edit"))}
							className="bg-[#25262B] hover:bg-[#3e3e42] transition-colors p-2 text-xs md:text-sm rounded-md active:scale-[1.02]"
							type="button"
						>
							Edit Profile
						</button>
						<button
							onClick={handleFileUpload}
							className="bg-[#25262B] transition-colors hover:bg-[#3e3e42] p-2 text-xs md:text-sm rounded-md active:scale-[1.02]"
							type="button"
						>
							Change Avatar
						</button>
						<input
							type="file"
							ref={fileInputRef}
							accept="image/*"
							onChange={handleSelectedFile}
							className="hidden"
						/>
					</div>
					<div className="mt-10">
						<h3 className=" font-bold text-center text-[#909296]">
							Your Tasks
						</h3>
						{/* <p className=" font-normal text-xs text-center text-white mt-2">
							You have no assigned tasks
						</p> */}
						<div className="flex mt-5 rounded-md border border-[#909296] max-w-lg items-center p-1 justify-between gap-4">
							<input
								className="bg-transparent p-1 text-white  w-full text-xs outline-none"
								type="text"
								placeholder="Search Tasks..."
							/>
							<MdSearch color="white" size={25} />
						</div>
					</div>
				</div>
			</div>
			{showModal && (
				<Modal profileType={profileType} setShowModal={setShowModal} />
			)}
		</>
	);
};

export default UserProfile;

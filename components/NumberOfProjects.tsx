"use client";

import { MdSearch } from "react-icons/md";
import { useContext } from "react";
import { modalContext } from "@/app/contexts/appContext";

const NumberOfProjects = () => {
	const { projectData } = useContext(modalContext);

	return (
		<div className="flex items-center max-w-lg mx-auto sm:max-w-full justify-between flex-col sm:flex-row gap-5">
			<h1 className="text-xl md:text-2xl">{`Projects(${
				Object.values(projectData)?.length
			})`}</h1>
			{/* <div className="flex border border-white max-w-lg items-center p-1 justify-between gap-4">
				<input
					className="bg-transparent p-1 text-white  w-full text-xs outline-none"
					type="text"
					placeholder="Search Board..."
				/>
				<MdSearch color="white" size={25} />
			</div> */}
		</div>
	);
};

export default NumberOfProjects;

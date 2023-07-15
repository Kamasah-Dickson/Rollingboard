"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useContext, useState } from "react";
import { modalContext } from "@/app/contexts/appContext";
import Modal from "./Modal";

const Projects = () => {
	const [projectID, setProjectID] = useState("");

	const {
		showModal,
		setShowModal,
		setProfileType,
		profileType,
		projectData,
		setProjectData,
	} = useContext(modalContext);

	const handleClose = (id: any) => {
		setProjectID(id);
		setShowModal(true);
		setProfileType("alert");
	};

	const handleCreateProject = () => {
		setShowModal(true);
		setProfileType("newProject");
	};

	return (
		<div className="mt-20 gap-5 my-grid">
			{Object.entries(projectData).map(([key, project]) => {
				return (
					<div key={project.uid} className="projectCard max-w-xl">
						<div className="card-inner">
							<MdClose
								size={25}
								color="white"
								cursor={"pointer"}
								className=" select-none active:scale-[1.03] relative right-2 ml-auto max-w-fit top-2"
								onClick={() => handleClose(key)}
							/>
							<div className=" mx-auto flex w-full flex-col items-center justify-center rounded-[17px] px-5 pt-16 ">
								<h3 className="my-2 text-center text-lg font-medium md:text-xl">
									{project.projectName}
								</h3>
								<p className="text-center text-sm font-normal text-[#909296]">
									{project.description}
								</p>
							</div>
							<div className="flex my-7 items-center gap-5 justify-center">
								<button
									type="button"
									className="active:scale-[1.03] text-white bg-[#47454580] p-2 text-sm rounded-sm"
								>
									Open board
								</button>
								<button
									type="button"
									className="text-white active:scale-[1.03] bg-[#47454580] p-2 text-sm rounded-sm"
								>
									Edit
								</button>
							</div>
						</div>
					</div>
				);
			})}
			<div className="projectCard max-w-xl">
				<div className="card-inner">
					<button
						onClick={handleCreateProject}
						type="button"
						className=" active:scale-[1.02] gap-2 cursor-pointer h-full mx-auto flex w-full items-center justify-center rounded-[17px] "
					>
						<AiOutlinePlus size={35} color="white" />
						<p className="text-center text-xl font-medium text-white">
							Create Board
						</p>
					</button>
				</div>
			</div>
			{showModal && (
				<Modal
					projectID={projectID}
					setShowModal={setShowModal}
					profileType={profileType}
					setProjectData={setProjectData}
					projectData={projectData}
				/>
			)}
		</div>
	);
};

export default Projects;

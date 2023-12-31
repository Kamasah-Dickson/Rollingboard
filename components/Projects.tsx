"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { modalContext } from "@/app/contexts/appContext";
import Modal from "./Modal";
import Link from "next/link";
import { auth, database } from "@/configs/firebase";
import { onValue, ref } from "firebase/database";
import { IDefault, Iproject } from "@/interface/interface";

const Projects = () => {
	const [projectID, setProjectID] = useState("");
	const [projectDefaultValues, setProjectdefaultValues] = useState<IDefault>({
		uid: "",
		projectName: "",
		description: "",
		color: "",
	});

	const { showModal, setShowModal, setmodalType, modalType } =
		useContext(modalContext);

	const [projectData, setProjectData] = useState<Iproject[]>([]);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				const dbRef = ref(database, "projects/" + user.uid);
				onValue(dbRef, (snapshot) => {
					const data = snapshot.val();
					if (data) {
						setProjectData(data);
					}
				});
			}
		});

		return () => unsubscribe();
	}, []);

	const handleClose = (key: string) => {
		setProjectID(key);
		setmodalType("alert");
		setShowModal(true);
	};

	const handleCreateProject = () => {
		setmodalType("newProject");
		setShowModal(true);
	};

	function randomColor(color: string) {
		const modifiedColor = color;
		return {
			background: `linear-gradient(180deg , ${modifiedColor} 0%, rgba(0, 0, 0, 1) 75%)`,
		};
	}
	function border(color: string) {
		const colors = [
			"#320606",
			"#321E06",
			"#063218",
			"#320630",
			"#091C43",
			"#09201E",
			"#191D09",
		];
		const randomIndex = Math.floor(Math.random() * colors.length);
		const selectedColor = colors[randomIndex] + "01";
		return {
			background: `linear-gradient(180deg, ${color} 0%, ${selectedColor} 95%)`,
		};
	}

	const handleProjectEdit = (id: string, project: IDefault) => {
		setProjectID(id);
		setmodalType("editProject");
		setShowModal(true);
		setProjectdefaultValues(project);
	};

	return (
		<>
			<div className="flex items-center max-w-lg mx-auto sm:max-w-full justify-between flex-col sm:flex-row gap-5">
				<h1 className="text-xl md:text-2xl">{`Projects(${
					Object.values(projectData).length
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
			<div className="mt-20 gap-5 my-grid">
				{Object.entries(projectData).map(([key, project]) => {
					return (
						<div
							key={key}
							className="projectCard max-w-xl"
							style={randomColor(project.color)}
						>
							<div className="before" style={border(project.color)}></div>

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
										{project?.projectName?.length > 30
											? project.projectName.slice(0, 40) + "..."
											: project.projectName}
									</h3>
									<p className="text-center text-sm font-normal text-[#909296]">
										{project?.description?.length > 50
											? project.description.slice(0, 100) + "..."
											: project.description}
									</p>
								</div>
								<div className="flex my-7 items-center gap-5 justify-center">
									<Link
										href={`/rollingboard/${key}?uid=${key}`}
										type="button"
										className="active:scale-[1.03] text-white bg-[#47454580] p-2 text-sm rounded-sm"
									>
										Open board
									</Link>
									<button
										onClick={() => handleProjectEdit(key, project)}
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

				<div className="projectCard max-w-xl" style={randomColor("#06321899")}>
					<div className="before" style={border("#06321899")}></div>
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
						modalType={modalType}
						setProjectData={setProjectData}
						projectData={projectData}
						projectDefaultValues={projectDefaultValues}
						setProjectdefaultValues={setProjectdefaultValues}
					/>
				)}
			</div>
		</>
	);
};

export default Projects;

"use client";

import { useRef } from "react";
import { modalContext } from "@/app/contexts/appContext";
import { auth, database } from "@/configs/firebase";
import { Iproject, Itask } from "@/interface/interface";
import { onValue, ref, set, update } from "firebase/database";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { MdClose } from "react-icons/md";
import Modal from "./Modal";
import uuid from "react-uuid";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const Tasks = ({ params }: { params: { project: string } }) => {
	const searchParams = useSearchParams();
	const searchParamsID = searchParams.get("uid");
	const [isSending, setIsSending] = useState(false);
	const [theEditingTaskID, setTheEditingTaskID] = useState<null | string>("");
	const [editedTaskName, setEditedTaskName] = useState("");

	const inputRef = useRef<HTMLInputElement>(null);
	const inputRef2 = useRef<HTMLInputElement>(null);

	const {
		setShowModal,
		setmodalType,
		modalType,
		showModal,
		setColumnName,
		tasks,
		setTasks,
	} = useContext(modalContext);

	const [showInput, setShowInput] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const handleNewTask = () => {
		setmodalType("newTask");
		setShowModal(true);
	};

	const [currentProject, setCurrentProject] = useState<Iproject[]>([
		{
			uid: "",
			projectName: "",
			description: "",
			color: "",
		},
	]);

	useEffect(() => {
		if (showInput && inputRef.current) {
			inputRef.current.focus();
		}
	}, [showInput]);

	useEffect(() => {
		if (theEditingTaskID && inputRef2.current) {
			inputRef2.current.focus();
		}
	}, [theEditingTaskID]);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				const dbRef = ref(
					database,
					"projects/" + user.uid + `/${params.project}`
				);
				onValue(dbRef, (snapshot) => {
					const data = snapshot.val();
					if (data) {
						setCurrentProject([data]);
					}
				});
			}
		});
		return () => unsubscribe();
	}, [params.project]);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				const taskRef = ref(
					database,
					"projects/" + auth.currentUser?.uid + "/" + searchParamsID + "/tasks/"
				);
				onValue(taskRef, (snapshot) => {
					const data = snapshot.val();
					if (data) {
						const allTasks = Object.values(data) as Itask[];
						setTasks(allTasks);
					}
				});
			}
		});

		return () => unsubscribe();
	}, [searchParamsID, setTasks]);

	const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			setIsSending(true);
			const uid = uuid();
			await set(
				ref(
					database,
					"projects/" +
						auth?.currentUser?.uid +
						"/" +
						searchParamsID +
						"/tasks/ " +
						uid
				),
				{
					taskName: inputValue,
					uid,
				}
			)
				.then(() => {
					toast.success(`${inputValue} has been added successfully`, {
						position: toast.POSITION.TOP_CENTER,
					});
					setShowInput(false);
					setInputValue("");
				})
				.catch((error) => {
					console.log(error);
					toast.error(`Error adding ${inputValue}`);
					setShowInput(false);
				})
				.finally(() => {
					setIsSending(false);
				});
		}
	};

	const handleTaskRemove = async (uid: string, columnName: string) => {
		setmodalType("taskRemove");
		setShowModal(true);
		setColumnName((prev) => ({ ...prev, column: columnName, uid }));
	};

	const toggleTaskEdit = (taskID: string, taskName: string) => {
		setEditedTaskName(taskName);
		setTheEditingTaskID(taskID === theEditingTaskID ? null : taskID);
	};

	const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditedTaskName(e.target.value);
	};

	const saveEditedTask = (taskID: string) => {
		setTasks((prevTask) =>
			prevTask.map((task) =>
				task.uid === taskID ? { ...task, taskName: editedTaskName } : task
			)
		);
		setTheEditingTaskID(null);
	};

	const handleTaskNameKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		uid: string
	) => {
		if (e.key === "Enter") {
			saveEditedTask(uid);

			const updateRef = ref(
				database,
				"projects/" +
					auth?.currentUser?.uid +
					"/" +
					searchParamsID +
					"/tasks/ " +
					uid
			);

			const updates = {
				taskName: editedTaskName,
			};

			update(updateRef, updates);
			toast.success(`Project has been updated`, {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	return (
		<div className="h-screen flex flex-col">
			<main className="mt-32 my-max flex-1">
				{currentProject.map((project: Iproject) => {
					return (
						<>
							<div key={project.uid}>
								<div className="flex items-center gap-5">
									<Link href="/rollingboard">
										<IoIosArrowBack
											color="white"
											cursor={"pointer"}
											size={30}
										/>
									</Link>
									<h1 className="text-3xl font-semibold md:text-4xl">
										{project.projectName.length > 20
											? project.projectName.slice(0, 20) + "..."
											: project.projectName}
									</h1>
								</div>
								<p className="ml-2 mt-3">{project.description}</p>
							</div>
							<div className="flex mt-7 flex-wrap items-start gap-5">
								{tasks.map((task) => {
									return (
										<div
											key={task.uid}
											className="flex max-w-[300px] w-full justify-center flex-col rounded-md bg-[#101113] border border-[#8080802f] p-4 text-white"
										>
											<span className="mb-2 flex items-center justify-between">
												{theEditingTaskID === task.uid ? (
													<input
														ref={inputRef2}
														type="text"
														value={editedTaskName}
														onChange={(e) => handleTaskNameChange(e)}
														placeholder="Enter task name"
														onBlur={() => setTheEditingTaskID(null)}
														className="text-white bg-transparent border p-1 outline-none border-[#80808041]"
														onKeyDown={(e) =>
															handleTaskNameKeyDown(e, task.uid)
														}
													/>
												) : (
													<h2
														onClick={() =>
															toggleTaskEdit(task.uid, task.taskName)
														}
														title={task.taskName}
														className="capitalize cursor-pointer text-xl font-medium "
													>
														{task.taskName.length > 20
															? task.taskName.slice(0, 20) + "..."
															: task.taskName}
													</h2>
												)}
												<MdClose
													onClick={() =>
														handleTaskRemove(task.uid, task.taskName)
													}
													size={20}
													color="white"
													cursor={"pointer"}
												/>
											</span>
											<span className=" cursor-pointer flex items-center gap-3 mt-3">
												<AiOutlinePlus color="white" size={20} />
												Add task
											</span>
										</div>
									);
								})}
								<div>
									{showInput ? (
										<input
											disabled={isSending}
											ref={inputRef}
											type="text"
											value={inputValue}
											onChange={(e) => setInputValue(e.target.value)}
											placeholder="Enter column name"
											onBlur={() => setShowInput(false)}
											onKeyDown={(e) => handleKeyDown(e)}
											className="border border-white placeholder:text-sm text-white bg-black py-2 px-7"
										/>
									) : (
										<button
											onClick={() => setShowInput(true)}
											className="text-white transition-colors hover:border-white active:scale-[1.02] border border-[#ffffff5b] px-7 py-2 rounded-lg text-xl flex items-center gap-3"
										>
											<AiOutlinePlus color="white" size={23} />
											Add column
										</button>
									)}
								</div>
							</div>
						</>
					);
				})}
			</main>
			{showModal && <Modal setShowModal={setShowModal} modalType={modalType} />}
		</div>
	);
};

export default Tasks;

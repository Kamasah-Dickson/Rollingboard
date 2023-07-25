"use client";
import { modalContext } from "@/app/contexts/appContext";
import { auth, database } from "@/configs/firebase";
import { remove } from "firebase/database";
import { ref } from "firebase/database";
import { useSearchParams } from "next/navigation";
import { SetStateAction, Dispatch, useContext } from "react";

const RemoveTask = ({
	setShowModal,
}: {
	setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
	const { columnName, setTasks, tasks } = useContext(modalContext);
	const searchParams = useSearchParams();
	const searchParamsID = searchParams.get("uid");

	const handleColumnRemove = async () => {
		const taskRef = ref(
			database,
			"projects/" +
				auth?.currentUser?.uid +
				"/" +
				searchParamsID +
				"/tasks/ " +
				columnName.uid
		);

		remove(taskRef)
			.then(() => {
				setShowModal(false);
			})
			.catch((error) => {
				console.error("Error removing data:", error);
				setShowModal(false);
			});
		setShowModal(false);

		const newFilteredTasks = tasks.filter(
			(task) => task.uid !== columnName.uid
		);
		if (newFilteredTasks) {
			setTasks(newFilteredTasks);
		}
	};

	return (
		<>
			<p className="text-white text-center">
				Do you wish to remove {columnName.column}?
			</p>
			<div className="flex items-center gap-4 text-white text-xs justify-center mt-5">
				<button
					onClick={handleColumnRemove}
					type="button"
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
	);
};

export default RemoveTask;

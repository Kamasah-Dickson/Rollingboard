"use client";

import { Icolumn, Imodal, Itask } from "@/interface/interface";
import { ReactElement, createContext, useState } from "react";

export const modalContext = createContext<Imodal>({
	showModal: false,
	modalType: "",
	columnName: {
		column: "",
		uid: "",
	},
	childTaskID: "",
	tasks: [],
	setTasks: () => {},
	setShowModal: () => {},
	setmodalType: () => {},
	setColumnName: () => {},
	setChildTaskID: () => {},
});

const AppContext = ({ children }: { children: ReactElement }) => {
	const [showModal, setShowModal] = useState(false);
	const [modalType, setmodalType] = useState("");
	const [tasks, setTasks] = useState<Itask[]>([]);
	const [childTaskID, setChildTaskID] = useState("");

	const [columnName, setColumnName] = useState<Icolumn>({
		column: "",
		uid: "",
	});

	return (
		<modalContext.Provider
			value={{
				showModal,
				setShowModal,
				modalType,
				setmodalType,
				columnName,
				setColumnName,
				childTaskID,
				setChildTaskID,
				setTasks,
				tasks,
			}}
		>
			{children}
		</modalContext.Provider>
	);
};

export default AppContext;

import { Dispatch, SetStateAction } from "react";
export interface Iproject {
	uid: string;
	projectName: string;
	description: string;
	// empty: boolean;
	// backlog: string[];
	// todo: string[];
	// finished: string[];

	color: string;
}
[];

export interface IDefault {
	uid: string;
	projectName: string;
	description: string;
	color: string;
}

export interface Itask {
	uid: string;
	taskName: string;
	children: {
		uid: string;
		task: string;
	}[];
}

export interface Imodal {
	showModal: boolean;
	modalType: string;
	tasks: Itask[];
	columnName: {
		column: string;
		uid: string;
	};
	childTaskID: string;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setmodalType: Dispatch<SetStateAction<string>>;
	setTasks: Dispatch<SetStateAction<Itask[]>>;
	setChildTaskID: Dispatch<SetStateAction<string>>;
	setColumnName: Dispatch<
		SetStateAction<{
			column: string;
			uid: string;
		}>
	>;
}

export interface Icolumn {
	column: string;
	uid: string;
}

export interface IChildTask {
	uid: string;
	parentID: string;
	description: string;
	task: string;
}

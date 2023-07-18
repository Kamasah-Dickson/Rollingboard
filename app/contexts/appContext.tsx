"use client";

import {
	ReactElement,
	createContext,
	Dispatch,
	SetStateAction,
	useState,
	useEffect,
} from "react";
import { onValue, ref } from "firebase/database";
import { auth, database } from "@/configs/firebase";
import { Iproject } from "@/interface/interface";

interface Imodal {
	showModal: boolean;
	modalType: string;
	projectData: Iproject[];
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setmodalType: Dispatch<SetStateAction<string>>;
	setProjectData: Dispatch<SetStateAction<Iproject[]>>;
}

export const modalContext = createContext<Imodal>({
	showModal: false,
	modalType: "",
	projectData: [],
	setShowModal: () => {},
	setmodalType: () => {},
	setProjectData: () => {},
});

const AppContext = ({ children }: { children: ReactElement }) => {
	const [showModal, setShowModal] = useState(false);
	const [modalType, setmodalType] = useState("");
	const [projectData, setProjectData] = useState<Iproject[]>([]);

	//fetch the data from firebase here and pass it as props to the project component
	useEffect(() => {
		const dbRef = ref(database, "projects/" + auth?.currentUser?.uid);
		onValue(dbRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				setProjectData(data);
			}
		});
	}, []);

	return (
		<modalContext.Provider
			value={{
				showModal,
				setShowModal,
				modalType,
				setmodalType,
				projectData,
				setProjectData,
			}}
		>
			{children}
		</modalContext.Provider>
	);
};

export default AppContext;

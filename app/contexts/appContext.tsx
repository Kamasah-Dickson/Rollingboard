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
import { database } from "@/configs/firebase";
import { Iproject } from "@/fakeData";

interface Imodal {
	showModal: boolean;
	profileType: string;
	projectData: Iproject[];
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setProfileType: Dispatch<SetStateAction<string>>;
	setProjectData: Dispatch<SetStateAction<Iproject[]>>;
}

export const modalContext = createContext<Imodal>({
	showModal: false,
	profileType: "",
	projectData: [],
	setShowModal: () => {},
	setProfileType: () => {},
	setProjectData: () => {},
});

const AppContext = ({ children }: { children: ReactElement }) => {
	const [showModal, setShowModal] = useState(false);
	const [profileType, setProfileType] = useState("");
	const [projectData, setProjectData] = useState<Iproject[]>([]);

	//fetch the data from firebase here and pass it as props to the project component
	useEffect(() => {
		const dbRef = ref(database, "projects/");
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
				profileType,
				setProfileType,
				projectData,
				setProjectData,
			}}
		>
			{children}
		</modalContext.Provider>
	);
};

export default AppContext;

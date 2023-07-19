"use client";

import {
	ReactElement,
	createContext,
	Dispatch,
	SetStateAction,
	useState,
} from "react";

interface Imodal {
	showModal: boolean;
	modalType: string;
	userAuth: string;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setmodalType: Dispatch<SetStateAction<string>>;
	setUserAuth: Dispatch<SetStateAction<string>>;
}

export const modalContext = createContext<Imodal>({
	showModal: false,
	modalType: "",
	setShowModal: () => {},
	setmodalType: () => {},
	setUserAuth: () => {},
	userAuth: "",
});

const AppContext = ({ children }: { children: ReactElement }) => {
	const [showModal, setShowModal] = useState(false);
	const [modalType, setmodalType] = useState("");
	const [userAuth, setUserAuth] = useState("");

	return (
		<modalContext.Provider
			value={{
				showModal,
				setShowModal,
				modalType,
				userAuth,
				setUserAuth,
				setmodalType,
			}}
		>
			{children}
		</modalContext.Provider>
	);
};

export default AppContext;

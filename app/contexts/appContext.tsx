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
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setmodalType: Dispatch<SetStateAction<string>>;
}

export const modalContext = createContext<Imodal>({
	showModal: false,
	modalType: "",
	setShowModal: () => {},
	setmodalType: () => {},
});

const AppContext = ({ children }: { children: ReactElement }) => {
	const [showModal, setShowModal] = useState(false);
	const [modalType, setmodalType] = useState("");

	return (
		<modalContext.Provider
			value={{
				showModal,
				setShowModal,
				modalType,
				setmodalType,
			}}
		>
			{children}
		</modalContext.Provider>
	);
};

export default AppContext;

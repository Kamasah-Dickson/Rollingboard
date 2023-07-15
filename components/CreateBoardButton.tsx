"use client";

import { auth } from "@/configs/firebase";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CreateBoardButton = () => {
	const [currentUser, setCurrentUser] = useState<null | any>(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<Link
			href={currentUser ? "/rollingboard" : "/login"}
			className=" text-md mb-5 mt-5 cursor-pointer rounded-md bg-[#610386] px-6 py-2 font-medium text-white hover:bg-[#8010adec] active:scale-[1.02]"
		>
			Create Kanban Board
		</Link>
	);
};

export default CreateBoardButton;

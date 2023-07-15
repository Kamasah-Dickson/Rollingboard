"use client";

import { CircleLoader } from "react-spinners";

export default function Loading() {
	return (
		<div className="h-screen w-screen grid place-content-center">
			<CircleLoader color="white" />
		</div>
	);
}

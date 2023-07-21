"use client";

import Footer from "@/components/Footer";
import { auth, database } from "@/configs/firebase";
import { Iproject } from "@/interface/interface";
import { onValue } from "firebase/database";
import { ref } from "firebase/database";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

const SingleProject = ({ params }: { params: { project: string } }) => {
	const [currentProject, setCurrentProject] = useState<Iproject[]>([
		{
			uid: "",
			projectName: "",
			description: "",
			tasks: [{ backlog: [], todo: [], finished: [] }],
			color: "",
		},
	]);

	useEffect(() => {
		const dbRef = ref(
			database,
			"projects/" + auth?.currentUser?.uid + `/${params.project}`
		);

		onValue(dbRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				setCurrentProject([data]);
			}
		});
	}, [params.project]);
	return (
		<div className="h-screen flex flex-col">
			<main className="mt-32 my-max flex-1">
				{currentProject?.map((project) => {
					return (
						<div key={project.uid}>
							<div className="flex items-center gap-5">
								<Link href="/rollingboard">
									<IoIosArrowBack color="white" cursor={"pointer"} size={30} />
								</Link>
								<h1 className="text-3xl md:text-4xl">{project.projectName}</h1>
							</div>
							<p className="ml-2 mt-3">{project.description}</p>
						</div>
					);
				})}
			</main>
			<Footer />
		</div>
	);
};

export default SingleProject;

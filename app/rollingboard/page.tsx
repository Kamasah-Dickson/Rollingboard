import Footer from "@/components/Footer";
import { Metadata } from "next";
import Projects from "@/components/Projects";
import AppContext from "../contexts/appContext";
import NumberOfProjects from "@/components/NumberOfProjects";

export const metadata: Metadata = {
	title: "Rollingboard",
};

const RollingBoard = () => {
	return (
		<div className="h-screen flex flex-col">
			<main className="mt-32 my-max flex-1">
				<AppContext>
					<>
						<NumberOfProjects />
						<Projects />
					</>
				</AppContext>
			</main>
			<Footer />
		</div>
	);
};

export default RollingBoard;

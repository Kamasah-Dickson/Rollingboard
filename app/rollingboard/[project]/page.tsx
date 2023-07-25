import AppContext from "@/app/contexts/appContext";
import Tasks from "@/components/Tasks";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Rollingboard - Tasks",
};

const SingleProject = ({ params }: { params: { project: string } }) => {
	return (
		<>
			<AppContext>
				<>
					<Tasks params={params} />;
				</>
			</AppContext>
		</>
	);
};

export default SingleProject;

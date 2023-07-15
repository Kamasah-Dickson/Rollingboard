import Header from "@/components/Header";
import "./sass/globals.scss";
import { Open_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";
import AppContext from "./contexts/appContext";

const open_sans = Open_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
	title: "Welcome to RollingBoard",
	description:
		"RollingBoard is a powerful Kanban application that helps you streamline your workflow and boost productivity. With RollingBoard, you can easily manage your tasks, projects, and workflows using the popular Kanban board methodology. Stay organized, collaborate effectively, and track progress effortlessly.",
	creator: "Kamasah Dickson",
	authors: [
		{
			name: "Kamasah Dickson",
			url: "https://port-folio-six-sandy.vercel.app/",
		},
	],
	keywords: ["Kanban", "task management", "productivity", "collaboration"],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={open_sans.className}>
				<AppContext>
					<Header />
				</AppContext>
				{children}
				<ToastContainer theme="dark" />
			</body>
		</html>
	);
}

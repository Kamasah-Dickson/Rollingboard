// "use client";

import Header from "@/components/Header";
import "./sass/globals.scss";
import { Open_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const open_sans = Open_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

export const metadata = {
	title: "RollingBoard",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={open_sans.className}>
				<Header />
				{children}
				<ToastContainer />
				<Footer />
			</body>
		</html>
	);
}

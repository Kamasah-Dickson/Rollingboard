import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Sorry page not found",
};

export default function NotFound() {
	return (
		<section className="hero mt-12 flex select-none flex-col items-center justify-center p-1">
			<h1 className=" my-2 max-w-xl text-center text-5xl font-medium text-white sm:text-5xl md:my-3  md:max-w-2xl md:text-6xl md:font-bold ">
				Sorry! Page not found
			</h1>

			<Link
				href={"/rollingboard"}
				className=" text-md mb-5 mt-5 cursor-pointer rounded-md bg-[#610386] px-6 py-2 font-medium text-white hover:bg-[#8010adec] active:scale-[1.02]"
			>
				Go back home
			</Link>
		</section>
	);
}

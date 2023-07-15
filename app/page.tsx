import About from "../components/About";
import Footer from "@/components/Footer";
import CreateBoardButton from "@/components/CreateBoardButton";

export default function Home() {
	return (
		<>
			<section className="hero mt-12 flex select-none flex-col items-center justify-center p-1">
				<h1 className="text-lg text-white md:text-xl">
					Project Management App
				</h1>
				<h2 className=" my-2 max-w-xl text-center text-5xl font-medium text-white sm:text-5xl md:my-3  md:max-w-2xl md:text-6xl md:font-bold ">
					Collaborate and build faster, together.
				</h2>
				<p className="xs:text-md mt-5 max-w-md text-center sm:text-lg lg:text-xl">
					Create, share, and get feedback with collaborative boards for rapid
					development.
				</p>
				<CreateBoardButton />
			</section>
			<About />
			<Footer />
		</>
	);
}

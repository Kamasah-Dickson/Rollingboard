import About from "../components/About";

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
				<button
					type="button"
					className=" text-md mb-5 mt-5 cursor-pointer rounded-md bg-[#610386] px-6 py-2 font-medium text-white hover:bg-[#8010adec] active:scale-[1.02]"
				>
					Create Kanban Board
				</button>
			</section>
			<About />
		</>
	);
}

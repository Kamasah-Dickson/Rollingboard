import Footer from "@/components/Footer";
import { MdSearch, MdClose } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Rollingboard",
};

const RollingBoard = () => {
	return (
		<div className="h-screen flex flex-col">
			<main className="mt-32 my-max flex-1">
				<div className="flex items-center max-w-lg mx-auto sm:max-w-full justify-between flex-col sm:flex-row gap-5">
					<h1 className="text-xl md:text-2xl">{"Projects(0)"}</h1>
					<div className="flex border border-white max-w-lg items-center p-1 justify-between gap-4">
						<input
							className="bg-transparent p-1 text-white  w-full text-xs outline-none"
							type="text"
							placeholder="Search Board..."
						/>
						<MdSearch color="white" size={25} />
					</div>
				</div>
				{/* //projects */}

				<div className="mt-20 gap-5 my-grid">
					<div className="projectCard max-w-xl">
						<div className="card-inner">
							<MdClose
								size={25}
								color="white"
								cursor={"pointer"}
								className=" select-none active:scale-[1.03] relative right-2 ml-auto max-w-fit top-2"
							/>
							<div className=" mx-auto flex w-full flex-col items-center justify-center rounded-[17px] px-5 pt-16 ">
								<h3 className="my-2 text-center text-lg font-medium md:text-xl">
									Integrate
								</h3>
								<p className="text-center text-sm font-normal text-[#909296]">
									The ability to quickly set up and customize workflows for just
									about anything.
								</p>
							</div>
							<div className="flex my-7 items-center gap-5 justify-center">
								<button
									type="button"
									className="active:scale-[1.03] text-white bg-[#47454580] p-2 text-sm rounded-sm"
								>
									Open board
								</button>
								<button
									type="button"
									className="text-white active:scale-[1.03] bg-[#47454580] p-2 text-sm rounded-sm"
								>
									Edit
								</button>
							</div>
						</div>
					</div>
					<div className="projectCard max-w-xl">
						<div className="card-inner">
							<button
								type="button"
								className=" active:scale-[1.02] gap-2 cursor-pointer h-full mx-auto flex w-full items-center justify-center rounded-[17px] "
							>
								<AiOutlinePlus size={35} color="white" />
								<p className="text-center text-xl font-medium text-white">
									Create Board
								</p>
							</button>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default RollingBoard;

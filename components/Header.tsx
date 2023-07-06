"use client";

import Image from "next/image";
import logo from "../public/Rollingboard.svg";
import Link from "next/link";
import { MdClose, MdMenu } from "react-icons/md";
import { useState } from "react";

const Header = () => {
	const [showNav, setShowNav] = useState(false);

	return (
		<header
			className={`${
				showNav && "overflow-visible"
			} fixed left-0 top-0 z-50 mb-12 w-full`}
		>
			<div className="my-max flex w-full items-center justify-between py-4">
				<Link
					passHref={true}
					href="/"
					className="flex items-center justify-center gap-4"
				>
					<Image src={logo} width={25} height={25} alt="rollingboard" />
					<p className="text-md text-white">RollingBoard</p>
				</Link>

				<div
					onClick={() => setShowNav(false)}
					className={` ${
						showNav ? "translate-x-[0%] " : "translate-x-[100%]"
					} my-trans-visible fixed right-0 top-0  h-screen w-full select-none bg-gradient-to-r from-[#000000d8]  md:hidden`}
				></div>

				<ul
					className={` ${
						showNav
							? " translate-x-[0%] "
							: " translate-x-[100%] md:translate-x-[0%] "
					}  my-trans text-md text-md absolute   right-0 top-0 z-20 flex  h-screen w-[70%] flex-col items-center justify-center gap-5 bg-[#000000] p-2 text-[#909296] md:relative md:h-full md:flex-row md:bg-transparent`}
				>
					<MdClose
						color="white"
						size={25}
						onClick={() => setShowNav(false)}
						className={`${
							!showNav && "hidden"
						} absolute right-5 top-5 cursor-pointer md:hidden`}
					/>
					<li>
						<Link
							className="transition-all hover:text-white"
							href={"/projects"}
						>
							Projects
						</Link>
					</li>
					<li>
						<Link className="transition-all hover:text-white" href={"/profile"}>
							Profile
						</Link>
					</li>
					<li>
						<Link className="transition-all hover:text-white" href={"/search"}>
							Search
						</Link>
					</li>

					<li>
						<Link className="transition-all hover:text-white" href={"/about"}>
							About
						</Link>
					</li>
					<li>
						<div className="flex flex-col items-center justify-center gap-5 md:hidden">
							<Link href={"/login"} className="cursor-pointer hover:text-white">
								Login
							</Link>
							<Link
								href={"/signup"}
								className="mt-3 cursor-pointer rounded-md bg-white px-4 py-1 text-black transition-all hover:bg-[#8010adec] hover:text-white active:scale-[1.02]"
							>
								Signup
							</Link>
						</div>
					</li>
				</ul>

				<div className="hidden items-center justify-center gap-5 md:flex">
					<Link
						href={"/login"}
						type="button"
						className="cursor-pointer text-white"
					>
						Login
					</Link>
					<Link
						href={"/signup"}
						className="cursor-pointer rounded-lg bg-white px-3 py-1 text-black active:scale-[1.01]"
						type="button"
					>
						Signup
					</Link>
				</div>
				<MdMenu
					onClick={() => setShowNav(true)}
					cursor={"pointer"}
					color="white"
					size={25}
					className="md:hidden"
				/>
			</div>
		</header>
	);
};
export default Header;
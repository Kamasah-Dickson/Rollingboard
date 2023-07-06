import Image from "next/image";
import rsLogo from "@/public/rs.svg";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="relative border-t border-[rgb(16,17,19,3)] bg-black py-3 pt-4">
			<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 p-2 md:flex-row">
				<Link href="/">
					<Image src={rsLogo} width={25} height={25} alt="rs" />
				</Link>
				<Link
					href="https://github.com/Kamasah-Dickson"
					className="text-sm text-[#90929688] hover:text-white"
				>
					@Kamasah Dickson
				</Link>
				<span className="text-center text-sm text-[#90929688]">
					&copy; {new Date().getFullYear()} All rights reserved.
				</span>
				<span className="text-center text-sm text-[#90929688]">
					Powered by Next Js
				</span>
			</div>
		</footer>
	);
};

export default Footer;

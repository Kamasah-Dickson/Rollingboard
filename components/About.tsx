import React from "react";
import IntegrateImgage from "../public/integrate.svg";
import collaborateImage from "../public/collaborate.svg";
import succeedImage from "../public/succeed.svg";
import correctImage from "../public/correct.svg";
import workFlowImage from "../public/workflow-banner.svg";
import noLimitsImage from "../public/no-limits.svg";
import optimizeImage from "../public/package.svg";

import Image from "next/image";

const About = () => {
	return (
		<div className="mt-12">
			<div className="my-max">
				<div className=" grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
					<div className="card max-w-[450px] md:max-w-[340px]">
						<div className="card-inner">
							<div className=" mx-auto flex w-full flex-col items-center justify-center rounded-[17px] px-5 py-16 ">
								<Image
									src={IntegrateImgage}
									width={40}
									height={40}
									alt="Integrate"
								/>
								<h3 className="my-2 text-center text-xl font-medium md:text-2xl">
									Integrate
								</h3>
								<p className="text-center text-lg font-normal text-[#909296] md:text-xl">
									The ability to quickly set up and customize workflows for just
									about anything.
								</p>
							</div>
						</div>
					</div>
					<div className="card max-w-[450px] md:max-w-[340px]">
						<div className="card-inner">
							<div className="mx-auto flex w-full flex-col items-center justify-center px-5 py-16 ">
								<Image
									src={collaborateImage}
									width={40}
									height={40}
									alt="collaborate"
								/>
								<h3 className="my-2 text-center text-xl font-medium md:text-2xl">
									Collaborate
								</h3>
								<p className="text-center text-lg font-normal text-[#909296] md:text-xl">
									Manage projects, organize tasks, and build team spirit all in
									one place.
								</p>
							</div>
						</div>
					</div>

					<div className="card max-w-[450px] md:max-w-[340px]">
						<div className="card-inner">
							<div className="mx-auto flex w-full flex-col items-center justify-center px-5 py-16 md:max-w-[320px]">
								<Image
									src={succeedImage}
									width={40}
									height={40}
									alt="succeed"
								/>
								<h3 className="my-2 text-center text-xl font-medium md:text-2xl">
									Succeed
								</h3>
								<p className="text-center text-lg font-normal text-[#909296] md:text-xl">
									Every single part of your task can be managed, tracked, and
									shared with teammates.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center gap-16  pt-28 md:flex-row ">
					<div className="text-center md:text-left">
						<span className="flex items-center justify-center gap-3 md:justify-start">
							<div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#15AABF] p-2">
								<Image
									src={correctImage}
									height={25}
									width={25}
									alt="universal"
								/>
							</div>
							<p className="text-xl font-normal text-white ">Universal</p>
						</span>
						<h4 className="my-3 max-w-lg text-5xl font-medium text-white md:my-4 md:text-6xl md:font-bold">
							Build the workflow you want
						</h4>
						<p className="mx-auto max-w-sm text-center text-lg md:max-w-lg md:text-left md:text-xl">
							Manage your boards using Drag-n-Drop, create adittional boards and
							tasks.
						</p>
					</div>
					<Image src={workFlowImage} width={470} height={470} alt="universal" />
				</div>

				<div className="my-10 flex flex-col items-center justify-center gap-16  pt-28 md:flex-row ">
					<Image
						className="order-2 md:order-1"
						src={optimizeImage}
						width={470}
						height={470}
						alt="universal"
					/>
					<div className="order-1 text-center md:order-2 md:text-left">
						<span className="flex items-center justify-center gap-3 md:justify-start">
							<div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#15AABF] p-2">
								<Image
									src={correctImage}
									height={25}
									width={25}
									alt="universal"
								/>
							</div>
							<p className="text-xl font-normal  text-white">Optimized</p>
						</span>
						<h4 className="my-3 max-w-lg text-5xl font-medium text-white md:my-4 md:text-6xl md:font-bold">
							Everything you need in one place
						</h4>
						<p className="mx-auto max-w-sm text-center text-lg md:max-w-lg md:text-left md:text-xl">
							You can specify additional info in task description and assign
							users.
						</p>
					</div>
				</div>

				<div className="flex flex-col  items-center justify-center gap-16 pt-28 md:flex-row ">
					<div className="text-center md:text-left">
						<span className="flex items-center justify-center gap-3 md:justify-start">
							<div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#15AABF] p-2">
								<Image
									src={correctImage}
									height={25}
									width={25}
									alt="universal"
								/>
							</div>
							<p className="text-xl font-normal  text-white">Unlimited</p>
						</span>
						<h4 className="my-3 max-w-lg text-5xl font-medium text-white md:my-4 md:text-6xl md:font-bold">
							No limits for all users.
						</h4>
						<p className="mx-auto max-w-sm text-center text-lg md:max-w-lg md:text-left md:text-xl">
							Unlimited kanban boards, columns and tasks.
						</p>
					</div>
					<Image src={noLimitsImage} width={470} height={470} alt="unlimited" />
				</div>
			</div>
		</div>
	);
};

export default About;

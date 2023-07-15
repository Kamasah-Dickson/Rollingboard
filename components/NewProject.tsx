"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Inputs } from "./SignupLogic";
import { useContext } from "react";
import { modalContext } from "@/app/contexts/appContext";

interface IProject {
	register: UseFormRegister<Inputs>;
	isSubmitting: boolean;
	errors: FieldErrors<Inputs>;
}
export const NewProject = ({ isSubmitting, register, errors }: IProject) => {
	const { setShowModal } = useContext(modalContext);

	return (
		<>
			<h3 className="text-white text-xl mb-5">New Project</h3>
			<label
				className="text-[#555555] text-sm flex mb-3 flex-col"
				htmlFor="name"
			>
				Name
				<input
					{...register("projectName", {
						required: "Name is required",
						minLength: {
							value: 5,
							message: "Name must be at least 5 characters long",
						},
					})}
					aria-invalid={errors.projectName ? "true" : "false"}
					required={true}
					disabled={isSubmitting}
					type="text"
					className="bg-transparent p-2 my-1 text-white text-md mt-1 border border-[#909296] rounded-md focus:border-white"
				/>
			</label>
			{errors.projectName && (
				<p className="text-sm text-[crimson] mb-3" role="alert">
					{errors.projectName?.message}
				</p>
			)}
			<label htmlFor="description" className="text-[#555555]">
				Description
				<textarea
					id="Description"
					required={true}
					disabled={isSubmitting}
					{...register("description", {
						required: "description is required",
					})}
					className="bg-transparent resize-none p-2 w-full h-[70px] text-sm my-1 text-white text-md border border-[#909296] rounded-md focus:border-white"
				></textarea>
			</label>
			{errors.description && (
				<p className="text-sm text-[crimson]" role="alert">
					{errors.description?.message}
				</p>
			)}

			<div className="flex items-center justify-center gap-5">
				<button
					disabled={isSubmitting}
					className={` ${
						!isSubmitting && "active:scale-[1.02]"
					} bg-[#25262B] disabled:bg-[#80808081] transition-colors text-white mt-5 hover:bg-[#3e3e42] py-2 px-5 text-xs md:text-sm rounded-md`}
					type="submit"
				>
					Save
				</button>
				<button
					onClick={() => setShowModal(false)}
					disabled={isSubmitting}
					className={` ${
						!isSubmitting && "active:scale-[1.02]"
					} bg-[#25262B] disabled:bg-[#80808081] transition-colors text-white mt-5 hover:bg-[#3e3e42] py-2 px-5 text-xs md:text-sm rounded-md`}
					type="button"
				>
					Delete
				</button>
			</div>
		</>
	);
};

export default NewProject;

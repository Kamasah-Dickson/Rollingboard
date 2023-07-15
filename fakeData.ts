export interface Iproject {
	uid: string;
	projectName: string;
	description: string;
	tasks: { backlog: string[]; todo: string[]; finished: string[] }[];
	color: string;
}
[];

export const data: Iproject[] = [
	{
		uid: "73483784",
		projectName: "Integrate",
		description:
			"The ability to quickly set up and customize workflows for just about anything.",
		tasks: [
			{
				backlog: [
					"Proof of Concept",
					"Regression Test",
					"set up Monitoring and controlling process",
					"requirements analysis completed",
				],
				todo: ["final check", "desktop publishing", "linguistic review"],
				finished: [], // a projet column
			},
		],
		color: "dfsdf",
	},
];

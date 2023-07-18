export interface Iproject {
	uid: string;
	projectName: string;
	description: string;
	tasks: { backlog: string[]; todo: string[]; finished: string[] }[];
	color: string;
}
[];

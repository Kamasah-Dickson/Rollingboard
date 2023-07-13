import LoginLogic from "@/components/LoginLogic";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Log into rollingboard",
};

const Login = () => {
	return <LoginLogic />;
};
export default Login;

import { Metadata } from "next";
import SignupLogic from "../../components/SignupLogic";
export const metadata: Metadata = {
	title: "Sign up to Rollingboard",
};

const Signup = () => {
	return <SignupLogic />;
};

export default Signup;

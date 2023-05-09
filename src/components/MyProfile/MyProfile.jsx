import React from "react";
import "./myProfile.css";
import { useSelector } from "react-redux";

const MyProfile = () => {
	const state = useSelector((state) => console.log(state));
	return <div>MyProfile</div>;
};

export default MyProfile;

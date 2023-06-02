import React, { useEffect } from "react";
import "./myProfile.css";
import { useSelector } from "react-redux";
import UserInfo from "./userInfo/UserInfo";
import UserProde from "./userProde/UserProde";

const MyProfile = () => {
	const { auth } = useSelector((state) => state);
	const { login } = auth;

	console.log(login);
	return (
		<div style={{ marginTop: "5rem" }}>
			<UserInfo userID={auth.data.userID} />
			<UserProde />
		</div>
	);
};

export default MyProfile;

import React from "react";
import "./myProfile.css";
import { useSelector } from "react-redux";
import UserInfo from "./userInfo/UserInfo";
import UserProde from "./userInfo/UserProde";

const MyProfile = () => {
	const { auth } = useSelector((state) => state);
	return (
		<div style={{ marginTop: "5rem" }}>
			<UserInfo userID={auth.data.userID} />
			<UserProde />
		</div>
	);
};

export default MyProfile;

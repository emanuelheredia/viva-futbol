import React, { useEffect } from "react";
import "./userInfo.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDB } from "../../../actions/user.actions";
import { updateUserDB } from "../../../actions/user.actions";

const UserInfo = ({ userID }) => {
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state);
	useEffect(() => {
		dispatch(getUserDB(userID));
	}, []);
	console.log(users);
	const handleSubmit = () => {};
	return <div>UserInfo</div>;
};

export default UserInfo;

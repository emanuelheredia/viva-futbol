import React, { useEffect, useState } from "react";
import "./myProfile.css";
import { useSelector } from "react-redux";
import UserInfo from "./userInfo/UserInfo";
import UserProde from "./userProde/UserProde";
import { useDispatch } from "react-redux";
import { getUserDB } from "../../redux/actions/user.actions";
const MyProfile = () => {
	const { auth } = useSelector((state) => state);
	const { users } = useSelector((state) => state);
	const [accountConfirm, setAccountConfirm] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		if (users.data && users.data.accountConfirm) {
			setAccountConfirm(true);
		}
	}, [users.data]);
	useEffect(() => {
		dispatch(getUserDB(auth.data.userID));
	}, []);

	return (
		<div style={{ marginTop: "5rem" }}>
			{accountConfirm ? (
				<div>
					<UserInfo userID={auth.data.userID} />
					<UserProde />
				</div>
			) : (
				<h2 className="title-fixture-in-procces">
					Todavía no podrás acceder a esta información debido a que tu
					cuenta aun no fue confirmada
				</h2>
			)}
		</div>
	);
};

export default MyProfile;

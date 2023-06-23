import React, { useEffect, useState } from "react";
import { getAllUsersDB } from "../../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";

const Administrator = () => {
	const dispatch = useDispatch();
	const { allUsers } = useSelector((state) => state.users);
	const fixture = useSelector((state) => state.data.fixtureProde);
	const [tablaPosiciones, setTablaPosiciones] = useState([]);
	useEffect(() => {
		if (allUsers.length === 0) {
			dispatch(getAllUsersDB());
		}
	}, [allUsers]);
	console.log(allUsers);
	return <div style={{ marginTop: "5rem" }}>Administrator</div>;
};

export default Administrator;

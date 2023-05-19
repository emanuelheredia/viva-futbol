import React, { useEffect, useState } from "react";
import "./userProde.css";
import { useDispatch, useSelector } from "react-redux";
import { getFixtureProde } from "../../../actions/infoAPI.actions";
import CardEnfrentamientosProde from "./CardEnfrentamientosProde";
import { updateUserDB } from "../../../actions/user.actions";

const UserProde = () => {
	const fixture = useSelector((state) => state.data.fixtureProde);
	const { userID } = useSelector((state) => state.auth.data);
	const [prode, setProde] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFixtureProde(2023, 128, "1st Phase - 16"));
	}, []);

	const handleSubmit = () => {
		if (prode.length !== 0) {
			dispatch(updateUserDB(userID, { prode: prode }));
		}
	};
	return (
		<div className="container__allMatches">
			{fixture?.map((el, index) => (
				<CardEnfrentamientosProde
					key={index}
					match={el}
					setProde={setProde}
					prode={prode}
				/>
			))}
			<button className="btn__save-prode-db" onClick={handleSubmit}>
				Save Prode
			</button>
		</div>
	);
};

export default UserProde;

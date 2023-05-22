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
	const [fixtureNotStarted, setFixtureNotStarted] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFixtureProde(2023, 128, "1st Phase - 16"));
	}, []);
	useEffect(() => {
		const matchesNotStarted = fixture.map(
			(el) => el.fixture.status.long === "Not Started",
		);
		if (matchesNotStarted.some((el) => el === false)) {
			setFixtureNotStarted(false);
		} else {
			setFixtureNotStarted(true);
		}
	}, [fixture]);
	const handleSubmit = () => {
		if (prode.length !== 0) {
			dispatch(updateUserDB(userID, { prode: prode }));
		}
	};
	console.log(fixtureNotStarted);
	return (
		<div className="container__allMatches">
			{!fixtureNotStarted ? (
				<h4>
					No se podrán realizar mas predicciones debido a que la fecha
					inició
				</h4>
			) : (
				fixture?.map((el, index) => (
					<CardEnfrentamientosProde
						key={index}
						match={el}
						setProde={setProde}
						prode={prode}
					/>
				))
			)}
			{}
			{fixtureNotStarted && (
				<button className="btn__save-prode-db" onClick={handleSubmit}>
					Save Prode
				</button>
			)}
		</div>
	);
};

export default UserProde;

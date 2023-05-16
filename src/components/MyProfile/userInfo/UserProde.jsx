import React, { useEffect, useState } from "react";
import "./userProde.css";
import { useDispatch, useSelector } from "react-redux";
import { getFixtureProde } from "../../../actions/infoAPI.actions";
import CardEnfrentamientosProde from "./CardEnfrentamientosProde";
import { updateUserDB } from "../../../actions/user.actions";

const UserProde = () => {
	const fixture = useSelector((state) => state.data.fixtureProde);
	const { userID } = useSelector((state) => state.auth.data);
	const { data: userData } = useSelector((state) => state.users);
	const [userFixture, setUserFixture] = useState([]);
	const [prode, setProde] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFixtureProde(2023, 128, "1st Phase - 16"));
	}, []);
	useEffect(() => {
		if (userData.prode && fixture) {
			setProde(userData.prode);
			fixture.map((elem) => {
				prode.map((el) => {
					if (el.id === elem.fixture.id) {
						elem.fixture.prode = el;
					}
				});
			});
			setUserFixture(fixture);
		}
	}, [userData, fixture]);
	const handleSubmit = () => {
		if (prode.length !== 0) {
			console.log("peticion enviada");
			dispatch(updateUserDB(userID, { prode: prode }));
		}
	};
	return (
		<div className="container__allMatches">
			{userFixture?.map(
				(el, index) =>
					(index == 0 || index == 1) && (
						<CardEnfrentamientosProde
							key={index}
							match={el}
							setProde={setProde}
							prode={prode}
						/>
					),
			)}
			<button className="btn__save-prode-db" onClick={handleSubmit}>
				Save Prode
			</button>
		</div>
	);
};

export default UserProde;

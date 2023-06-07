import React, { useEffect, useState } from "react";
import "./userProde.css";
import { useDispatch, useSelector } from "react-redux";
import {
	getCurrentFixture,
	getFixtureProde,
} from "../../../redux/actions/infoAPI.actions";
import CardEnfrentamientosProde from "./CardEnfrentamientosProde";
import { updateUserProdeDB } from "../../../redux/actions/user.actions";

const UserProde = () => {
	const fixture = useSelector((state) => state.data.fixtureProde);
	const { userID } = useSelector((state) => state.auth.data);
	const { currentFixture } = useSelector((state) => state.data);
	const { data: userData } = useSelector((state) => state.users);
	const [prode, setProde] = useState([]);
	const [fixtureNotStarted, setFixtureNotStarted] = useState(true);
	const [prodeDBFinished, setProdeDBFinished] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCurrentFixture());
	}, [userID]);
	useEffect(() => {
		if (userData.prode && fixture) {
			setProdeDBFinished(
				userData.prode
					.map((elem) =>
						fixture.map((el) => el.fixture.id).includes(elem.id),
					)
					.includes(true),
			);
		}
	}, [userData.prode, fixture]);

	useEffect(() => {
		if (currentFixture?.length > 0) {
			dispatch(getFixtureProde(2023, 128, "1st Phase - 20"));
		}
	}, [currentFixture]);
	useEffect(() => {
		if (userData.prode && prodeDBFinished) {
			console.log(prodeDBFinished);
			setProde(userData.prode);
		}
	}, [userData.prode, prodeDBFinished]);
	/* 	useEffect(() => {
		const matchesNotStarted = fixture.map(
			(el) => el.fixture.status.long === "Not Started",
		);
		if (matchesNotStarted.some((el) => el === false)) {
			setFixtureNotStarted(false);
		} else {
			setFixtureNotStarted(true);
		}
	}, [fixture]);
 */ const handleSubmit = () => {
		if (prode.length !== 0) {
			dispatch(updateUserProdeDB(userID, { prode: prode }));
		}
	};
	return (
		<div>
			<h2 className="userInfo-prode-title">Mi Pronóstico</h2>
			<div className="container__allMatches">
				{!fixtureNotStarted ? (
					<h4
						style={{
							margin: "2rem",
							textAlign: "center",
							color: "red",
						}}
					>
						No se podrán realizar mas predicciones debido a que la
						fecha inició o aún no se cargó el nuevo prode
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
					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<button
							className="btn__save-prode-db"
							onClick={handleSubmit}
						>
							Save Prode
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserProde;

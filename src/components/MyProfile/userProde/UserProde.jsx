import React, { useEffect, useState } from "react";
import "./userProde.css";
import { useDispatch, useSelector } from "react-redux";
import {
	getCurrentFixture,
	getFixtureProde,
	getPreviousFixtureProde,
} from "../../../redux/actions/infoAPI.actions";
import CardEnfrentamientosProde from "./CardEnfrentamientosProde";
import { updateUserProdeDB } from "../../../redux/actions/user.actions";
import UserCountDown from "./UserCountDown";
import swal from "sweetalert";

const UserProde = () => {
	const fixture = useSelector((state) => state.data.fixtureProde);
	const previousFixture = useSelector(
		(state) => state.data.fixturePreviousProde,
	);
	const { userID } = useSelector((state) => state.auth.data);
	const { currentFixture, previousCurrentFixture } = useSelector(
		(state) => state.data,
	);
	const { data: userData } = useSelector((state) => state.users);
	const { users } = useSelector((state) => state);
	const [prode, setProde] = useState([]);
	const [fixtureNotStarted, setFixtureNotStarted] = useState(true);
	const [prodeDBFinished, setProdeDBFinished] = useState(false);
	const [showAlertSumbit, setShowAlertSumbit] = useState(false);
	const dispatch = useDispatch();
	const firstMatchDate = fixture[0]?.fixture.date;
	const lastMatchDate = fixture[fixture.length - 1]?.fixture.date;
	useEffect(() => {
		dispatch(getCurrentFixture());
	}, [userID]);
	useEffect(() => {
		if (userData.prode && fixture) {
			let fixturesIDCurrentAndPrev = fixture
				.map((el) => el.fixture.id)
				.concat(previousFixture.map((el) => el.fixture.id));
			setProde(
				userData.prode.filter((el) =>
					fixturesIDCurrentAndPrev.includes(el.id),
				),
			);
		}
	}, [userData.prode, fixture]);
	useEffect(() => {
		if (fixture.length == 0 && currentFixture?.length > 0) {
			dispatch(getFixtureProde(2023, 128, currentFixture));
		}
	}, [currentFixture]);
	useEffect(() => {
		if (previousFixture.length == 0 && previousCurrentFixture?.length > 0) {
			dispatch(
				getPreviousFixtureProde(2023, 128, previousCurrentFixture),
			);
		}
	}, [previousCurrentFixture]);
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
			dispatch(updateUserProdeDB(userID, { prode: prode }));
		}
		if (users.error === false) {
			setShowAlertSumbit(true);
		}
	};
	const showAlert = () => {
		swal({
			title: "Cambio Exitoso",
			text: "Los pronósticos se almacenaron con exito",
			icon: "success",
			button: "Aceptar",
		}).then((respuesta) => {
			if (respuesta) {
				setShowAlertSumbit(false);
			}
		});
	};
	return (
		<div>
			<h2 className="userInfo-prode-title">Mi Pronóstico</h2>
			{firstMatchDate && (
				<UserCountDown
					firstMatchDate={firstMatchDate}
					lastMatchDate={lastMatchDate}
				/>
			)}
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
			{showAlertSumbit && showAlert()}
		</div>
	);
};

export default UserProde;

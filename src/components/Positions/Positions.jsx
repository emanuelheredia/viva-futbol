import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersDB } from "../../redux/actions/user.actions";
import {
	getFixtureProde,
	getCurrentFixture,
	getPreviousFixtureProde,
} from "../../redux/actions/infoAPI.actions";
import {
	getResultadosFromFixture,
	getUserScore,
} from "../../helpers/helpFunctions";
import "./position.css";

const Positions = () => {
	const { userID } = useSelector((state) => state.auth.data);
	const { allUsers } = useSelector((state) => state.users);
	const fixture = useSelector((state) => state.data.fixtureProde);
	const previousFixture = useSelector(
		(state) => state.data.fixturePreviousProde,
	);
	const { currentFixture, previousCurrentFixture } = useSelector(
		(state) => state.data,
	);
	const [fechaFinalizada, setFechaFinalizada] = useState(true);
	const [resultadosFechaActual, setResultadosFechaActual] = useState([]);
	const [resultadosFechaAnterior, setResultadosFechaAnterior] = useState([]);

	const [tablaPosiciones, setTablaPosiciones] = useState([]);
	const { users } = useSelector((state) => state);
	const [accountConfirm, setAccountConfirm] = useState(false);
	const [showResultPreviousPositions, setshowResultPreviousPositions] =
		useState(false);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCurrentFixture());
	}, [userID]);
	useEffect(() => {
		if (users.data && users.data.accountConfirm) {
			setAccountConfirm(true);
		}
	}, [users.data]);

	useEffect(() => {
		if (allUsers.length === 0) {
			dispatch(getAllUsersDB());
		}
	}, [allUsers]);
	useEffect(() => {
		if (fixture.length === 0) {
			dispatch(getFixtureProde(2023, 128, currentFixture));
		}
	}, [currentFixture]);
	useEffect(() => {
		if (previousCurrentFixture.length === 0) {
			dispatch(
				getPreviousFixtureProde(2023, 128, previousCurrentFixture),
			);
		}
	}, [previousCurrentFixture]);
	useEffect(() => {
		const matchesFisihed = fixture.map(
			(el) =>
				el.fixture.status.long === "Match Finished" ||
				el.fixture.status.long === "Match Abandoned",
		);
		if (matchesFisihed.some((el) => el === false)) {
			setFechaFinalizada(false);
		} else {
			setFechaFinalizada(true);
		}
	}, [fixture]);
	useEffect(() => {
		if (fixture.length !== 0 && fechaFinalizada) {
			const resultadosFormateados = getResultadosFromFixture(fixture);
			setResultadosFechaActual(resultadosFormateados);
		} else {
			setResultadosFechaActual([]);
		}
	}, [fixture, fechaFinalizada]);
	useEffect(() => {
		if (showResultPreviousPositions && previousFixture.length !== 0) {
			const resultadosFormateados =
				getResultadosFromFixture(previousFixture);
			setResultadosFechaAnterior(resultadosFormateados);
		} else {
			setResultadosFechaAnterior([]);
		}
	}, [previousFixture, showResultPreviousPositions]);

	useEffect(() => {
		if (
			allUsers.length > 0 &&
			(fechaFinalizada || showResultPreviousPositions)
		) {
			let allResultsUsers = [];
			allUsers.map((user) => {
				let { totalUserScore } = getUserScore(
					user.user.prode,
					fechaFinalizada
						? resultadosFechaActual
						: resultadosFechaAnterior,
				);

				allResultsUsers.push({
					score: totalUserScore,
					userID: user.id,
					nickname: user.user.nickName,
				});
			});
			setTablaPosiciones(orderTablePositions(allResultsUsers));
		}
	}, [
		allUsers,
		resultadosFechaActual,
		resultadosFechaAnterior,
		showResultPreviousPositions,
	]);

	const orderTablePositions = (table) => {
		return table.sort((x, y) => x.score + y.score);
	};
	const compareUserID = (userIDMap, userID) => {
		if (userIDMap === userID) return "userPosition";
	};
	return accountConfirm ? (
		<div
			style={{
				marginTop: "5rem",
				display: "flex",
				justifyContent: "center",
			}}
		>
			{" "}
			{!fechaFinalizada && !showResultPreviousPositions && (
				<div className="userResult-containerFixtureInProgress">
					<h2 className="title-fixture-in-procces">
						Aun la fecha no finalizó, aguardá su conclusión para ver
						los resultados . . .
					</h2>
					<button
						onClick={() => setshowResultPreviousPositions(true)}
						className="userResults-btnSeePreviousResults"
					>
						Ver Posiciones Fecha pasada
					</button>
				</div>
			)}
			{(fechaFinalizada || showResultPreviousPositions) && (
				<div className="positions-container-table">
					<div className="positions-container-headerTable">
						<h4>Posición</h4>
						<h4>Usuario</h4>
						<h4>Puntaje</h4>
					</div>
					{tablaPosiciones.length > 0 &&
						tablaPosiciones.map((user, index) => (
							<div
								key={index}
								className={
									"positions-container-userInfo " +
									compareUserID(user.userID, userID)
								}
							>
								<h4>{index + 1}</h4>
								<h4>{user.nickname}</h4>
								<h4>{user.score}</h4>
							</div>
						))}
				</div>
			)}
		</div>
	) : (
		<h2 className="title-fixture-in-procces" style={{ marginTop: "5rem" }}>
			Todavía no podrás acceder a esta información debido a que tu cuenta
			aun no fue confirmada
		</h2>
	);
};

export default Positions;

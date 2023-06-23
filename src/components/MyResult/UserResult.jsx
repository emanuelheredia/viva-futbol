import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
	getFixtureProde,
	getCurrentFixture,
	getPreviousFixtureProde,
} from "../../redux/actions/infoAPI.actions";
import { getUserDB } from "../../redux/actions/user.actions";
import { getResultadosFromFixture } from "../../helpers/helpFunctions";
import "./userResult.css";
import CardUserResults from "./CardUserResults";

const UserResult = () => {
	const dispatch = useDispatch();
	const fixture = useSelector((state) => state.data.fixtureProde);
	const previousFixture = useSelector(
		(state) => state.data.fixturePreviousProde,
	);
	const { userID } = useSelector((state) => state.auth.data);
	const { currentFixture, previousCurrentFixture } = useSelector(
		(state) => state.data,
	);
	const userData = useSelector((state) => state.users.data);
	const [fechaFinalizada, setFechaFinalizada] = useState(true);
	const [resultadosFechaActual, setResultadosFechaActual] = useState([]);
	const [resultadosFechaAnterior, setResultadosFechaAnterior] = useState([]);
	const [showResultPreviousFixture, setshowResultPreviousFixture] =
		useState(false);
	const [totalUSerResult, setTotalUSerResult] = useState(0);
	const [accountConfirm, setAccountConfirm] = useState(false);
	const { users } = useSelector((state) => state);

	useEffect(() => {
		if (currentFixture && !currentFixture[0]) {
			dispatch(getCurrentFixture());
		}
	}, [userID]);
	useEffect(() => {
		if (users.data && users.data.accountConfirm) {
			setAccountConfirm(true);
		}
	}, [users.data]);
	useEffect(() => {
		if (fixture.length === 0) {
			dispatch(getFixtureProde(2023, 128, currentFixture));
		}
	}, [currentFixture]);
	useEffect(() => {
		if (previousCurrentFixture?.length === 0) {
			dispatch(
				getPreviousFixtureProde(2023, 128, previousCurrentFixture),
			);
		}
	}, [previousCurrentFixture]);

	useEffect(() => {
		dispatch(getUserDB(userID));
	}, []);
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
			const resultadosFormateadosCurrently =
				getResultadosFromFixture(fixture);
			setResultadosFechaActual(resultadosFormateadosCurrently);
		} else {
			setResultadosFechaActual([]);
		}
	}, [fixture, fechaFinalizada]);
	useEffect(() => {
		if (previousFixture.length !== 0) {
			const resultadosFormateadosAnterior =
				getResultadosFromFixture(previousFixture);
			setResultadosFechaAnterior(resultadosFormateadosAnterior);
		} else {
			setResultadosFechaAnterior([]);
		}
	}, [previousFixture]);
	return accountConfirm ? (
		<div className="container-all-results">
			{!fechaFinalizada && !showResultPreviousFixture && (
				<div className="userResult-containerFixtureInProgress">
					<h2 className="title-fixture-in-procces">
						Aun la fecha no finalizó, aguardá su conclusión para ver
						tus resultados . . .
					</h2>
					<button
						onClick={() => setshowResultPreviousFixture(true)}
						className="userResults-btnSeePreviousResults"
					>
						Ver Resultados Fecha pasada
					</button>
				</div>
			)}
			{(fechaFinalizada || showResultPreviousFixture) && (
				<h2 className="title-total-score">
					Puntaje Final : {totalUSerResult} pts
				</h2>
			)}
			{showResultPreviousFixture &&
				previousFixture.map((match, index) => (
					<CardUserResults
						key={index}
						resultadosFecha={resultadosFechaAnterior}
						match={match}
						userData={userData}
						setTotalUSerResult={setTotalUSerResult}
						fixture={previousFixture}
					/>
				))}
			{fechaFinalizada &&
				fixture.map((match, index) => (
					<CardUserResults
						key={index}
						resultadosFecha={resultadosFechaActual}
						match={match}
						userData={userData}
						setTotalUSerResult={setTotalUSerResult}
						fixture={fixture}
					/>
				))}
		</div>
	) : (
		<h2 className="title-fixture-in-procces" style={{ marginTop: "5rem" }}>
			Todavía no podrás acceder a esta información debido a que tu cuenta
			aun no fue confirmada
		</h2>
	);
};

export default UserResult;

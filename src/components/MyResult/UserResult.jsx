import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
	getFixtureProde,
	getCurrentFixture,
} from "../../redux/actions/infoAPI.actions";
import { getUserDB } from "../../redux/actions/user.actions";
import {
	getResultadosFromFixture,
	getUserScore,
} from "../../helpers/helpFunctions";
import "./userResult.css";

const UserResult = () => {
	const dispatch = useDispatch();
	const fixture = useSelector((state) => state.data.fixtureProde);
	const { userID } = useSelector((state) => state.auth.data);
	const { currentFixture } = useSelector((state) => state.data);
	const userData = useSelector((state) => state.users.data);
	const [fechaFinalizada, setFechaFinalizada] = useState(true);
	const [resultadosFecha, setResultadosFecha] = useState([]);
	const [userResults, setUserResults] = useState([]);
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
	console.log(currentFixture);
	useEffect(() => {
		if (fixture.length === 0) {
			dispatch(getFixtureProde(2023, 128, currentFixture[0]));
		}
	}, [currentFixture]);
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
			const resultadosFormateados = getResultadosFromFixture(fixture);
			setResultadosFecha(resultadosFormateados);
		} else {
			setResultadosFecha([]);
		}
	}, [fixture, fechaFinalizada]);
	useEffect(() => {
		let resultadoTotal = 0;
		if (userData.prode && userData.prode.length > 0 && resultadosFecha) {
			const { scoresByMatchs, totalUserScore } = getUserScore(
				userData.prode,
				resultadosFecha,
			);
			resultadoTotal = totalUserScore;
			setUserResults(scoresByMatchs);
		}
		setTotalUSerResult(resultadoTotal);
	}, [userData, fixture, resultadosFecha]);
	const getForecastSent = (matchID) => {
		const forecastFiltered = userData.prode.filter(
			(el) => el.id === matchID,
		);
		if (forecastFiltered) {
			return forecastFiltered[0];
		}
		return null;
	};
	const getSuccesForecast = (userForecast) => {
		if (!userResults[0]) {
			return;
		}
		const resultFiltered = userResults.filter(
			(el) => el.id === userForecast.id,
		)[0];
		if (!resultFiltered) {
			return;
		}
		let finalScore =
			resultFiltered.puntaje.pronosticoAcertado +
			resultFiltered.puntaje.resultadoAcertado;
		if (finalScore === 6) {
			return "forecast-all-success";
		} else if (finalScore === 3) {
			return "forecast-success";
		} else {
			return "forecast-wrong";
		}
	};
	return accountConfirm ? (
		<div className="container-all-results">
			{!fechaFinalizada && (
				<h2 className="title-fixture-in-procces">
					Aun la fecha no finalizó, aguardá su conclusión para ver tus
					resultados . . .
				</h2>
			)}
			{fechaFinalizada && (
				<h2 className="title-total-score">
					Puntaje Final : {totalUSerResult} pts
				</h2>
			)}
			{fechaFinalizada &&
				fixture.map((match, index) => (
					<div
						key={index}
						className="external-matchs-results-container"
					>
						<div className="internal-matchs-results-container">
							<div className="team-info-result-container">
								<h4>{match.teams.home.name}</h4>
								<img src={match.teams.home.logo} />
							</div>
							<div className="score-result-container">
								<h5>{match.score.fulltime.home}</h5>
								<h5>-</h5>
								<h5>{match.score.fulltime.away}</h5>
							</div>
							<div className="team-info-result-container">
								<img src={match.teams.away.logo} />
								<h4>{match.teams.away.name}</h4>
							</div>
						</div>
						{userData.prode && getForecastSent(match.fixture.id) ? (
							<div
								className={
									"pronostico-container " +
									getSuccesForecast(
										getForecastSent(match.fixture.id),
									)
								}
							>
								<h4>Tu pronóstico fue:</h4>
								<h4>
									{userData.prode &&
										getForecastSent(match.fixture.id)
											.pronostico.scoreHome}
									-
									{userData.prode &&
										getForecastSent(match.fixture.id)
											.pronostico.scoreAway}
								</h4>
							</div>
						) : (
							<h4 className="pronostico-container forecast-until">
								No registraste ningún pronostico para este
								partido
							</h4>
						)}
					</div>
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

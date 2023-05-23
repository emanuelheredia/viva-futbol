import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getFixtureProde } from "../../../actions/infoAPI.actions";
import { getUserDB } from "../../../actions/user.actions";
import "./userResult.css";

const UserResult = () => {
	const dispatch = useDispatch();
	const fixture = useSelector((state) => state.data.fixtureProde);
	const { userID } = useSelector((state) => state.auth.data);
	const userData = useSelector((state) => state.users.data);
	const [fechaFinalizada, setFechaFinalizada] = useState(true);
	const [resultadosFecha, setResultadosFecha] = useState([]);
	const [userResults, setUserResults] = useState([]);

	useEffect(() => {
		dispatch(getFixtureProde(2023, 128, "1st Phase - 16"));
	}, []);
	useEffect(() => {
		dispatch(getUserDB(userID));
	}, []);
	useEffect(() => {
		const matchesFisihed = fixture.map(
			(el) => el.fixture.status.long === "Match Finished",
		);
		if (matchesFisihed.some((el) => el === false)) {
			setFechaFinalizada(false);
		} else {
			setFechaFinalizada(true);
		}
	}, [fixture]);
	useEffect(() => {
		if (fixture.length !== 0 && fechaFinalizada) {
			const resultados = fixture.map((el) => {
				const resultadoMatch = {
					idFixture: el.fixture.id,
					idGanador: getIDTeamWinner(el),
					resultado: el.score.fulltime,
				};
				return resultadoMatch;
			});
			setResultadosFecha(resultados);
		} else {
			setResultadosFecha([]);
		}
	}, [fixture, fechaFinalizada]);
	const getIDTeamWinner = (fixture) => {
		const localTeam = fixture.teams.home;
		const visitorTeam = fixture.teams.away;
		if (localTeam.winner === null) {
			return null;
		}
		if (localTeam.winner === true) {
			return localTeam.id;
		}
		return visitorTeam.id;
	};
	const getResultByProde = (pronostico) => {
		console.log(pronostico);
		const resultadoFixtureByIDpronositco = resultadosFecha.filter(
			(el) => el.idFixture === pronostico.id,
		);
		if (resultadoFixtureByIDpronositco[0]) {
			const puntaje = {
				pronosticoAcertado: 0,
				resultadoAcertado: 0,
			};
			if (
				resultadoFixtureByIDpronositco[0].idGanador ===
				pronostico.pronostico.idGanador
			) {
				puntaje.pronosticoAcertado = 3;
			}
			if (
				resultadoFixtureByIDpronositco[0].idGanador ===
				Number(pronostico.pronostico.idGanador)
			) {
				puntaje.pronosticoAcertado = 3;
			}
			if (
				resultadoFixtureByIDpronositco[0].resultado.home ===
					Number(pronostico.pronostico.scoreHome) &&
				resultadoFixtureByIDpronositco[0].resultado.away ===
					Number(pronostico.pronostico.scoreAway)
			) {
				puntaje.resultadoAcertado = 3;
			}

			return { id: pronostico.id, puntaje };
		}
	};
	useEffect(() => {
		if (userData.prode && userData.prode.length > 0 && resultadosFecha) {
			setUserResults(userData.prode.map((el) => getResultByProde(el)));
		}
	}, [userData, resultadosFecha]);
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
		const resultFiltered = userResults.filter(
			(el) => el.id === userForecast.id,
		);
		console.log(resultFiltered);
	};

	return (
		<div style={{ marginTop: "5rem" }}>
			{!fechaFinalizada && (
				<h4>
					Aun la fecha no finalizó, aguardá su conclusión para ver tus
					resultados
				</h4>
			)}
			{!userData.prode && <h4>No se registraron pronóstico</h4>}
			{userData.prode?.length !== fixture.length && (
				<h4>No se completaron todos los pronosticos</h4>
			)}
			{fechaFinalizada &&
				fixture.map((match) => (
					<div style={{ marginLeft: "2rem", marginRight: "2rem" }}>
						<div className="result-matchs-container">
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
								className={getSuccesForecast(
									getForecastSent(match.fixture.id),
								)}
							>
								<h4>Tu pronóstico fue:</h4>
								<h4>
									{userData.prode &&
										getForecastSent(match.fixture.id) &&
										getForecastSent(match.fixture.id)
											.pronostico.scoreHome}{" "}
									-{" "}
									{userData.prode &&
										getForecastSent(match.fixture.id) &&
										getForecastSent(match.fixture.id)
											.pronostico.scoreAway}
								</h4>
							</div>
						) : (
							<h4 className="pronostico-container succes">
								No registraste ningún pronostico para este
								partido
							</h4>
						)}
					</div>
				))}
		</div>
	);
};

export default UserResult;

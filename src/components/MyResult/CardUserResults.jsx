import React, { useEffect, useState } from "react";
import { getUserScore } from "../../helpers/helpFunctions";
import "./carduserResult.css";
const CardUserResults = ({
	resultadosFecha,
	userData,
	setTotalUSerResult,
	fixture,
	match,
}) => {
	const [userResults, setUserResults] = useState([]);
	useEffect(() => {
		let userDataProde = userData.prode.filter((el) =>
			fixture.map((el) => el.fixture.id).includes(el.id),
		);
		let resultadoTotal = 0;
		if (userDataProde && userDataProde.length > 0 && resultadosFecha) {
			const { scoresByMatchs, totalUserScore } = getUserScore(
				userDataProde,
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
	return (
		<div className="external-matchs-results-container">
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
						getSuccesForecast(getForecastSent(match.fixture.id))
					}
				>
					<h4>Tu pronóstico fue:</h4>
					<h4>
						{userData.prode &&
							getForecastSent(match.fixture.id).pronostico
								.scoreHome}
						-
						{userData.prode &&
							getForecastSent(match.fixture.id).pronostico
								.scoreAway}
					</h4>
				</div>
			) : (
				<h4 className="pronostico-container forecast-until">
					No registraste ningún pronostico para este partido
				</h4>
			)}
		</div>
	);
};

export default CardUserResults;

import React, { useEffect, useState } from "react";
import "./cardEnfrentamientos.css";

const CardEnfrentamientos = ({ match }) => {
	console.log(match);
	const [score, setScore] = useState(null);
	const [matchFinish, setMatchFinish] = useState(false);
	const [matchInCourse, setMatchInCourse] = useState(false);
	const getTime = (fecha) => {
		return fecha.split("T")[1].split("-")[0];
	};
	useEffect(() => {
		if (match.fixture.status.long.toString() === "Match Finished") {
			setMatchFinish(true);
			setScore({
				home: match.score.fulltime.home,
				away: match.score.fulltime.away,
			});
		}
		if (match.fixture.status.long.toString().includes("Half")) {
			setMatchInCourse(true);
			setScore({
				home: match.goals.home,
				away: match.goals.away,
			});
		}
	}, [match.fixture.status]);
	return (
		<>
			<div className="card_container">
				<div className="card-match_background"></div>
				<div className="charter-team_container">
					<h3>{match.teams.home.name}</h3>
					<img className="logo-team" src={match.teams.home.logo} />
				</div>
				<div className="charter-center_container">
					<img className="logo_league" src={match.league.logo} />
					<div className="charter-center_container_time-score">
						<h4>{match.league.name}</h4>
						{matchFinish && (
							<div className="score_container">
								<h4>Finalizado</h4>
								<h4>{score.home + " - " + score.away}</h4>
							</div>
						)}
						{matchInCourse && (
							<div className="score_container">
								<h4>
									En curso ( '{match.fixture.status.elapsed} )
								</h4>
								<h4>{score.home + " - " + score.away}</h4>
							</div>
						)}
						{!matchFinish && !matchInCourse && (
							<h4>{getTime(match.fixture.date)}</h4>
						)}
					</div>
					<img className="logo_league" src={match.league.logo} />
				</div>
				<div className="charter-team_container">
					<img className="logo-team" src={match.teams.away.logo} />
					<h3>{match.teams.away.name}</h3>
				</div>
			</div>
		</>
	);
};

export default CardEnfrentamientos;

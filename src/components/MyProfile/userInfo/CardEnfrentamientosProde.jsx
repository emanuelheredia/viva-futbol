import React from "react";
import "./cardEnfrentamientoProde.css";
const CardEnfrentamientosProde = ({ matchNumber, match, setProde }) => {
	const getTime = (fecha) => {
		let fechaUnorder = fecha.split("T")[0].split("-");
		let date = fechaUnorder[2] + "/" + fechaUnorder[1];
		let hourUnorder = fecha.split("T")[1].split("-")[0].split(":");
		let time = hourUnorder[0] + ":" + hourUnorder[1];
		return date + "    " + time;
	};
	return (
		<div className="container__card">
			<div className="container__matchInfo">
				<div className="container__matchInfo__teams">
					<h4
						style={{
							display: "flex",
							alignItems: "center",
							gap: "5px",
						}}
					>
						{match.teams.home.name}
						<img
							className="logo__team"
							src={match.teams.home.logo}
						/>
					</h4>
					<h4>VS</h4>
					<h4
						style={{
							display: "flex",
							alignItems: "center",
							gap: "5px",
						}}
					>
						{match.teams.away.name}
						<img
							className="logo__team"
							src={match.teams.away.logo}
						/>
					</h4>
				</div>
				<h4>{getTime(match.fixture.date)}</h4>
			</div>
			<div className="pronostico__container">
				<select className="pronostico__select">
					<option>--Equipo Ganador--</option>
					<option value={match.teams.home.id}>
						{match.teams.home.name}
					</option>
					<option value={match.teams.away.id}>
						{match.teams.away.name}
					</option>
					<option>Empate</option>
				</select>
			</div>
		</div>
	);
};

export default CardEnfrentamientosProde;

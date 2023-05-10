import React from "react";

const CardEnfrentamientosProde = ({ matchNumber, match, setProde }) => {
	const getTime = (fecha) => {
		let fechaUnorder = fecha.split("T")[0].split("-");
		let date = fechaUnorder[2] + "/" + fechaUnorder[1];
		let hourUnorder = fecha.split("T")[1].split("-")[0].split(":");
		let time = hourUnorder[0] + ":" + hourUnorder[1];
		return date + " - " + time;
	};
	return (
		<div>
			<div>
				<h4>{match.teams.home.name}</h4>
				<h4>{getTime(match.fixture.date)}</h4>
				<h4>{match.teams.away.name}</h4>
			</div>
		</div>
	);
};

export default CardEnfrentamientosProde;

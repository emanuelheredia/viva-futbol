import React, { useEffect, useState } from "react";
import { getRemainTime } from "../../../helpers/countdownUtilitie";
import "./userCountDown.css";

const UserCountDown = ({ firstMatchDate, lastMatchDate }) => {
	const [remainTime, setRemainTime] = useState("");
	const [fixtureFinish, setFixtureFinish] = useState(false);
	useEffect(() => {
		if (firstMatchDate) {
			setInterval(() => {
				let t = getRemainTime(firstMatchDate);
				if (t.remainTime <= 0) {
					setRemainTime("La fecha ya Inició");
					return;
				}
				setRemainTime(
					(t.remainDays > 0 ? t.remainDays + " días, " : "") +
						t.remainHours +
						" horas, " +
						t.remainMinutes +
						" minutos, " +
						t.remainSeconds +
						" seg",
				);
			}, 1000);
		}
	}, [firstMatchDate]);
	useEffect(() => {
		const timeToFinishFixture = getRemainTime(lastMatchDate);
		if (timeToFinishFixture.remainTime < 0) {
			setFixtureFinish(true);
		}
	}, [lastMatchDate]);

	return (
		<div className="userCountdown-container">
			<h3 className="userInfo-prode-title">
				{fixtureFinish
					? "La última fecha ya finalizó, a la brevedad se cargará el prode correspondiente a la siguiente fecha"
					: remainTime !== "La fecha ya Inició" &&
					  "Inicio de la fecha en "}
				{!fixtureFinish && remainTime}
			</h3>
		</div>
	);
};

export default UserCountDown;

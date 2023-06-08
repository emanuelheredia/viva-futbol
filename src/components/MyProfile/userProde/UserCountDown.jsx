import React, { useEffect, useState } from "react";
import { getRemainTime } from "../../../helpers/countdownUtilitie";
import "./userCountDown.css";

const UserCountDown = ({ firstMatchDate }) => {
	const [remainTime, setRemainTime] = useState("");
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

	return (
		<div className="userCountdown-container">
			<h3 className="userInfo-prode-title">
				{remainTime !== "La fecha ya Inició" &&
					"Inicio de la fecha en "}
				{remainTime}
			</h3>
		</div>
	);
};

export default UserCountDown;

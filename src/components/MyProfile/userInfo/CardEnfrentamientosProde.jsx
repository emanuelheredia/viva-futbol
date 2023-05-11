import React, { useEffect, useState } from "react";
import "./cardEnfrentamientoProde.css";

const inicialStatePronostico = {
	empate: false,
	idGanador: null,
	resultado: {},
};
const inicialStateresultado = {
	local: null,
	visitante: null,
};
const getTime = (fecha) => {
	let fechaUnorder = fecha.split("T")[0].split("-");
	let date = fechaUnorder[2] + "/" + fechaUnorder[1];
	let hourUnorder = fecha.split("T")[1].split("-")[0].split(":");
	let time = hourUnorder[0] + ":" + hourUnorder[1];
	return date + "    " + time;
};
const CardEnfrentamientosProde = ({ match, setProde, prode }) => {
	const [pronostico, setPronostico] = useState(inicialStatePronostico);
	const [resultado, setResultado] = useState(inicialStateresultado);
	const [selectModificado, setselectModificado] = useState(false);
	const [disabledSave, setDisabledSave] = useState(true);
	const [editionEnable, setEditionEnable] = useState(false);
	const handleSelect = (e) => {
		if (e.target.value === "sin seleccion") {
			setselectModificado(false);
			return;
		}
		if (e.target.value === "empate") {
			setselectModificado(true);
			return setPronostico({
				...pronostico,
				empate: true,
				idGanador: null,
			});
		}
		setselectModificado(true);
		setPronostico({
			...pronostico,
			empate: false,
			idGanador: e.target.value,
		});
	};
	const handleResultado = (e) => {
		setResultado({
			...resultado,
			[e.target.id]: e.target.value,
		});
	};
	const handleSave = () => {
		const prodeFiltrado = prode.filter((el) => el.id != match.fixture.id);
		const prodeActualizado = [
			...prodeFiltrado,
			{ id: match.fixture.id, pronostico },
		];
		setProde(prodeActualizado);
		setDisabledSave(true);
		setEditionEnable(false);
	};
	useEffect(() => {
		setPronostico({ ...pronostico, resultado });
	}, [resultado]);
	useEffect(() => {
		if (!resultado.local || !resultado.visitante || !selectModificado) {
			setDisabledSave(true);
		} else if (
			pronostico.empate &&
			resultado.local !== resultado.visitante
		) {
			setDisabledSave(true);
		} else if (
			!pronostico.empate &&
			resultado.local === resultado.visitante
		) {
			setDisabledSave(true);
		} else if () {
			setDisabledSave(true);
		}
		else {
			setDisabledSave(false);
		}
	}, [pronostico.resultado, pronostico.idGanador, pronostico.empate]);

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
				<select
					className="pronostico__select"
					onChange={(e) => handleSelect(e)}
					disabled={editionEnable ? false : true}
				>
					<option value="sin seleccion">--Equipo Ganador--</option>
					<option value={match.teams.home.id}>
						{match.teams.home.name}
					</option>
					<option value={match.teams.away.id}>
						{match.teams.away.name}
					</option>
					<option value="empate">Empate</option>
				</select>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<h4>Resultado</h4>
					<div className="container__inputResultados">
						<input
							required
							type="number"
							className="inputResultados"
							placeholder="L"
							id="local"
							onChange={handleResultado}
							disabled={editionEnable ? false : true}
						/>
						<input
							required
							type="number"
							className="inputResultados"
							placeholder="V"
							id="visitante"
							onChange={handleResultado}
							disabled={editionEnable ? false : true}
						/>
					</div>
				</div>
				{!disabledSave && (
					<button onClick={handleSave} className="btn__pronostico">
						Save
					</button>
				)}
				{disabledSave && (
					<button
						onClick={() => {
							setEditionEnable(!editionEnable);
						}}
						className="btn__pronostico"
					>
						Edit
					</button>
				)}
			</div>
		</div>
	);
};

export default CardEnfrentamientosProde;

import React, { useEffect, useState } from "react";
import "./cardEnfrentamientoProde.css";
import { useSelector } from "react-redux";

const inicialStatePronostico = {
	empate: false,
	idGanador: null,
	scoreHome: null,
	scoreAway: null,
};
const getTime = (fecha) => {
	let fechaUnorder = fecha.split("T")[0].split("-");
	let date = fechaUnorder[2] + "/" + fechaUnorder[1];
	let hourUnorder = fecha.split("T")[1].split("-")[0].split(":");
	let time = hourUnorder[0] + ":" + hourUnorder[1];
	return date + "    " + time;
};
const CardEnfrentamientosProde = ({ match, setProde, prode }) => {
	const { data: userData } = useSelector((state) => state.users);
	const [pronostico, setPronostico] = useState(inicialStatePronostico);
	const [selectModificado, setselectModificado] = useState(false);
	const [defaultValuesDB, setDefaultValuesDB] = useState(false);
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
		setDefaultValuesDB(false);
	};
	const handleResultado = (e) => {
		setPronostico({
			...pronostico,
			[e.target.id]: e.target.value,
		});
		setDefaultValuesDB(false);
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
		if (userData.prode) {
			const pronosticoDB = userData.prode.filter(
				(el) => el.id === match.fixture.id,
			);
			if (pronosticoDB.length > 0) {
				const oldPronostico = pronosticoDB[0].pronostico;
				setPronostico({
					empate: oldPronostico.empate,
					idGanador: oldPronostico.idGanador,
					scoreHome: oldPronostico.scoreHome,
					scoreAway: oldPronostico.scoreAway,
				});
				setselectModificado(true);
				setDefaultValuesDB(true);
			}
		}
	}, [userData.prode]);

	useEffect(() => {
		if (
			!pronostico.scoreHome ||
			!pronostico.scoreAway ||
			!selectModificado
		) {
			setDisabledSave(true);
		} else if (pronostico.scoreHome < 0 || pronostico.scoreAway < 0) {
			setDisabledSave(true);
		} else if (
			!pronostico.empate &&
			pronostico.scoreHome === pronostico.scoreAway
		) {
			setDisabledSave(true);
		} else if (
			(Number(pronostico.idGanador) === match.teams.home.id &&
				pronostico.scoreHome < pronostico.scoreAway) ||
			(Number(pronostico.idGanador) === match.teams.away.id &&
				pronostico.scoreAway < pronostico.scoreHome)
		) {
			setDisabledSave(true);
		} else if (defaultValuesDB) {
			setDisabledSave(true);
		} else {
			setDisabledSave(false);
		}
	}, [pronostico]);
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
					value={
						(pronostico.idGanador && pronostico.idGanador) ||
						(pronostico.empate && "empate")
					}
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
							id="scoreHome"
							placeholder="L"
							onChange={handleResultado}
							defaultValue={
								pronostico.scoreHome && pronostico.scoreHome
							}
							disabled={editionEnable ? false : true}
						/>
						<input
							required
							type="number"
							className="inputResultados"
							placeholder="V"
							id="scoreAway"
							defaultValue={
								pronostico.scoreAway && pronostico.scoreAway
							}
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

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getFixtureProde } from "../../../actions/infoAPI.actions";
import { getUserDB } from "../../../actions/user.actions";

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
		const resultadoFixtureByIDpronositco = resultadosFecha.filter(
			(el) => el.idFixture === pronostico.id,
		);
		if (resultadoFixtureByIDpronositco[0]) {
			const puntaje = {
				pronosticoAcertado: 0,
				resultadoAcertado: 0,
			};
			if (
				resultadoFixtureByIDpronositco[0].idGanador === null &&
				pronostico.pronostico.idGanador === "null"
			) {
				puntaje.pronosticoAcertado = 3;
			}
			if (
				resultadoFixtureByIDpronositco[0].idGanador ===
				pronostico.pronostico.idGanador.toString()
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
			return puntaje;
		}
	};
	useEffect(() => {
		if (userData.prode && userData.prode.length > 0 && resultadosFecha) {
			setUserResults(userData.prode.map((el) => getResultByProde(el)));
		}
	}, [userData, resultadosFecha]);
	console.log(userResults);
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
		</div>
	);
};

export default UserResult;

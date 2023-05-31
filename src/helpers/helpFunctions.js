export const getResultadosFromFixture = (fixture) => {
	const resultados = fixture.map((el) => {
		const resultadoMatch = {
			idFixture: el.fixture.id,
			idGanador: getIDTeamWinner(el),
			resultado: el.score.fulltime,
		};
		return resultadoMatch;
	});
	return resultados;
};
export const getUserScore = (prode, fixtureResult) => {
	let resultadoTotal = 0;
	let userResult = prode.map((el) => getResultByProde(el, fixtureResult));
	userResult.map((el) => {
		if (el) {
			resultadoTotal +=
				el.puntaje.resultadoAcertado + el.puntaje.pronosticoAcertado;
		}
	});
	return { scoresByMatchs: userResult, totalUserScore: resultadoTotal };
};
const getResultByProde = (pronostico, resultadosFecha) => {
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
	return null;
};

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

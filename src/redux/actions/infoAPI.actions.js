import {
	GET_ALL_COUNTRIES,
	GET_ALL_COUNTRIES_ERROR,
	GET_ALL_COUNTRIES_EXITO,
	GET_ALL_MATCHS,
	GET_ALL_MATCHS_ERROR,
	GET_ALL_MATCHS_EXITO,
	GET_FIXTURE_PRODE,
	GET_FIXTURE_PRODE_ERROR,
	GET_FIXTURE_PRODE_EXITO,
	GET_TEAMS,
	GET_TEAMS_EXITO,
	GET_TEAMS_ERROR,
	GET_CURRENT_FIXTURE,
	GET_CURRENT_FIXTURE_EXITO,
	GET_CURRENT_FIXTURE_ERROR,
} from "../types";
import { helpHttp } from "../../helpers/helpHttp";
import config from "../../config";

const hoy = new Date().toISOString().split("T")[0];

export const getCountries = () => {
	return async (dispatch) => {
		dispatch(getAllCountries());
		try {
			helpHttp()
				.get("https://api-football-v1.p.rapidapi.com/v3/countries", {
					headers: {
						"x-rapidapi-host": config.HOST1,
						"x-rapidapi-key": config.KEY1,
					},
				})
				.then((res) => dispatch(getAllCountriesExito(res.response)));
		} catch (error) {
			dispatch(getAllCountriesError(error));
		}
	};
};

const getAllCountries = () => ({ type: GET_ALL_COUNTRIES });
const getAllCountriesExito = (data) => ({
	type: GET_ALL_COUNTRIES_EXITO,
	payload: data,
});
const getAllCountriesError = (msg) => ({
	type: GET_ALL_COUNTRIES_ERROR,
	payload: msg,
});

export const getMatchsDays = () => {
	return async (dispatch) => {
		dispatch(getAllMatchs());
		try {
			helpHttp()
				.get(
					"https://" +
						config.HOST1 +
						"fixtures?&date=" +
						hoy +
						"&timezone=America/Argentina/Cordoba",
					{
						headers: {
							"x-rapidapi-host": config.HOST1,
							"x-rapidapi-key": config.KEY1,
						},
					},
				)
				.then((res) => dispatch(getAllMatchsExito(res.response)));
		} catch (error) {
			dispatch(getAllMatchsError(error));
		}
	};
};

const getAllMatchs = () => ({ type: GET_ALL_MATCHS });
const getAllMatchsExito = (data) => ({
	type: GET_ALL_MATCHS_EXITO,
	payload: data,
});
const getAllMatchsError = (msg) => ({
	type: GET_ALL_MATCHS_ERROR,
	payload: msg,
});

export const getFixtureProde = (season, league, ronda = "1st Phase - 16") => {
	return async (dispatch) => {
		dispatch(getFixture());
		try {
			helpHttp()
				.get(
					"https://" +
						config.HOST1 +
						"fixtures?&season=" +
						season +
						"&league=" +
						league +
						"&round=" +
						ronda +
						"&timezone=America/Argentina/Cordoba",
					{
						headers: {
							"x-rapidapi-host": config.HOST1,
							"x-rapidapi-key": config.KEY1,
						},
					},
				)
				.then((res) => {
					const respuesta = res.response.sort(
						(x, y) => x.fixture.timestamp - y.fixture.timestamp,
					);
					dispatch(getFixtureExito(respuesta));
				});
		} catch (error) {
			dispatch(getFixtureError("Error en la aextracción fixture prode"));
		}
	};
};

const getFixture = () => ({ type: GET_FIXTURE_PRODE });
const getFixtureExito = (data) => ({
	type: GET_FIXTURE_PRODE_EXITO,
	payload: data,
});
const getFixtureError = (msg) => ({
	type: GET_FIXTURE_PRODE_ERROR,
	payload: msg,
});

export const getAllTeams = () => {
	return async (dispatch) => {
		dispatch(getTeams());
		try {
			helpHttp()
				.get("https://" + config.HOST1 + "teams?search=ARG", {
					headers: {
						"x-rapidapi-host": config.HOST1,
						"x-rapidapi-key": config.KEY1,
					},
				})
				.then((res) => {
					dispatch(getTeamsExito(res.response));
				});
		} catch (error) {
			dispatch(getTeamsError("Error en la extracción fixture prode"));
		}
	};
};

const getTeams = () => ({ type: GET_TEAMS });
const getTeamsExito = (data) => ({
	type: GET_TEAMS_EXITO,
	payload: data,
});
const getTeamsError = (msg) => ({
	type: GET_TEAMS_ERROR,
	payload: msg,
});
export const getCurrentFixture = () => {
	return async (dispatch) => {
		dispatch(getcurrentFixtureAction());
		try {
			helpHttp()
				.get(
					"https://" +
						config.HOST1 +
						"fixtures/rounds?season=2023&league=128&current=true",
					{
						headers: {
							"x-rapidapi-host": config.HOST1,
							"x-rapidapi-key": config.KEY1,
						},
					},
				)
				.then((res) => {
					dispatch(getcurrentFixtureActionExito(res.response));
				});
		} catch (error) {
			dispatch(
				getcurrentFixtureActionError(
					"Error en la extracción current fixture",
				),
			);
		}
	};
};

const getcurrentFixtureAction = () => ({ type: GET_CURRENT_FIXTURE });
const getcurrentFixtureActionExito = (data) => ({
	type: GET_CURRENT_FIXTURE_EXITO,
	payload: data,
});
const getcurrentFixtureActionError = (msg) => ({
	type: GET_CURRENT_FIXTURE_ERROR,
	payload: msg,
});

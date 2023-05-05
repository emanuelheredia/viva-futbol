import {
	GET_ALL_COUNTRIES,
	GET_ALL_COUNTRIES_ERROR,
	GET_ALL_COUNTRIES_EXITO,
	GET_ALL_MATCHS,
	GET_ALL_MATCHS_ERROR,
	GET_ALL_MATCHS_EXITO,
} from "../types";
import { helpHttp } from "../helpers/helpHttp";
import config from "../config";

const hoy = new Date().toISOString().split("T")[0];

export const getCountries = () => {
	return async (dispatch) => {
		dispatch(getAllCountries());
		try {
			helpHttp()
				.get("https://api-football-v1.p.rapidapi.com/v3/countries", {
					headers: {
						"x-rapidapi-host": config.HOST2,
						"x-rapidapi-key": config.KEY2,
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
			dispatch(getAllCountriesError(error));
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

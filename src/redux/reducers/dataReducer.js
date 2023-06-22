import {
	GET_ALL_COUNTRIES,
	GET_ALL_COUNTRIES_ERROR,
	GET_ALL_COUNTRIES_EXITO,
	GET_ALL_MATCHS,
	GET_ALL_MATCHS_EXITO,
	GET_ALL_MATCHS_ERROR,
	GET_FIXTURE_PRODE,
	GET_FIXTURE_PRODE_EXITO,
	GET_FIXTURE_PRODE_ERROR,
	GET_TEAMS,
	GET_TEAMS_EXITO,
	GET_TEAMS_ERROR,
	GET_CURRENT_FIXTURE,
	GET_CURRENT_FIXTURE_EXITO,
	GET_CURRENT_FIXTURE_ERROR,
	GET_PREVIOUS_FIXTURE_PRODE,
	GET_PREVIOUS_FIXTURE_PRODE_EXITO,
	GET_PREVIOUS_FIXTURE_PRODE_ERROR,
} from "../types/index";

const initialState = {
	countries: [],
	fixture: [],
	fixtureProde: [],
	fixturePreviousProde: [],
	teams: [],
	currentFixture: "",
	previousCurrentFixture: "",
	msg: "",
	loading: false,
	error: false,
};

export default function dataReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_COUNTRIES:
		case GET_ALL_MATCHS:
		case GET_FIXTURE_PRODE:
		case GET_TEAMS:
		case GET_CURRENT_FIXTURE:
			return {
				...state,
				loading: true,
			};
		case GET_ALL_COUNTRIES_EXITO:
			return {
				...state,
				loading: false,
				countries: action.payload,
			};
		case GET_ALL_MATCHS_EXITO:
			return {
				...state,
				loading: false,
				fixture: action.payload,
			};
		case GET_TEAMS_EXITO:
			return {
				...state,
				loading: false,
				teams: action.payload,
			};
		case GET_FIXTURE_PRODE_EXITO:
			return {
				...state,
				loading: false,
				fixtureProde: action.payload,
			};
		case GET_PREVIOUS_FIXTURE_PRODE_EXITO:
			return {
				...state,
				loading: false,
				fixturePreviousProde: action.payload,
			};
		case GET_CURRENT_FIXTURE_EXITO:
			return {
				...state,
				loading: false,
				currentFixture: action.payload.current,
				previousCurrentFixture: action.payload.previous,
			};
		case GET_ALL_COUNTRIES_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload,
			};
		case GET_ALL_MATCHS_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload,
			};
		case GET_TEAMS_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload,
			};
		case GET_FIXTURE_PRODE_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload,
			};
		case GET_PREVIOUS_FIXTURE_PRODE_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload,
			};

		case GET_CURRENT_FIXTURE_EXITO:
			return {
				...state,
				loading: false,
				error: true,
			};
		default:
			return state;
	}
}

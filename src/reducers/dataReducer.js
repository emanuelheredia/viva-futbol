import {
	GET_ALL_COUNTRIES,
	GET_ALL_COUNTRIES_ERROR,
	GET_ALL_COUNTRIES_EXITO,
	GET_ALL_MATCHS,
	GET_ALL_MATCHS_EXITO,
	GET_ALL_MATCHS_ERROR,
} from "../types/index";

const initialState = {
	countries: [],
	fixture: [],
	msg: "",
	loading: false,
	error: false,
};

export default function dataReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_COUNTRIES:
		case GET_ALL_MATCHS:
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
		default:
			return state;
	}
}

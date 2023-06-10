import {
	SIGN_IN_USER,
	SIGN_IN_USER_EXITO,
	SIGN_IN_USER_ERROR,
	SIGN_UP_USER,
	SIGN_UP_USER_ERROR,
	SIGN_UP_USER_EXITO,
	SIGN_OUT_USER,
	SIGN_OUT_USER_EXITO,
	SIGN_OUT_USER_ERROR,
} from "../types/index";

const initialState = {
	msg: {},
	loading: false,
	error: false,
	login: false,
	preRegistro: false,
	data: [],
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case SIGN_UP_USER:
		case SIGN_IN_USER:
			return {
				...state,
				error: null,
				msg: {},
				loading: true,
			};
		case SIGN_OUT_USER:
			return {
				...state,
				error: null,
				msg: {},
				loading: true,
				login: false,
				data: [],
			};
		case SIGN_UP_USER_EXITO:
			return {
				...state,
				loading: false,
				preRegistro: true,
				data: action.payload,
				error: false,
				msg: "",
			};
		case SIGN_IN_USER_EXITO:
			return {
				...state,
				loading: false,
				login: true,
				data: action.payload,
				error: false,
				msg: "",
			};
		case SIGN_OUT_USER_EXITO:
			return {
				...state,
				error: false,
				msg: {},
				loading: false,
				preRegistro: false,
				login: false,
				data: [],
			};
		case SIGN_IN_USER_EXITO:
			return {
				...state,
				loading: false,
				login: false,
				error: false,
				msg: "",
			};
		case SIGN_UP_USER_ERROR:
		case SIGN_IN_USER_ERROR:
		case SIGN_OUT_USER_ERROR:
			return {
				...state,
				loading: false,
				login: false,
				error: true,
				msg: action.payload,
			};
		default:
			return state;
	}
}

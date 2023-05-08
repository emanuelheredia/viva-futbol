import {
	SIGN_UP_USER,
	SIGN_UP_USER_ERROR,
	SIGN_UP_USER_EXITO,
} from "../types/index";

const initialState = {
	msg: {},
	loading: false,
	error: false,
	login: false,
	data: [],
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case SIGN_UP_USER:
			return {
				...state,
				error: false,
				msg: {},
				loading: true,
			};
		case SIGN_UP_USER_EXITO:
			return {
				...state,
				loading: false,
				login: true,
				data: action.payload,
				error: false,
				msg: "",
			};
		case SIGN_UP_USER_ERROR:
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

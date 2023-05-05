import {
	SIGN_UP_USER,
	SIGN_UP_USER_ERROR,
	SIGN_UP_USER_EXITO,
} from "../types/index";

const initialState = {
	msg: "",
	loading: false,
	login: false,
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case SIGN_UP_USER:
			return {
				...state,
				loading: true,
			};
		case SIGN_UP_USER_EXITO:
			return {
				...state,
				loading: false,
				login: true,
			};
		case SIGN_UP_USER_ERROR:
			return {
				...state,
				loading: false,
				login: false,
			};
		default:
			return state;
	}
}

import {
	ADD_USER_DB,
	ADD_USER_DB_EXITO,
	ADD_USER_DB_ERROR,
	UPDATE_USER_DB,
	UPDATE_USER_DB_EXITO,
	UPDATE_USER_DB_ERROR,
	GET_USER_DB,
	GET_USER_DB_EXITO,
} from "../types/index";

const initialState = {
	msg: {},
	loading: false,
	error: false,
	user: {},
	data: {},
};

export default function usersReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_USER_DB:
		case UPDATE_USER_DB:
		case GET_USER_DB:
			return {
				...state,
				error: false,
			};
		case ADD_USER_DB_EXITO:
			return {
				...state,
				error: false,
				loading: false,
			};
		case GET_USER_DB_EXITO:
			return {
				...state,
				error: false,
				loading: false,
				data: action.payload,
			};
		case UPDATE_USER_DB_EXITO:
			return {
				...state,
				error: false,
				loading: false,
			};
		case ADD_USER_DB_ERROR:
			return {
				...state,
				error: true,
				msg: action.payload,
				loading: false,
			};
		case GET_USER_DB_EXITO:
			return {
				...state,
				error: true,
				loading: false,
				msg: action.payload,
			};
		case UPDATE_USER_DB_ERROR:
			return {
				...state,
				error: true,
				msg: action.payload,
				loading: false,
			};
		default:
			return state;
	}
}

import {
	ADD_USER_DB,
	ADD_USER_DB_EXITO,
	ADD_USER_DB_ERROR,
	UPDATE_USER_DB,
	UPDATE_USER_DB_EXITO,
	UPDATE_USER_DB_ERROR,
	GET_USER_DB,
	GET_USER_DB_EXITO,
	GET_USER_DB_ERROR,
	UPDATE_USER_PRODE_DB,
	UPDATE_USER_PRODE_DB_EXITO,
	UPDATE_USER_PRODE_DB_ERROR,
	GET_ALL_USERS_DB,
	GET_ALL_USERS_DB_ERROR,
	GET_ALL_USERS_DB_EXITO,
} from "../types/index";

const initialState = {
	msg: {},
	loading: false,
	error: null,
	user: {},
	allUsers: [],
	data: {},
};

export default function usersReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_USER_DB:
		case UPDATE_USER_DB:
		case GET_USER_DB:
		case UPDATE_USER_PRODE_DB:
		case GET_ALL_USERS_DB:
			return {
				...state,
				error: null,
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
		case GET_ALL_USERS_DB_EXITO:
			return {
				...state,
				error: false,
				loading: false,
				allUsers: action.payload,
			};
		case UPDATE_USER_DB_EXITO:
			return {
				...state,
				error: false,
				loading: false,
			};
		case UPDATE_USER_PRODE_DB_EXITO:
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
		case GET_USER_DB_ERROR:
			return {
				...state,
				error: true,
				loading: false,
				msg: action.payload,
			};
		case GET_ALL_USERS_DB_ERROR:
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
		case UPDATE_USER_PRODE_DB_ERROR:
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

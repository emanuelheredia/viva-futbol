import {
	ADD_USER_DB,
	ADD_USER_DB_EXITO,
	ADD_USER_DB_ERROR,
	UPDATE_USER_DB,
	UPDATE_USER_DB_EXITO,
	UPDATE_USER_DB_ERROR,
	GET_USER_DB,
	GET_USER_DB_EXITO,
	GET_ALL_COUNTRIES_ERROR,
} from "../types/index";
import { db, coleccion } from "../firebase";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

export const addUserDB = (idUser, userEmail) => {
	return async (dispatch) => {
		dispatch(addUser());
		try {
			await setDoc(doc(db, "users", idUser), {
				email: userEmail,
			});
			dispatch(addUserExito());
		} catch (error) {
			dispatch(
				addUserError(
					"Error en la creación del perfgil inicial del ususario",
				),
			);
			console.log(error);
		}
	};
};

const addUser = () => ({
	type: ADD_USER_DB,
});
const addUserExito = () => ({
	type: ADD_USER_DB_EXITO,
});
const addUserError = (error) => ({
	type: ADD_USER_DB_ERROR,
	payload: error,
});

export const getUserDB = (userID) => {
	return async (dispatch) => {
		dispatch(getUser());
		try {
			await getDoc(doc(coleccion, userID.userID)).then((res) => {
				dispatch(getUserExito(res.data()));
			});
		} catch (error) {
			dispatch(getUserError("Error en la obtención"));
		}
	};
};

const getUser = () => ({
	type: GET_USER_DB,
});
const getUserExito = (payload) => ({
	type: GET_USER_DB_EXITO,
	payload: payload,
});
const getUserError = (error) => ({
	type: GET_ALL_COUNTRIES_ERROR,
	payload: error,
});

export const updateUserDB = (idUser, data) => {
	return async (dispatch) => {
		console.log("envio de datos");
		dispatch(updateUser());
		try {
			await updateDoc(doc(db, "users", idUser), data);
			dispatch(updateUserExito());
		} catch (error) {
			console.log("error en la actualizacion");
			dispatch(updateUserError("Error en la actualización"));
		}
	};
};

const updateUser = () => ({
	type: UPDATE_USER_DB,
});
const updateUserExito = () => ({
	type: UPDATE_USER_DB_EXITO,
});
const updateUserError = (error) => ({
	type: UPDATE_USER_DB_ERROR,
	payload: error,
});

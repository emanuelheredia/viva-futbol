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
	UPDATE_USER_PRODE_DB,
	UPDATE_USER_PRODE_DB_EXITO,
	UPDATE_USER_PRODE_DB_ERROR,
} from "../types/index";
import { db, coleccion } from "../../firebase";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

export const addUserDB = (idUser, userEmail) => {
	return async (dispatch) => {
		dispatch(addUser());
		try {
			await setDoc(doc(db, "users", idUser), {
				email: userEmail,
				name: "sin nombre",
				lastName: "sin apellido",
				nickName: "sin nick name",
				favouriteTeam: "ninguno",
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
			await getDoc(doc(coleccion, userID)).then((res) => {
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
	const { name, lastName, nickName, favouriteTeam } = data;
	return async (dispatch) => {
		console.log("envio de datos");
		dispatch(updateUser());
		try {
			await updateDoc(doc(db, "users", idUser), {
				name: name,
				lastName: lastName,
				nickName: nickName,
				favouriteTeam: favouriteTeam,
			});
			console.log("actualice");
			dispatch(updateUserExito());
		} catch (error) {
			console.log(error);
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

export const updateUserProdeDB = (idUser, data) => {
	const { prode } = data;
	return async (dispatch) => {
		console.log("envio de datos");
		dispatch(updateUserProde());
		try {
			await updateDoc(doc(db, "users", idUser), {
				prode: prode,
			});
			console.log("actualice");
			dispatch(updateUserProdeExito());
		} catch (error) {
			console.log(error);
			dispatch(updateUserProdeError("Error en la actualización"));
		}
	};
};

const updateUserProde = () => ({
	type: UPDATE_USER_PRODE_DB,
});
const updateUserProdeExito = () => ({
	type: UPDATE_USER_PRODE_DB_EXITO,
});
const updateUserProdeError = (error) => ({
	type: UPDATE_USER_PRODE_DB_ERROR,
	payload: error,
});

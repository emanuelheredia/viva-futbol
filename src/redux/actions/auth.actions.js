import {
	SIGN_UP_USER,
	SIGN_UP_USER_ERROR,
	SIGN_UP_USER_EXITO,
	SIGN_IN_USER,
	SIGN_IN_USER_EXITO,
	SIGN_IN_USER_ERROR,
	SIGN_OUT_USER,
	SIGN_OUT_USER_EXITO,
	SIGN_OUT_USER_ERROR,
} from "../types";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "../../firebase";

export const signUp = (newUser) => {
	const { email, password } = newUser;
	return async (dispatch) => {
		dispatch(signUpUser());
		try {
			const res = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			dispatch(
				signUpUserExito({
					token: res.user.accessToken,
					userID: res.user.uid,
					email: email,
				}),
			);
		} catch (error) {
			dispatch(signUpUserError(error.message));
		}
	};
};

const signUpUser = () => ({ type: SIGN_UP_USER });
const signUpUserExito = (data) => ({
	type: SIGN_UP_USER_EXITO,
	payload: data,
});
const signUpUserError = (msg) => ({
	type: SIGN_UP_USER_ERROR,
	payload: msg,
});
export const signIn = (newUser) => {
	const { email, password } = newUser;
	return async (dispatch) => {
		dispatch(signInUser());
		try {
			const res = await signInWithEmailAndPassword(auth, email, password);
			dispatch(
				signInUserExito({
					token: res.user.accessToken,
					userID: res.user.uid,
				}),
			);
		} catch (error) {
			dispatch(signInUserError(error.message));
		}
	};
};

const signInUser = () => ({ type: SIGN_IN_USER });
const signInUserExito = (data) => ({
	type: SIGN_IN_USER_EXITO,
	payload: data,
});
const signInUserError = (msg) => ({
	type: SIGN_IN_USER_ERROR,
	payload: msg,
});

export const signOutLogin = () => {
	return async (dispatch) => {
		dispatch(signOutUser());
		try {
			const res = await signOut(auth);
			dispatch(signOutUserExito());
		} catch (error) {
			dispatch(signOutUserError(error.message));
		}
	};
};

const signOutUser = () => ({ type: SIGN_OUT_USER });
const signOutUserExito = () => ({
	type: SIGN_OUT_USER_EXITO,
});
const signOutUserError = (msg) => ({
	type: SIGN_OUT_USER_ERROR,
	payload: msg,
});

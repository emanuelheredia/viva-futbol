import { SIGN_UP_USER, SIGN_UP_USER_ERROR, SIGN_UP_USER_EXITO } from "../types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

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
				}),
			);
			console.log(res);
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

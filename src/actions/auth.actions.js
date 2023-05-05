import { SIGN_UP_USER, SIGN_UP_USER_ERROR, SIGN_UP_USER_EXITO } from "../types";

export const signUp = ({ user, email }) => {
	return async (dispatch) => {
		dispatch(signUpUser());
		try {
			helpHttp()
				.get("https://api-football-v1.p.rapidapi.com/v3/countries", {
					headers: {
						"x-rapidapi-host": config.HOST2,
						"x-rapidapi-key": config.KEY2,
					},
				})
				.then((res) => dispatch(signUpUserExito(res.response)));
		} catch (error) {
			dispatch(signUpUserError(error));
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

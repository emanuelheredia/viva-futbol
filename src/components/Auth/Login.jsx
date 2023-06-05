import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp } from "../../redux/actions/auth.actions";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

const Login = () => {
	const dispatch = useDispatch();
	const [response, setResponse] = useState(null);
	const navigate = useNavigate();
	const auth = useSelector((state) => state.auth);

	const handleSubmit = (user) => {
		setResponse(null);
		dispatch(signIn(user));
	};
	useEffect(() => {
		if (auth.error && auth.msg?.includes("wrong")) {
			setResponse("Password Incorrecto");
		}
		if (auth.error && auth.msg?.includes("invalid")) {
			setResponse("Email no válido");
		}
		if (auth.error && auth.msg?.includes("found")) {
			setResponse("Email no registrado");
		}
		if (auth.login) {
			navigate("/");
		}
		setTimeout(() => {
			setResponse(null);
		}, [3000]);
	}, [auth]);

	return (
		<Form
			response={response}
			setResponse={setResponse}
			handleSubmit={handleSubmit}
			register={false}
		/>
	);
};
export default Login;

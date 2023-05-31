import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/actions/auth.actions";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { addUserDB } from "../../redux/actions/user.actions";

const Registrer = () => {
	const dispatch = useDispatch();
	const [response, setResponse] = useState(null);
	const navigate = useNavigate();
	const auth = useSelector((state) => state.auth);
	const handleSubmit = (user) => {
		setResponse(null);
		dispatch(signUp(user));
	};
	useEffect(() => {
		if (auth.error && auth.msg?.includes("in-use")) {
			setResponse("El email ya está en uso");
		}
		if (auth.error && auth.msg?.includes("invalid")) {
			setResponse("El email ingresado no es válido");
		}
		if (auth.error && auth.msg?.includes("weak")) {
			setResponse("La contraseña debe ser mayor a 5 dígitos");
		}
		if (auth.login) {
			setResponse("Registro Exitoso");
			setTimeout(() => {
				navigate("/");
			}, [2000]);
		}
	}, [auth]);

	useEffect(() => {
		if (auth.data.userID) {
			dispatch(addUserDB(auth.data.userID, auth.data.email));
		}
	}, [auth]);

	return (
		<Form
			response={response}
			handleSubmit={handleSubmit}
			register={true}
			setResponse={setResponse}
		/>
	);
};

export default Registrer;

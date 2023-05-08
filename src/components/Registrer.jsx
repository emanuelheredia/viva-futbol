import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../actions/auth.actions";
import { useNavigate } from "react-router-dom";
import "./registrer.css";
const initialState = {
	email: "",
	password: "",
};

const Registrer = () => {
	const dispatch = useDispatch();
	const [response, setResponse] = useState(null);
	const [newUser, setNewUser] = useState(initialState);
	const navigate = useNavigate();
	const auth = useSelector((state) => state.auth);
	const handleChange = (e) => {
		e.preventDefault();
		setNewUser({
			...newUser,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setResponse(null);
		dispatch(signUp(newUser));
	};
	console.log(response);
	useEffect(() => {
		console.log(auth);
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

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="email">Email</label>
			<input
				name="email"
				type="email"
				placeholder="Ingresá tu email"
				onChange={handleChange}
			/>
			<label htmlFor="password">Password</label>
			<input
				name="password"
				type="password"
				placeholder="Ingresá un password"
				onChange={handleChange}
			/>
			<button>Registrar</button>
			{auth.loading && <p>Procesando..</p>}
			{response && (
				<p
					className={
						auth.error ? "error-message" : "register-success"
					}
				>
					{response}
				</p>
			)}
		</form>
	);
};

export default Registrer;

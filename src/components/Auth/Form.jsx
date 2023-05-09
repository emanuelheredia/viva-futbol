import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./form.css";
const initialState = {
	email: "",
	password: "",
};
const Form = ({ response, setResponse, handleSubmit, register }) => {
	const auth = useSelector((state) => state.auth);
	const [user, setUser] = useState(initialState);

	const handleSubmitForm = (e) => {
		e.preventDefault();
		handleSubmit(user);
	};

	const handleChange = (e) => {
		e.preventDefault();
		setResponse(null);
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<form className="form" onSubmit={handleSubmitForm}>
			<div className="form-container">
				<div className="form_background"></div>
				<div className="form-campos">
					<label htmlFor="email">Email</label>
					<input
						name="email"
						type="email"
						id="email"
						placeholder="Ingresá tu email"
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-campos">
					<label htmlFor="password">Password</label>
					<input
						required
						id="password"
						name="password"
						type="password"
						placeholder={
							register
								? "Ingresá un password"
								: "Ingresá tu password"
						}
						onChange={handleChange}
					/>
				</div>
				<button className="form-boton">
					{register ? "Registrar" : "Loguear"}
				</button>
				{auth.loading && <p>Procesando..</p>}
				{response && (
					<p
						className={
							auth.error
								? "form_response-message backgroundError"
								: "form_response-message backgroundSucces"
						}
					>
						{response}
					</p>
				)}
			</div>
		</form>
	);
};

export default Form;

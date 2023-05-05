import React, { useState } from "react";

const initialState = {
	email: "",
	password: "",
};

const Registrer = () => {
	const [newUser, setNewUser] = useState(initialState);

	const handleChange = (e) => {
		e.preventDefault();
		setNewUser({
			...newUser,
			[e.target.name]: e.target.value,
		});
	};
	console.log(newUser);
	return (
		<form>
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
		</form>
	);
};

export default Registrer;

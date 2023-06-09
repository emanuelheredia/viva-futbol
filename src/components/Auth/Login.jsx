import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/actions/auth.actions";
import { useNavigate } from "react-router-dom";
import { signOutLogin } from "../../redux/actions/auth.actions";
import Form from "./Form";
import swal from "sweetalert";

const Login = () => {
	const dispatch = useDispatch();
	const [showAlertSumbit, setShowAlertSumbit] = useState(false);
	const { users } = useSelector((state) => state);

	const navigate = useNavigate();
	const auth = useSelector((state) => state.auth);

	const handleSubmit = (user) => {
		dispatch(signOutLogin());
		dispatch(signIn(user));
	};
	useEffect(() => {
		console.log("entre");
		if (auth.error && auth.msg?.includes("wrong")) {
			showAlert(
				"Password Incorrecto",
				"El password que ingresaste no es válido",
				"warning",
			);
		}
		if (auth.error && auth.msg?.includes("invalid")) {
			showAlert(
				"Email Incorrecto",
				"El email que ingresaste no es válido",
				"warning",
			);
		}
		if (auth.error && auth.msg?.includes("found")) {
			showAlert(
				"Email Incorrecto",
				"El email que ingresaste no está registrado",
				"warning",
			);
		}
		if (auth.login) {
			navigate("/");
		}
	}, [auth.error]);
	console.log(auth);
	const showAlert = (title, text, icon) => {
		setShowAlertSumbit(true);
		swal({
			title: title,
			text: text,
			icon: icon,
			button: "Aceptar",
		}).then((respuesta) => {
			if (respuesta) {
				setShowAlertSumbit(false);
			}
		});
	};

	return (
		<div>
			<Form register={false} handleSubmit={handleSubmit} />
		</div>
	);
};
export default Login;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/actions/auth.actions";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import swal from "sweetalert";

const Login = () => {
	const dispatch = useDispatch();
	const [showAlertSumbit, setShowAlertSumbit] = useState(false);
	const [msgSwap, setMsgSwap] = useState({});
	const [showSpinner, setShowSpinner] = useState(false);
	const [resetPass, setResetPass] = useState(false);
	const navigate = useNavigate();
	const auth = useSelector((state) => state.auth);

	const handleSubmit = (user) => {
		dispatch(signIn(user));
		setShowSpinner(true);
		setTimeout(() => {
			setShowAlertSumbit(true);
			setShowSpinner(false);
		}, 1000);
	};
	useEffect(() => {
		if (auth.error && auth.msg?.includes("wrong")) {
			setMsgSwap({
				title: "Password Incorrecto",
				text: "El password que ingresaste no es válido",
				icon: "warning",
			});
		}
		if (auth.error && auth.msg?.includes("invalid")) {
			setMsgSwap({
				title: "Email Incorrecto",
				text: "El email que ingresaste no es válido",
				icon: "warning",
			});
		}
		if (auth.error && auth.msg?.includes("found")) {
			setMsgSwap({
				title: "Email Incorrecto",
				text: "El email que ingresaste no está registrado",
				icon: "warning",
			});
		}
		if (auth.error && auth.msg?.includes("temporarily disabled")) {
			setMsgSwap({
				title: "Login Bloqueado",
				text: "Ingresaste varias veces un password incorrecto. Contactate con el administrador para pedir el desbloqueo",
				icon: "warning",
			});
		}
		if (auth.error && auth.msg?.includes("request-failed")) {
			setMsgSwap({
				title: "Error de Servidor",
				text: "En este momento estamos teniendo inconveninetes con un servidor externo, por favor intentá en unos minutos",
				icon: "warning",
			});
		}
		if (resetPass) {
			setShowAlertSumbit(true);
			setMsgSwap({
				title: "Solicitud",
				text: "Por favor, ponte en contacto con el administrador para reestablecer tu contraseña ",
				icon: "warning",
			});
		}
		if (auth.login) {
			setShowAlertSumbit(false);
			navigate("/");
			setShowSpinner(false);
		}
	}, [auth, resetPass]);
	console.log(auth);
	const showAlert = ({ title, text, icon }) => {
		swal({
			title: title,
			text: text,
			icon: icon,
			button: "Aceptar",
		}).then((respuesta) => {
			if (respuesta) {
				setShowAlertSumbit(false);
				setMsgSwap({});
				setResetPass(false);
			}
		});
	};

	return (
		<div>
			<Form
				register={false}
				handleSubmit={handleSubmit}
				showSpinner={showSpinner}
				setResetPass={setResetPass}
			/>
			{showAlertSumbit && showAlert(msgSwap)}
		</div>
	);
};
export default Login;

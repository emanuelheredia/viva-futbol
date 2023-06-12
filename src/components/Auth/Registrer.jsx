import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutLogin, signUp } from "../../redux/actions/auth.actions";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { addUserDB } from "../../redux/actions/user.actions";
import swal from "sweetalert";

const Registrer = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const auth = useSelector((state) => state.auth);
	const [showAlertSumbit, setShowAlertSumbit] = useState(false);
	const [msgSwap, setMsgSwap] = useState({});
	const handleSubmit = (user) => {
		dispatch(signUp(user));
		setTimeout(() => {
			setShowAlertSumbit(true);
		}, 1000);
	};
	useEffect(() => {
		if (auth.error && auth.msg?.includes("in-use")) {
			setMsgSwap({
				title: "Email Incorrecto",
				text: "El email ya está en uso",
				icon: "warning",
			});
		}
		if (auth.error && auth.msg?.includes("invalid")) {
			setMsgSwap({
				title: "Email Incorrecto",
				text: "El email no es válido",
				icon: "warning",
			});
		}
		if (auth.error && auth.msg?.includes("weak")) {
			setMsgSwap({
				title: "Password Incorrecto",
				text: "EL password debe contener más de 6 digitos",
				icon: "warning",
			});
		}
		if (auth.preRegistro) {
			setMsgSwap({
				title: "Exitoso",
				text: "El pre-registro fue exitoso, aguarda la autorización para acceder a todas las funcionalidades. Te redireccionaremos al login",
				icon: "success",
			});
		}
	}, [auth]);

	useEffect(() => {
		if (auth.data.userID) {
			dispatch(addUserDB(auth.data.userID, auth.data.email));
		}
	}, [auth]);
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
				if (title === "Exitoso") {
					dispatch(signOutLogin());
					navigate("/login");
				}
			}
		});
	};
	return (
		<div>
			<Form handleSubmit={handleSubmit} register={true} />
			{showAlertSumbit && showAlert(msgSwap)}
		</div>
	);
};

export default Registrer;

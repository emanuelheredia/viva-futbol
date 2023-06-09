import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/actions/auth.actions";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { addUserDB } from "../../redux/actions/user.actions";
import swal from "sweetalert";

const Registrer = () => {
	const dispatch = useDispatch();
	const [response, setResponse] = useState(null);
	const navigate = useNavigate();
	const auth = useSelector((state) => state.auth);
	const [showAlertSumbit, setShowAlertSumbit] = useState(false);
	const handleSubmit = (user) => {
		dispatch(signUp(user));
	};
	useEffect(() => {
		if (auth.error && auth.msg?.includes("in-use")) {
			showAlert("Email Incorrecto", "El email ya está en uso", "warning");
		}
		if (auth.error && auth.msg?.includes("invalid")) {
			showAlert("Email Incorrecto", "El email no es válido", "warning");
		}
		if (auth.error && auth.msg?.includes("weak")) {
			showAlert(
				"Password Incorrecto",
				"EL password debe contener más de 6 digitos",
				"warning",
			);
		}
		if (auth.login) {
			showAlert(
				"Exitoso",
				"El pre-registro fue exitos, aguarda la autorización para acceder a todas las funcionalidades",
				"success",
			);
		}
	}, [auth]);

	useEffect(() => {
		if (auth.data.userID) {
			dispatch(addUserDB(auth.data.userID, auth.data.email));
		}
	}, [auth]);
	const showAlert = (title, text, icon) => {
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
			<Form handleSubmit={handleSubmit} register={true} />
		</div>
	);
};

export default Registrer;

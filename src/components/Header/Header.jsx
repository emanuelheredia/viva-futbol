import React from "react";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { signOutLogin } from "../../redux/actions/auth.actions";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogOut = (e) => {
		dispatch(signOutLogin());
		navigate("/login");
	};
	const goToProfile = (e) => {
		navigate("/my-profile");
	};
	const goToResult = (e) => {
		navigate("/my-results");
	};
	const goToPositions = (e) => {
		navigate("/positions");
	};
	return (
		<div className="header-container">
			<button onClick={handleLogOut}>Log out</button>
			<button onClick={goToProfile}>Mi Perfil</button>
			<button onClick={goToResult}>Mis Resultados</button>
			<button onClick={goToPositions}>Posiciones</button>
		</div>
	);
};

export default Header;

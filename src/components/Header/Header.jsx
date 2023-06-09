import React from "react";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { signOutLogin } from "../../redux/actions/auth.actions";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logoHeader.jpeg";

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
	const goToHome = (e) => {
		navigate("/");
	};
	return (
		<div className="header-container">
			<img src={Logo} alt="logo" className="header-logo" />
			<nav className="header-linksContainer">
				<a onClick={goToHome}>Inicio</a>
				<a onClick={goToProfile}>Mi Perfil</a>
				<a onClick={goToResult}>Mis Resultados</a>
				<a onClick={goToPositions}>Posiciones</a>
				<a onClick={handleLogOut}>Log out</a>
			</nav>
		</div>
	);
};

export default Header;

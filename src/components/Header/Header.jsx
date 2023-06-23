import React, { useEffect, useState } from "react";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { signOutLogin } from "../../redux/actions/auth.actions";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logoHeader.jpeg";
import { getUserDB } from "../../redux/actions/user.actions";

const Header = () => {
	const [admin, setAdmin] = useState(false);
	const auth = useSelector((state) => state.auth);
	const { users } = useSelector((state) => state);
	useEffect(() => {
		dispatch(getUserDB(auth.data.userID));
	}, [auth]);
	useEffect(() => {
		if (users.data.admin) {
			setAdmin(true);
		} else {
			setAdmin(false);
		}
	}, [auth, users]);
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
	const goToAdmin = (e) => {
		navigate("/admin");
	};

	return (
		<div className="header-container">
			<img src={Logo} alt="logo" className="header-logo" />
			{auth.data.token && (
				<nav className="header-linksContainer">
					<a onClick={goToHome}>Inicio</a>
					<a onClick={goToProfile}>Mi Perfil</a>
					<a onClick={goToResult}>Mis Resultados</a>
					<a onClick={goToPositions}>Posiciones</a>
					{admin && <a onClick={goToAdmin}>Admin</a>}
					<a onClick={handleLogOut}>Log Out</a>
				</nav>
			)}
		</div>
	);
};

export default Header;

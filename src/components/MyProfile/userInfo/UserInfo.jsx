import React, { useEffect, useState } from "react";
import "./userInfo.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDB } from "../../../actions/user.actions";
import { updateUserDB } from "../../../actions/user.actions";
import { getAllTeams } from "../../../actions/infoAPI.actions";
import checkIcon from "../../../assets/check.png";
import editIcon from "../../../assets/edit.png";

import Select from "react-select";

const initialUser = {
	name: "",
	lastName: "",
	nickName: "",
	favouriteTeam: "",
};
const initialUserEdit = {
	name: false,
	lastName: false,
	nickName: false,
	favouriteTeam: false,
};
const UserInfo = ({ userID }) => {
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state);
	const { data } = useSelector((state) => state);
	const [user, setUser] = useState(initialUser);
	const [edit, setEdit] = useState(initialUserEdit);
	const [teamsName, setTeamsName] = useState([]);
	const [showSaveBTN, setShowSaveBTN] = useState(false);
	useEffect(() => {
		dispatch(getUserDB(userID));
		dispatch(getAllTeams());
	}, []);
	useEffect(() => {
		setUser({
			name: users.data.name,
			lastName: users.data.lastName,
			nickName: users.data.nickName,
			favouriteTeam: users.data.favouriteTeam,
		});
	}, [users]);
	useEffect(() => {
		if (data.teams) {
			setTeamsName(
				data.teams.map((el) => {
					return {
						label: el.team.name,
						value: el.team.name,
						id: el.team.id,
						logo: el.team.logo,
					};
				}),
			);
		}
	}, [data.teams]);
	useEffect(() => {
		if (
			(users.data.name !== user.name ||
				users.data.lastName !== user.lastName ||
				users.data.nickName !== user.nickName ||
				users.data.favouriteTeam !== user.favouriteTeam) &&
			!Object.values(edit).some((el) => el === true)
		) {
			setShowSaveBTN(true);
		} else {
			setShowSaveBTN(false);
		}
	}, [user, edit]);
	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateUserDB(userID, user));
		dispatch(getUserDB(userID));
	};
	const handleEdit = (e) => {
		e.preventDefault();
		setEdit({ ...edit, [e.target.name]: !edit[e.target.name] });
	};
	const handleChangeSelect = (e) => {
		setUser({ ...user, favouriteTeam: e });
	};
	return (
		<div>
			<h2 className="userInfo-misDatos-title">Mis Datos</h2>
			<form
				onSubmit={handleSubmit}
				className="userInfo-contenedor-formulario"
			>
				<div className="userInfo-contenedor-input">
					<label htmlFor="name">Nombre: </label>
					{edit.name ? (
						<div className="userInfo-contenedor-input-info">
							<input
								name="name"
								type="text"
								defaultValue={user.name}
								onChange={handleChange}
							/>
							<img
								src={checkIcon}
								className="userInfo-icon-check-edit"
								name="name"
								onClick={handleEdit}
							/>
						</div>
					) : (
						<div className="userInfo-contenedor-input-info">
							<h4>{user.name.toUpperCase()}</h4>
							<img
								className="userInfo-icon-check-edit"
								name="name"
								onClick={handleEdit}
								src={editIcon}
							/>
						</div>
					)}
				</div>
				<div className="userInfo-contenedor-input">
					<label htmlFor="lastName">Apellido: </label>
					{edit.lastName ? (
						<div className="userInfo-contenedor-input-info">
							<input
								name="lastName"
								type="text"
								defaultValue={user.lastName}
								onChange={handleChange}
							/>
							<img
								src={checkIcon}
								className="userInfo-icon-check-edit"
								name="lastName"
								onClick={handleEdit}
							/>
						</div>
					) : (
						<div className="userInfo-contenedor-input-info">
							<h4>{user.lastName.toUpperCase()}</h4>
							<img
								className="userInfo-icon-check-edit"
								name="lastName"
								onClick={handleEdit}
								src={editIcon}
							/>
						</div>
					)}
				</div>
				<div className="userInfo-contenedor-input">
					<label htmlFor="nickname">Nickname: </label>
					{edit.nickName ? (
						<div className="userInfo-contenedor-input-info">
							<input
								name="nickName"
								type="text"
								defaultValue={user.nickName}
								onChange={handleChange}
							/>
							<img
								src={checkIcon}
								className="userInfo-icon-check-edit"
								name="nickName"
								onClick={handleEdit}
							/>
						</div>
					) : (
						<div className="userInfo-contenedor-input-info">
							<h4>{user.nickName.toUpperCase()}</h4>
							<img
								className="userInfo-icon-check-edit"
								name="nickName"
								onClick={handleEdit}
								src={editIcon}
							/>
						</div>
					)}
				</div>
				<div className="userInfo-contenedor-input">
					<label htmlFor="favouriteTeam">Equipo: </label>
					{edit.favouriteTeam ? (
						<div className="userInfo-contenedor-input-info">
							<Select
								name="favouriteTeam"
								className="userInfo-teamSelect"
								placeholder={
									user.favouriteTeam?.label || "Tu equipo"
								}
								options={teamsName}
								type="text"
								onChange={handleChangeSelect}
							/>
							<img
								src={checkIcon}
								className="userInfo-icon-check-edit"
								name="favouriteTeam"
								onClick={handleEdit}
							/>
						</div>
					) : (
						<div className="userInfo-contenedor-input-info">
							<h4>{user.favouriteTeam?.label}</h4>
							<img
								style={{ width: "30px" }}
								src={user.favouriteTeam?.logo}
							/>
							<img
								className="userInfo-icon-check-edit"
								name="favouriteTeam"
								onClick={handleEdit}
								src={editIcon}
							/>
						</div>
					)}
				</div>
				{showSaveBTN && (
					<button
						className="userInfo-btn-save"
						onClick={handleSubmit}
					>
						Almacenar Cambios
					</button>
				)}
			</form>
		</div>
	);
};

export default UserInfo;

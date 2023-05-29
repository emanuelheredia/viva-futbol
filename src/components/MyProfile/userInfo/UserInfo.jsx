import React, { useEffect, useState } from "react";
import "./userInfo.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDB } from "../../../actions/user.actions";
import { updateUserDB } from "../../../actions/user.actions";
import { getAllTeams } from "../../../actions/infoAPI.actions";
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
			users.data.name !== user.name ||
			users.data.lastName !== user.lastName ||
			users.data.nickName !== user.nickName ||
			users.data.favouriteTeam !== user.favouriteTeam
		) {
			setShowSaveBTN(true);
		} else {
			setShowSaveBTN(false);
		}
	}, [user]);
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
	console.log(user);
	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="userInfo-contenedor-formulario"
			>
				<div className="userInfo-contenedor-input">
					<label htmlFor="name">Nombre: </label>
					{edit.name ? (
						<div>
							<input
								name="name"
								type="text"
								defaultValue={user.name}
								onChange={handleChange}
							/>
							<button name="name" onClick={handleEdit}>
								ok
							</button>
						</div>
					) : (
						<div>
							<h4>{user.name}</h4>
							<button name="name" onClick={handleEdit}>
								Edit
							</button>
						</div>
					)}
				</div>
				<div className="userInfo-contenedor-input">
					<label htmlFor="lastName">Apellido: </label>
					{edit.lastName ? (
						<div>
							<input
								name="lastName"
								type="text"
								defaultValue={user.lastName}
								onChange={handleChange}
							/>
							<button name="lastName" onClick={handleEdit}>
								ok
							</button>
						</div>
					) : (
						<div>
							<h4>{user.lastName}</h4>
							<button name="lastName" onClick={handleEdit}>
								Edit
							</button>
						</div>
					)}
				</div>
				<div className="userInfo-contenedor-input">
					<label htmlFor="nickname">Nickname: </label>
					{edit.nickName ? (
						<div>
							<input
								name="nickName"
								type="text"
								defaultValue={user.nickName}
								onChange={handleChange}
							/>
							<button name="nickName" onClick={handleEdit}>
								ok
							</button>
						</div>
					) : (
						<div>
							<h4>{user.nickName}</h4>
							<button name="nickName" onClick={handleEdit}>
								Edit
							</button>
						</div>
					)}
				</div>
				<div className="userInfo-contenedor-input">
					<label htmlFor="favouriteTeam">Equipo Favorito: </label>
					{edit.favouriteTeam ? (
						<div>
							<Select
								name="favouriteTeam"
								className="userInfo-teamSelect"
								options={teamsName}
								type="text"
								onChange={handleChangeSelect}
							/>
							<button name="favouriteTeam" onClick={handleEdit}>
								ok
							</button>
						</div>
					) : (
						<div>
							<h4>{user.favouriteTeam?.label}</h4>
							<button name="favouriteTeam" onClick={handleEdit}>
								Edit
							</button>
						</div>
					)}
				</div>
				{showSaveBTN && (
					<button onClick={handleSubmit}>Almacenar Cambios</button>
				)}
			</form>
		</div>
	);
};

export default UserInfo;

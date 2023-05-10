import React, { useEffect, useState } from "react";
import "./userProde.css";
import { useDispatch, useSelector } from "react-redux";
import { getFixtureProde } from "../../../actions/infoAPI.actions";
import CardEnfrentamientosProde from "./CardEnfrentamientosProde";

const initialState = [
	{
		1: {
			empate: false,
			idGanador: "default",
			resultado: { ganador: "default", perdedor: "default" },
		},
	},
	{
		2: {
			empate: false,
			idGanador: "default",
			resultado: { ganador: "default", perdedor: "default" },
		},
	},
	{
		3: {
			empate: false,
			idGanador: "default",
			resultado: { ganador: "default", perdedor: "default" },
		},
	},
	{
		4: {
			empate: false,
			idGanador: "default",
			resultado: { ganador: "default", perdedor: "default" },
		},
	},
	{
		5: {
			empate: false,
			idGanador: "default",
			resultado: { ganador: "default", perdedor: "default" },
		},
	},
	{
		6: {
			empate: false,
			idGanador: "default",
			resultado: { ganador: "default", perdedor: "default" },
		},
	},
	{
		7: {
			empate: false,
			idGanador: "default",
			resultado: { ganador: "default", perdedor: "default" },
		},
	},
	{
		8: {
			empate: false,
			idGanador: "default",
			resultado: { ganador: "default", perdedor: "default" },
		},
	},
	{
		9: {
			empate: false,
			idGanador: "default",
			resultado: { ganador: "default", perdedor: "default" },
		},
	},
	{
		10: {
			empate: false,
			idGanador: "default",
			resultado: { ganador: "default", perdedor: "default" },
		},
	},
	{
		11: {
			empate: false,
			idGanador: "default",
			resultado: { ganador: "default", perdedor: "default" },
		},
	},
	{
		12: {
			empate: false,
			idGanador: "default",
			resultado: { ganador: "default", perdedor: "default" },
		},
	},
	{
		13: {
			empate: false,
			idGanador: "default",
			resultado: { ganador: "default", perdedor: "default" },
		},
	},
	{
		14: {
			empate: false,
			idGanador: "default",
			resultado: { ganador: "default", perdedor: "default" },
		},
	},
];

const UserProde = () => {
	let { fixtureProde } = useSelector((state) => state.data);
	fixtureProde.sort((x, y) => x.fixture.timestamp - y.fixture.timestamp);
	console.log(fixtureProde);
	const [prode, setProde] = useState(initialState);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getFixtureProde(2023, 128, "1st Phase - 16"));
	}, []);
	console.log(fixtureProde);
	return (
		<div>
			{fixtureProde?.map((el, index) => (
				<CardEnfrentamientosProde
					key={index}
					matchNumber={index}
					match={el}
					setProde={setProde}
				/>
			))}
		</div>
	);
};

export default UserProde;

import React, { useEffect, useState } from "react";
import "./userProde.css";
import { useDispatch, useSelector } from "react-redux";
import { getFixtureProde } from "../../../actions/infoAPI.actions";
import CardEnfrentamientosProde from "./CardEnfrentamientosProde";

const UserProde = () => {
	let { fixtureProde } = useSelector((state) => state.data);
	fixtureProde.sort((x, y) => x.fixture.timestamp - y.fixture.timestamp);
	const [prode, setProde] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getFixtureProde(2023, 128, "1st Phase - 16"));
	}, []);
	console.log(prode);
	return (
		<div className="container__allMatches">
			{fixtureProde?.map((el, index) => (
				<CardEnfrentamientosProde
					key={index}
					match={el}
					setProde={setProde}
					prode={prode}
				/>
			))}
		</div>
	);
};

export default UserProde;

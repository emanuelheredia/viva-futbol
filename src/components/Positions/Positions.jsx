import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersDB } from "../../redux/actions/user.actions";
import { getFixtureProde } from "../../redux/actions/infoAPI.actions";
import {
	getResultadosFromFixture,
	getUserScore,
} from "../../helpers/helpFunctions";

const Positions = () => {
	const { userID } = useSelector((state) => state.auth.data);
	const { allUsers } = useSelector((state) => state.users);
	const fixture = useSelector((state) => state.data.fixtureProde);
	const [fechaFinalizada, setFechaFinalizada] = useState(true);
	const [resultadosFecha, setResultadosFecha] = useState([]);
	const [tablaPosiciones, setTablaPosiciones] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllUsersDB());
	}, []);
	useEffect(() => {
		if (fixture.length === 0) {
			dispatch(getFixtureProde(2023, 128, "1st Phase - 16"));
		}
	}, []);
	useEffect(() => {
		const matchesFisihed = fixture.map(
			(el) => el.fixture.status.long === "Match Finished",
		);
		if (matchesFisihed.some((el) => el === false)) {
			setFechaFinalizada(false);
		} else {
			setFechaFinalizada(true);
		}
	}, [fixture]);
	useEffect(() => {
		if (fixture.length !== 0 && fechaFinalizada) {
			const resultadosFormateados = getResultadosFromFixture(fixture);
			setResultadosFecha(resultadosFormateados);
		} else {
			setResultadosFecha([]);
		}
	}, [fixture, fechaFinalizada]);
	useEffect(() => {
		if (allUsers.length > 0 && fechaFinalizada) {
			allUsers.map((user) => {
				let { totalUserScore } = getUserScore(
					user.user.prode,
					resultadosFecha,
				);
				console.log(totalUserScore, user.id);
			});
		}
	}, []);

	return <div style={{ marginTop: "5rem" }}>Positions</div>;
};

export default Positions;

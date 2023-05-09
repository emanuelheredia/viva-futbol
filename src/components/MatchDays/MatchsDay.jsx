import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getMatchsDays } from "../../actions";
import "./matchDays.css";
import CardEnfrentamientos from "./CardEnfrentamientos/CardEnfrentamientos";

const leagues = [
	{ name: "Libertadores", id: 13, season: 2023 },
	{ name: "Champions League", id: 2, season: 2023 },
	{ name: "Liga Argentina", id: 128, season: 2023 },
	{ name: "Copa Argentina", id: 130, season: 2023 },
	{ name: "Premier", id: 39, season: 2022 },
	{ name: "La Liga", id: 140, season: 2022 },
	{ name: "Francia", id: 61, season: 2022 },
	{ name: "Italia", id: 135, season: 2022 },
];

const MatchsDay = () => {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.data);
	const [matchs, setMatchs] = useState(null);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		dispatch(getMatchsDays());
	}, []);

	useEffect(() => {
		if (data.fixture?.length > 0) {
			const filterMatchs = data.fixture.filter((el) =>
				leagues.map((el) => el.id).includes(el.league.id),
			);
			setMatchs(filterMatchs);
		}
	}, [data.fixture]);
	useEffect(() => {
		setLoading(data.loading);
	}, [data.loading]);

	return (
		<>
			<div className="matchs_container">
				{loading && <h3>Cargando...</h3>}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginBottom: "2rem",
					}}
				>
					<h2 className="title-page">Partidos del día</h2>
				</div>
				{matchs &&
					matchs.map((el, index) => (
						<CardEnfrentamientos key={index} match={el} />
					))}
			</div>
		</>
	);
};

export default MatchsDay;

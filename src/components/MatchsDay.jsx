import React, { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { helpHttp } from "../helpers/helpHttp";

const MatchsDay = () => {
	useEffect(() => {
		helpHttp()
			.get("https://v3.football.api-sports.io/fixtures?live=all", {
				headers: {
					"x-rapidapi-host": "v3.football.api-sports.io/fixtures",
					"x-rapidapi-key": "ade7e608974785d904f1667d4aa56ff8",
				},
			})
			.then((res) =>
				console.log(res.response.map((el) => console.log(el.teams))),
			);
	}, []);

	return (
		<>
			<h2>MatchsDay</h2>
		</>
	);
};

export default MatchsDay;

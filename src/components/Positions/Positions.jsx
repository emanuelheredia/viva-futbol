import React from "react";
import { useSelector } from "react-redux";

const Positions = () => {
	const state = useSelector((state) => state);
	console.log(state);
	return <div style={{ marginTop: "5rem" }}>Positions</div>;
};

export default Positions;

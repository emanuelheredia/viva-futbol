import { useState } from "react";
import "./App.css";
import MatchsDay from "./components/MatchDays/MatchsDay";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Registrer from "./components/Registrer";
function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<MatchsDay />} />
				<Route path="/login" element={<Login />} />
				<Route path="/registrer" element={<Registrer />} />
			</Routes>
		</>
	);
}

export default App;

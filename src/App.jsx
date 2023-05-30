import { useState } from "react";
import "./App.css";
import MatchsDay from "./components/MatchDays/MatchsDay";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Registrer from "./components/Auth/Registrer";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import MyProfile from "./components/MyProfile/MyProfile";
import UserResult from "./components/MyResult/UserResult";
import Positions from "./components/Positions/Positions";
function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<MatchsDay />
						</ProtectedRoute>
					}
				/>
				<Route path="/my-profile" element={<MyProfile />} />
				<Route path="/my-results" element={<UserResult />} />
				<Route path="/login" element={<Login />} />
				<Route path="/registrer" element={<Registrer />} />
				<Route path="/positions" element={<Positions />} />
			</Routes>
		</>
	);
}

export default App;

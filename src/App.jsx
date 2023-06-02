import "./App.css";
import MatchsDay from "./components/MatchDays/MatchsDay";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Registrer from "./components/Auth/Registrer";
import MyProfile from "./components/MyProfile/MyProfile";
import UserResult from "./components/MyResult/UserResult";
import Positions from "./components/Positions/Positions";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
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
				<Route
					path="/my-profile"
					element={
						<ProtectedRoute>
							<MyProfile />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/my-results"
					element={
						<ProtectedRoute>
							<UserResult />
						</ProtectedRoute>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/registrer" element={<Registrer />} />
				<Route
					path="/positions"
					element={
						<ProtectedRoute>
							<Positions />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</>
	);
}

export default App;

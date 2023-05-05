import { useState } from "react";
import "./App.css";
import MatchsDay from "./components/MatchDays/MatchsDay";
import Header from "./components/Header/Header";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Header />
			<MatchsDay />
		</>
	);
}

export default App;

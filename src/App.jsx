import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MatchsDay from "./components/MatchsDay";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<MatchsDay />
		</>
	);
}

export default App;

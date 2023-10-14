import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import AddEmployee from "./AddEmployee";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/add-employee" element={<AddEmployee />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;

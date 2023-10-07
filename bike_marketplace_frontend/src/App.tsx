//Style sheet include
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from './pages/SignIn';
import SignUp from "./pages/SignUp";
import Home from './components/Home';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SignIn />}></Route>
				<Route path="/signin" element={<SignIn />}></Route>
				<Route path="/signin/" element={<SignIn />}></Route>

				<Route path="/signup" element={<SignUp />}></Route>
				<Route path="/signup/" element={<SignUp />}></Route>

				<Route path="/home" element={<Home />}></Route>
				<Route path="/home/" element={<Home />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App;

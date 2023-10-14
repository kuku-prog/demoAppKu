import React, { useState } from "react";
import login from "./login.css";

function Login() {
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [responseMessage, setResponseMessage] = useState("");

	function handleSubmit(event) {
		event.preventDefault();

		const data = {
			email: emailAddress,
			password: password,
		};
		console.log(data);
		// send data to server
		const apiUrl = "http://52.37.234.99:8989/login"; // api of where am sending to.
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
			},
			body: JSON.stringify(data),
		};
		// fetch(apiUrl, requestOptions)
		// 	.then((response) => response.json())
		// 	.then((responseData) => {
		// 		console.log("Response:", responseData);
		// 	})
		// 	.catch((error) => {
		// 		console.error("Error:", error);
		// 	});

		const response = fetch(apiUrl, requestOptions);
		response
			.then((res) => res.json())
			.then((data) => {
				setResponseMessage(data.message);
				if (data.status === "success") {
				}
			});
	}

	return (
		<div>
			<div className="notice">
				<h2>{responseMessage}</h2>
			</div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="Email">Email</label>
				<br />
				<input
					type="text"
					id="email"
					name="email"
					value={emailAddress}
					onChange={(event) => setEmailAddress(event.target.value)}
				/>
				<br />
				<label htmlFor="Password">Password</label>
				<br />
				<input
					type="text"
					id="password"
					name="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<br />
				<br />
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
}

export default Login;

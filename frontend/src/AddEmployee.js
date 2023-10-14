import React, { useState } from "react";

function AddEmployee(props) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [emailAddress, setemailAddress] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(event) {
		event.preventDefault();

		const data = {
			first_name: firstName,
			last_name: lastName,
			email: emailAddress,
			password: password,
		};

		// send data to server
		const apiUrl = "http://52.37.234.99:8989/add-employee"; // api of where am sending to.
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
			},
			body: JSON.stringify(data),
		};
		fetch(apiUrl, requestOptions)
			.then((response) => response.json())
			.then((responseData) => {
				console.log("Response:", responseData);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}

	return (
		<div>
			<h1>Add Employee</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="firstName">First name</label>
				<br />
				<input
					type="text"
					id="firstName"
					name="firstName"
					value={firstName}
					onChange={(event) => setFirstName(event.target.value)}
				/>
				<br />
				<lable htmlFor="lastName">Last name</lable>
				<br />
				<input
					type="text"
					id="lname"
					name="lname"
					value={lastName}
					onChange={(event) => setLastName(event.target.value)}
				/>
				<br />
				<lable htmlFor="emailAddress">Email</lable>
				<br />
				<input
					type="text"
					id="email"
					name="email"
					value={emailAddress}
					onChange={(event) => setemailAddress(event.target.value)}
				/>
				<br />
				<lable htmlFor="password">Password</lable>
				<br />
				<input
					type="text"
					id="password"
					name="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<br></br>
				<br />
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
}

export default AddEmployee;

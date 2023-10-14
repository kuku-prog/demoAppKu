// import the express module
const express = require("express");
const app = express(); // create an instance of Express.js and assign it to a variable called 'app'
// import myql2 module
const mysql = require("mysql2");

// Define the connection parameters for the database
const dbConfig = {
	// connecitonLimit: 10,
	password: "demoApp",
	user: "demoApp",
	host: "localhost",
	database: "demoApp",
};

// Create the conneciton to the database
const connection = mysql.createConnection(dbConfig);
// Connect to the database
connection.connect((err) => {
	if (err) {
		console.log(`Error connecting to DB ${err}`);
	} else {
		console.log("Connected to demoApp");
	}
});
app.use(express.json());

// Create a simple get request handler to send a respnse back
app.get("/", (req, res) => {
	res.send("Hello KU!"); // Send response as plain text with status code of OK(200).
});

// Allow cors to all
app.use((req, res, next) => {
	res.setHeader("Access-control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"OPTIONS, GET, POST, PUT, PATCH, DELETE" // option present for all
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

// post request handler to add a new employee to the database
app.post("/add-employee", (req, res) => {
	console.log(req.body);

	// write the sql query to add to the database table name employee-test
	const sql = `INSERT INTO employee_test(first_name, last_name, email, password) VALUES('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}')`;
	// execute the querry
	connection.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
		// second a response back to the client
		const response = {
			status: "success",
			message: "Employee added successfully",
		};
		res.status(200).json(response);
	});
});

// post request handler to login an employee coming to this route /login
app.post("/login", (req, res) => {
	console.log(req.body);
	// compare with the data in the data base
	const sql = `SELECT * FROM employee_test WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
	// execute query
	connection.query(sql, function (err, result) {
		if (err) throw err;
		console.log(result);
		// check if the result is empty or not
		if (result.length > 0) {
			const response = {
				status: "success",
				message: "Login successful",
			};
			res.status(200).json(response);
		} else {
			const response = {
				status: "failure",
				message: "Login failed",
			};
			res.status(200).json(response);
		}
	});
});

// set up the port to listen to
const port = 8989;
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`); // eslint-disable-line no-console
});

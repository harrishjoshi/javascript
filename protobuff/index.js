const fs = require("fs");

const customers = [];

customers.push({
		"name": "Harish",
		"email": "harish@gmail.com",
		"id": 101
		});

const bob = {
	"name": "Bob",
	"email": "bob@gmail.com",
	"id": 102
};

customers.push(bob);

customers.push({
		"name": "Alice",
		"email": "alice@gmail.com",
		"id": 103
		});

// console.log(JSON.stringify(customers));

fs.writeFileSync("customers.json", JSON.stringify(customers));

const Schema = require("./customers_pb");
const fs = require("fs");

const customer = new Schema.Customer();
customer.setId(101);
customer.setName("Harish");
customer.setEmail("harish@gmail.com");

const bob = new Schema.Customer();
bob.setId(102);
bob.setName("Bob");
bob.setEmail("bob@gmail.com");

const alice = new Schema.Customer();
alice.setId(103);
alice.setName("Alice");
alice.setEmail("alice@gmail.com");

const customers = new Schema.Customers();
customers.addCustomers(customer);
customers.addCustomers(bob);
customers.addCustomers(alice);

const bytes = customers.serializeBinary();
fs.writeFileSync("customersbinary", bytes);

console.log(Schema.Customers.deserializeBinary(bytes).toString());

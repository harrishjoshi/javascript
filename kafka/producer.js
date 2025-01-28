const { Kafka } = require("kafkajs");
const msg = process.argv[2];

run();

async function run() {
  try {
    // Set up Kafka producer
    const kafka = new Kafka({
      clientId: "kafka-app",
      brokers: ["localhost:9092"],
    });

    const producer = kafka.producer();
    console.log("Connecting...");
    await producer.connect();
    console.log("Connected!");

    // Determine partition based on the first letter of the message
    const partition = msg[0].toUpperCase() < "N" ? 0 : 1;

    // Send message to the "Customers" topic
    const result = await producer.send({
      topic: "Customers",
      messages: [{ value: msg, partition }],
    });

    console.log(`Message sent: ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (ex) {
    console.error(`Error: ${ex}`);
  } finally {
    process.exit(0);
  }
}

const { Kafka } = require("kafkajs");

run();

async function run() {
  try {
    // Initialize Kafka consumer
    const kafka = new Kafka({
      clientId: "kafka-app",
      brokers: ["localhost:9092"],
    });

    const consumer = kafka.consumer({ groupId: "test" });
    console.log("Connecting...");
    await consumer.connect();
    console.log("Connected!");

    // Subscribe to the "Customers" topic from the beginning
    await consumer.subscribe({ topic: "Customers", fromBeginning: true });

    // Process incoming messages
    await consumer.run({
      eachMessage: async ({ message, partition }) => {
        console.log(`Received msg: ${message.value} on partition ${partition}`);
      },
    });
  } catch (ex) {
    console.error(`Error: ${ex}`);
  }
}

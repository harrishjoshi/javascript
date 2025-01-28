const { Kafka } = require("kafkajs");

run();

async function run() {
  try {
    // Initialize Kafka client
    const kafka = new Kafka({
      clientId: "kafka-app",
      brokers: ["localhost:9092"],
    });

    const admin = kafka.admin();
    console.log("Connecting...");
    await admin.connect();
    console.log("Connected!");

    // Create topic with 2 partitions
    await admin.createTopics({
      topics: [
        {
          topic: "Customers",
          numPartitions: 2,
        },
      ],
    });
    console.log("Topic created successfully!");
    await admin.disconnect();
  } catch (ex) {
    console.error(`Error: ${ex}`);
  } finally {
    process.exit(0);
  }
}

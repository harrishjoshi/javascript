#!/bin/bash
# Stop and remove existing containers
docker stop zookeeper kafka
docker rm zookeeper kafka

# Create network
docker network create kafka-net

# Start Zookeeper
docker run --name zookeeper \
    --network kafka-net \
    -p 2181:2181 \
    -d zookeeper

# Wait for Zookeeper to start
sleep 5

# Start Kafka
docker run --name kafka \
    --network kafka-net \
    -p 9092:9092 \
    -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
    -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
    -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
    -d confluentinc/cp-kafka

# Check Zookeeper
if [ "$(docker ps -q -f name=zookeeper)" ]; then
    echo "Zookeeper is running at localhost:2181"
else
    echo "Failed to start Zookeeper"
fi

# Check Kafka
if [ "$(docker ps -q -f name=kafka)" ]; then
    echo "Kafka is running at localhost:9092"
else
    echo "Failed to start Kafka"
fi

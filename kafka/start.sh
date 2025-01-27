#!/bin/bash

# Stop and remove existing containers
docker stop zookeeper kafka
docker rm zookeeper kafka

# Start Zookeeper
docker run --name zookeeper \
    -p 2181:2181 \
    -d zookeeper

# Wait for Zookeeper to start
sleep 5

# Start Kafka
docker run --name kafka \
    -p 9092:9092 \
    -e KAFKA_ZOOKEEPER_CONNECT=localhost:2181 \
    -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
    -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
    -d confluentinc/cp-kafka

echo "Kafka and Zookeeper are now running!"

# Project for Node.js positioin

### Description

This project is a microservices application for managing product stock in a store and tracking product actions. It consists of two main services:

* Stock Management Service – Manages product quantities on shelves and in orders.

* Product Action History Service – Records actions related to products, such as stock updates.

### Technologies

 - Node.js (v20.17.0)
 - TypeScript (for the stock management service)
 - JavaScript (for the product action history service)
 - Express.js
 - TypeORM (for database management)
 - PostgreSQL (as the database)
 - Docker (for containerization)
 - axios (for HTTP requests)

### Requirements
 - Docker (v2.29.1 or higher)
 - npm (v10.8.2 or higher)

### Steps to Run:
1. Clone the repository:

```
git clone https://github.com/akhioafk/jun_nodejs.git
```
2. Navigate to the project directory:

```
cd jun_nodejs
```

3. Build and start the Docker containers:

```
docker compose build
docker compose up
```

### P.S
In case of any problems, try to rerun the docker containers:
```
docker compose down
docker compose up
```
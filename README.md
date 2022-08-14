# 💖 Node.js - Express - MySQL - Clean Architecture 💖

_Author:_ **TSN 💌**

---

## ✍ Setup

### Step 1: Copy the .env.example file to .env

```bash
cp .env.example .env
```

**NOTE:** Change ENV variable values in .env file

### Step 2: Copy the template docker-compose file

#### For `development` environment

```bash
cp docker-compose.development.yml docker-compose.yml
```

#### For `production` environment

```bash
cp docker-compose.production.yml docker-compose.yml
```

## ✍ BUILD project

### Step 1: Build docker

```bash
docker-compose build
```

### Step 2: Run docker

```bash
docker-compose up -d
```

### Step 3: Install the dependencies for `local`

```bash
npm i
```

**Note:** Install with Node version like Dockerfile

### Step 4: Migrate database

```bash
docker-compose exec -w /opt/node_app/app node npm run docker-migare:up
```

### Step 5: Seed database

```bash
docker-compose exec -w /opt/node_app/app node npm run docker-seed:all
```

**NOTE:**

- In `production` environment, `ignore step 3, step 4 and step 5` and need to be rebuilt and run docker: `docker-compose up --build -d`

---

## ✍ GUIDE

### Generate migration

Step 1. `docker-compose exec -w /opt/node_app/app node npm run docker-migration:generate ${filename}`
Step 2. Change file extension to `.cjs`

Eg.

1. `docker-compose exec -w /opt/node_app/app node npm run docker-migration:generate create-xxx`
2. Change file `***-create-xxx.js` to `***-create-xxx.cjs`

### Generate seed

Step 1. `docker-compose exec -w /opt/node_app/app node npm run docker-seed:generate ${filename}`
Step 2. Change file extension to `.cjs`

---

## ✍ GUIDE Docker Compose command

### Build

```bash
docker-compose build
```

### Run

```bash
docker-compose up -d
```

### Rebuild and run

```bash
docker-compose up --build -d
```

### Npm install for docker

```bash
docker-compose exec -w /opt/node_app node npm install
```

### Add a package for docker

```bash
docker-compose exec -w /opt/node_app node npm install --save <package name>
```

### Npm install for local

```bash
docker-compose exec -w /opt/node_app/app node npm install
```

---

## ✍ GUIDE Docker command

### Get list all container

```bash
docker ps -a
```

### Exec container

```bash
docker exec -it CONTAINER_ID sh
```

### Stop container

```bash
docker stop CONTAINER_ID
```

### Remove container

```bash
docker rm CONTAINER_ID
```

### Get images

```bash
docker images
```

### Remove image

```bash
docker image rm IMAGE_NAME
```

---

## ✍ Clean Architecture

The application is separated into 4 layers. Inner layers cannot depend on outer layers and outer layers should only depend one layer in:

### 1. Entities (src/entities)

At the center of the onion are the Entities of the software, which constitutes the business logic of software. An entity can be an object with methods, or it can be a set of data structures and functions, they don't know anything about the outer layers and they don't have any dependency. They encapsulate the most general and high-level rules that the application would use.\
In simple words, **Entities are the primary concepts of your business**.

**Convention:**

- _Filename: `*.entity.js`_

### 2. Use Cases (src/use-cases)

The Use Cases layer, which lies outside the Entities layer, contains login and rules related to the behavior and design of the system.

**Convention:**

- _Create Use Case file with filename: `*.use-case.js` in subfolder and export them all in subfolder's index.js file_

### 3. Interface Adapters: Controller and gateways

The Interface Adapters or the Adapter layer holds the controllers and gateways (sockets). The Interface Adapters govern the flow of communication between external components and the system's back-end.\
In simple words, **Interface Adapters are isolating your various Use Cases from the tools that you use**.

**Convention:**

- _Create controller file with filename: `*.controller.js` in `controllers` subfolder_

- _Create gateway (socket) file with filename: `*.gateway.js` in `gateways` subfolder_

### 4. Frameworks and Drivers (src/infrastructure)

The Frameworks and Drivers, also known as the Infrastructure Layer, is the outermost layer that provides all necessary details about frameworks, drivers, and tools such as Databases that we use to build our application. All the details of the system go in this layer.

#### 4.1 Database (src/infrastructure/database)

The database folder is interacts with different DBs in the project. Each of DB is a subfolder.

##### The `src/infrastructure/database/*/models` folder contains model file

**Convention:**

- _Filename: `*.model.js`_

##### The `src/infrastructure/database/*/repositories` folder contains repository file to interact data with model

**Convention:**

- _Filename: `*.repository.js`_

#### 4.2 Routes (src/infrastructure/routes)

##### The routes folder is where you can organize all of your different REST endpoints declarations

**Convention:**

- _Filename: `*.route.js`_

##### The `middlewares` subfolder contains global middleware files

**Convention:**

- _Filename: `*.middleware.js`_

#### 4.3 Services (src/infrastructure/services)

The services folder for define handle logic with package

**Convention:**

- _Filename: `*.service.js`_

## NOTE

1. `src/config.js`: Config file for project
2. `src/app.js`: Express webserver
3. `src/logger.js`: Logger

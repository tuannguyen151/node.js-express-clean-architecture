# BUILD project
Step 1: `docker-compose build`<br/>
Step 2: `docker-compose up -d`<br/>
Step 3: `docker-compose exec -w /opt/node_app/app node npm run docker-migare:up`<br/>
Step 4: `docker-compose exec -w /opt/node_app/app node npm i`

**NOTE:**
- Copy the template files to .env and docker-compose.yml
- In PRODUCTION, `ignore step 3, step 4` and need to be rebuilt and run docker: `docker-compose up --build -d`
---

# GUIDE
## Generate migration
Step 1. `docker-compose exec -w /opt/node_app/app node npm run docker-migration:generate ${filename}`
Step 2. Change file extension to <b>.cjs</b>

Eg.
1. `docker-compose exec -w /opt/node_app/app node npm run docker-migration:generate create-xxx`
2. Change file `***-create-xxx.js` to `***-create-xxx.cjs`

---

# GUIDE Docker Compose command:
#### Build: `docker-compose build`
#### Run: `docker-compose up -d`
#### Rebuild and run: `docker-compose up --build -d`
#### Npm install for docker: `docker-compose exec -w /opt/node_app node npm install`
#### Add a package for docker: `docker-compose exec -w /opt/node_app node npm install --save <package name>`
#### Npm install for local: `docker-compose exec -w /opt/node_app/app node npm install`
---

# GUIDE Docker command
#### Build: `docker build -t IMAGE_NAME .`
#### Run container from image: `docker run -d -p 80:3000 IMAGE_NAME`
#### Get list all container: `docker ps -a`
#### Exec container: `docker exec -it CONTAINER_ID /bin/bash`
#### Stop container: `docker stop CONTAINER_ID`
#### Remove container: `docker rm CONTAINER_ID`
#### Get images: `docker images`
#### Remove image: `docker image rm IMAGE_NAME`
---

# Clean Architecture
The application is separated into 5 layers. Inner layers cannot depend on outer layers and outer layers should only depend one layer in:

## 1. Entities (src/entities)
At the center of the onion are the Entities of the software, which constitutes the business logic of software. An entity can be an object with methods, or it can be a set of data structures and functions, they don't know anything about the outer layers and they don't have any dependency. They encapsulate the most general and high-level rules that the application would use.<br/>
In simple words, <b>Entities are the primary concepts of your business</b>.<br/>
**NOTE:** <b>However, in this project we will be treated Entities as Model.</b>
#### *** Filename format: `*.entity.js`

## 2. Data Access (src/data-access)
The Data Access layer is the bridge between Entities layer & Use Cases layer. <b>Provide a common interface for manipulating data in the database, reducing the dependency of the Use Cases layer and Entities layer</b><br/>
#### *** Filename format: `*.db.js`

## 3. Use Cases (src/use-cases)
The Use Cases layer, which lies outside the Entities layer, contains login and rules related to the behavior and design of the system.<br/>
In simple words, <b>Use Cases are interactions between Data Access</b>.
#### *** Create Use Case file in subfolder and export them all in subfolder's index.js file

## 4. Interface Adapters: Controller, APIs and gateways (src/controllers)
The Interface Adapters or the Adapter layer holds the controllers, APIs, and gateways. The Interface Adapters govern the flow of communication between external components and the system's back-end.<br/>
In simple words, <b>Interface Adapters are isolating our various Use Cases from the tools that we use</b>.
#### *** Filename format: `*.controller.js`, ...

## 5. Frameworks and Drivers (src/app.js, src/config.js, src/database.js, src/logger.js ,... as src/*.js, src/frameworks and src/routes)
The Frameworks and Drivers, also known as the Infrastructure Layer, is the outermost layer that provides all necessary details about frameworks, drivers, and tools such as Databases that we use to build our application. All the details of the system go in this layer.<br/>

The /routes folder is where you can organize all of your different REST endpoints declarations.<br/>
The `middlewares` subfolder contains global middleware files.
#### *** Route filename format: `*.route.js`, ...

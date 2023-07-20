# 💖 Node.js - API Gateway - Clean Architecture 💖

_Author:_ **Foxdemon 💌**

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

**Note:**

- Install with Node version like Dockerfile
- In `production` environment, `ignore step 3` and need to be rebuilt and run docker: `docker-compose up --build -d`

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

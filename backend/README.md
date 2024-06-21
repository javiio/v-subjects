# Backend

Backend built with Node.js, Fastify, Prisma, and PostgreSQL.

## API Endpoints
```
GET /subjects
```
Fetch subjects with pagination and filtering.

```
POST /subjects
```
Create a new subject.

```
PUT /subjects/:id
```
Update a subject by ID.

```
DELETE /subjects/:id
```
Delete a subject by ID.


## Setup

1. **Install dependencies:**
```sh
cd backend
yarn install
```

2. **Configure the database:**
Rename `.env.example` to `.env` and update it with your PostgreSQL configuration. Example:
```sh   
DATABASE_URL="postgresql://user:password@localhost:5432/database"
```

3. **Run database migrations:**
```sh
yarn prisma migrate deploy
```

4. **Start the server:**
```sh
yarn dev
```

The backend server will run at `http://localhost:3001`.

## Running Tests

1. **Run the tests:**
```sh
yarn test
```

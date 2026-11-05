# Wanderlust Backend API

A RESTful backend API for the Wanderlust travel application, built with **Node.js, Express.js, MongoDB, and JWT Authentication**.

## 🚀 Technologies Used

- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver
- Better Auth
- JWT Authentication (`jose`)
- CORS
- dotenv

## ✨ Features

- Add new travel destinations
- Retrieve all destinations
- Retrieve featured destinations
- Get destination details by ID
- Update destination information
- Delete destinations
- Create travel bookings
- Retrieve user-specific bookings
- Delete bookings
- JWT-based protected API routes

## 📁 API Endpoints

### Destination APIs

| Method | Endpoint | Authentication |
|---|---|---|
| GET | `/destinations` | Public |
| GET | `/featured-destinations` | Public |
| POST | `/add-destination` | JWT Required |
| GET | `/destination/:id` | JWT Required |
| PATCH | `/destination/:id` | JWT Required |
| DELETE | `/destination/:id` | JWT Required |

### Booking APIs

| Method | Endpoint | Authentication |
|---|---|---|
| POST | `/booking` | Public |
| GET | `/my-bookings/:email` | JWT Required |
| DELETE | `/my-bookings/:id` | Public |

### Server API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check server status |

## 🔐 JWT Authentication

This project uses JWT authentication with Better Auth and the `jose` library.

### How It Works

1. The frontend obtains a JWT token from Better Auth.
2. The frontend sends the token through the `Authorization` header.
3. Express middleware extracts the token.
4. `createRemoteJWKSet()` retrieves the public keys from Better Auth's JWKS endpoint.
5. `jwtVerify()` verifies the token.
6. If the token is valid, the request proceeds using `next()`.
7. Otherwise, the request is rejected.

### Authorization Header

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone YOUR_BACKEND_REPOSITORY_URL
```

### 2. Navigate to the Project Folder

```bash
cd your-project-folder
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=your_frontend_url
```

### 5. Start the Development Server

```bash
npm start
```

The server runs locally at:

```text
http://localhost:8000
```

## 🗄️ Database Structure

**Database:** `wanderlust`

Collections:

- `destination`
- `bookings`

## 📦 Deployment

The backend can be deployed using platforms such as Vercel.

Configure the required environment variables in the deployment platform before deploying.

## 👨‍💻 Author

**Iftekhar Mahamud Al Asif**

## 📄 License

This project is created for educational and development purposes.
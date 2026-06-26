# GuestFlow 🏨

GuestFlow is a full-stack Hotel Management System that streamlines hotel operations through a modern web interface and a RESTful backend API. It enables efficient management of rooms, guests, bookings, and hotel activities while providing a responsive user experience.

---

# ✨ Features

## Frontend

* Modern responsive UI
* Dashboard
* Room Management
* Guest Management
* Booking Management
* Activity Timeline
* Responsive design for desktop and mobile

## Backend

* RESTful API built with Express.js
* CRUD operations for Rooms
* CRUD operations for Guests
* CRUD operations for Bookings
* Activity API
* Guest search endpoint
* JSON responses with proper HTTP status codes
* Centralized error handling middleware
* Environment variable support
* CORS configuration

---

# 🛠 Tech Stack

## Frontend

* React
* Vite
* JavaScript
* React Router DOM
* Tailwind CSS

## Backend

* Node.js
* Express.js
* CORS
* dotenv
* Nodemon

---

# 📁 Project Structure

```text
guestflow/
│
├── backend/
│   ├── src/
│   │   ├── data/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── utils/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   └── .gitignore
│
└── README.md
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/gaikwadshailesh820/guestflow.git
```

Navigate into the project

```bash
cd guestflow
```

---

# 🚀 How to Run Backend Locally

### 1. Navigate to the backend folder

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Copy the values from `.env.example`.

Example:

```env
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

### 4. Start the backend server

```bash
npm run dev
```

The backend will start on:

```text
http://localhost:5000
```

### 5. Verify the backend

Open:

```text
http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "ok"
}
```

---

# 💻 How to Run Frontend Locally

Open another terminal.

Navigate to the frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend.

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 📡 REST API Endpoints

## Rooms

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | `/api/rooms`     |
| GET    | `/api/rooms/:id` |
| POST   | `/api/rooms`     |
| PUT    | `/api/rooms/:id` |
| DELETE | `/api/rooms/:id` |

---

## Guests

| Method | Endpoint                     |
| ------ | ---------------------------- |
| GET    | `/api/guests`                |
| GET    | `/api/guests/:id`            |
| POST   | `/api/guests`                |
| PUT    | `/api/guests/:id`            |
| DELETE | `/api/guests/:id`            |
| GET    | `/api/guests/search?q=James` |

---

## Bookings

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | `/api/bookings`     |
| POST   | `/api/bookings`     |
| PUT    | `/api/bookings/:id` |
| DELETE | `/api/bookings/:id` |

---

## Activity

| Method | Endpoint        |
| ------ | --------------- |
| GET    | `/api/activity` |

---

# 🧪 API Testing

All backend endpoints can be tested using Postman.

The project includes requests for:

* Get All Rooms
* Get Single Room
* Create Room
* Update Room
* Delete Room
* Search Guests

---

# 🔒 Environment Variables

## Backend

```env
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

## Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 🚀 Future Improvements

* MongoDB database integration
* JWT Authentication
* Role-based access control
* AI-powered room recommendations
* Dashboard analytics
* Email notifications
* Online payment integration

---

# 👨‍💻 Author

**Shailesh Gaikwad**
# GuestFlow 🏨

GuestFlow is a full-stack Hotel Management System that streamlines hotel operations through a modern web interface and a RESTful backend API. It enables efficient management of rooms, guests, bookings, and hotel activities while providing a responsive user experience.

---

# ✨ Features

## Frontend

- Modern Responsive UI
- Dashboard
- Room Management
- Guest Management
- Booking Management
- Activity Timeline
- Search Functionality
- Responsive Design (Desktop & Mobile)

## Backend

- RESTful API built with Express.js
- CRUD Operations for Rooms
- CRUD Operations for Guests
- CRUD Operations for Bookings
- Activity API
- Guest Search
- PostgreSQL Database Integration
- Prisma ORM
- Cloud Database (Supabase)
- Prisma Database Seeding
- Centralized Error Handling
- Environment Variable Support
- CORS Configuration

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- JavaScript
- React Router DOM
- Tailwind CSS

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Supabase
- CORS
- dotenv
- Nodemon

---

# 🗄 Database

GuestFlow uses **Supabase PostgreSQL** as its primary relational database.

Database operations are managed using **Prisma ORM**, providing:

- Type-safe database queries
- Schema migrations
- Database seeding
- Relationship management
- Easy maintenance

### Why PostgreSQL?

- Reliable relational database
- ACID compliant transactions
- Efficient relationship management
- Cloud hosted with Supabase
- Scalable architecture

---

# 📊 Database Models

The application contains the following models:

- User
- Room
- Guest
- Booking
- Payment
- Activity
- Recommendation

---

# 🗺 Database Schema

The following Entity Relationship Diagram (ERD) illustrates the database design of **GuestFlow**. It shows the core entities, their key fields, and the relationships between them.

![GuestFlow Database Schema](docs/schema.png)


# 📁 Project Structure

```text
guestflow/
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.js
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
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

# 🚀 Backend Setup

Navigate to backend

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env`

Example:

```env
DATABASE_URL="YOUR_DATABASE_URL"

PORT=5000

CORS_ORIGIN=http://localhost:5173
```

Run Prisma Migration

```bash
npx prisma migrate dev
```

Seed Database

```bash
npx prisma db seed
```

Start Backend

```bash
npm run dev
```

Backend runs on

```
http://localhost:5000
```

Verify backend

```
http://localhost:5000/api/health
```

Expected

```json
{
  "status":"ok"
}
```

---

# 💻 Frontend Setup

Open another terminal.

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend.

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 📡 REST API Endpoints

## Rooms

| Method | Endpoint |
|---------|----------|
| GET | `/api/rooms` |
| GET | `/api/rooms/:id` |
| POST | `/api/rooms` |
| PUT | `/api/rooms/:id` |
| DELETE | `/api/rooms/:id` |

---

## Guests

| Method | Endpoint |
|---------|----------|
| GET | `/api/guests` |
| GET | `/api/guests/:id` |
| POST | `/api/guests` |
| PUT | `/api/guests/:id` |
| DELETE | `/api/guests/:id` |
| GET | `/api/guests/search?q=Rahul` |

---

## Bookings

| Method | Endpoint |
|---------|----------|
| GET | `/api/bookings` |
| GET | `/api/bookings/:id` |
| POST | `/api/bookings` |
| PUT | `/api/bookings/:id` |
| DELETE | `/api/bookings/:id` |

---

## Activities

| Method | Endpoint |
|---------|----------|
| GET | `/api/activity` |

---

# 🧪 API Testing

All REST APIs can be tested using **Postman**.

The APIs are connected to a **Supabase PostgreSQL** database using **Prisma ORM**. Every request performs real database operations.

The following endpoints have been tested:

- Get All Rooms
- Get Single Room
- Create Room
- Update Room
- Delete Room
- Get All Guests
- Search Guests
- Create Guest
- Update Guest
- Delete Guest
- Create Booking
- Update Booking Status
- Delete Booking
- Get Activity Timeline

---

# 🔒 Environment Variables

## Backend (.env)

```env
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@YOUR_HOST:5432/YOUR_DATABASE?schema=public"

PORT=5000

CORS_ORIGIN=http://localhost:5173
```

---

## Backend (.env.example)

```env
DATABASE_URL="YOUR_DATABASE_URL"

PORT=5000

CORS_ORIGIN=http://localhost:5173
```

---

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Frontend (.env.example)

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 🌱 Seed Data

The project includes a Prisma seed file that populates the database with sample hotel data.

Seed includes:

- Indian hotel rooms
- Guests
- Bookings
- Activities

Run:

```bash
npx prisma db seed
```

---

# 📌 Current Features

- Dashboard
- Room Management
- Guest Management
- Booking Management
- Activity Timeline
- Room Status Management
- Check-In / Check-Out
- Booking Cancellation
- Search Functionality
- PostgreSQL Database Integration
- Prisma ORM
- Cloud Database (Supabase)

---

# 🚀 Future Improvements

- JWT Authentication
- Role-based Access Control
- AI Room Recommendation
- Payment Gateway Integration
- Invoice Generation
- Dashboard Analytics
- Booking Reports
- Email Notifications
- Image Upload for Rooms
- Hotel Revenue Analytics

---

# 👨‍💻 Developer

**Shailesh Gaikwad**

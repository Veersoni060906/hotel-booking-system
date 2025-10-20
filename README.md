# 🏨 Hotel Room Booking System – Phase 2

## 📘 Project Overview
The **Hotel Room Booking System** is a Node.js and Express.js based RESTful backend application designed to manage hotels, rooms, guests, and bookings.  
This project demonstrates modular architecture, CRUD operations, input validation, middleware usage, and JSON-based data persistence.

---

## 🎯 Objectives
- Implement a **modular Express.js architecture**
- Define and manage data structures for all entities
- Implement full **CRUD (Create, Read, Update, Delete)** logic
- Use **middlewares** for validation, error handling, and routing
- Store data in **JSON files** as a local database
- Return proper **HTTP responses and status codes**

---

## 🏗️ Project Structure
hotel-booking-system/
│
├── server.js
├── README.md
├── package.json
├── data/
│ ├── hotels.json
│ ├── rooms.json
│ ├── guests.json
│ └── bookings.json
│
├── modules/
│ ├── hotels/
│ │ ├── models/hotelModel.js
│ │ ├── routes/hotelRoutes.js
│ │ └── middlewares/hotelValidation.js
│ ├── rooms/
│ │ ├── models/roomModel.js
│ │ ├── routes/roomRoutes.js
│ │ └── middlewares/roomValidation.js
│ ├── guests/
│ │ ├── models/guestModel.js
│ │ ├── routes/guestRoutes.js
│ │ └── middlewares/guestValidation.js
│ └── bookings/
│ ├── models/bookingModel.js
│ ├── routes/bookingRoutes.js
│ └── middlewares/bookingValidation.js


---

## ⚙️ Technologies Used
- **Node.js**
- **Express.js**
- **express-validator**
- **File System (fs)**
- **JSON data storage**

---

## 🧩 Features Implemented
### 🔹 Core Functionality
- Add, view, update, and delete hotels, rooms, guests, and bookings
- Automatically mark rooms as unavailable when booked
- Validate all POST/PUT requests using express-validator
- Independent routing for each module (feature-based structure)
- Centralized error and 404 handling middleware
- Clean, modular, and reusable business logic

### 🔹 CRUD Endpoints (Examples)
| Entity | Method | Endpoint | Description |
|---------|---------|-----------|--------------|
| Hotels | GET | `/api/hotels` | Get all hotels |
| Hotels | POST | `/api/hotels` | Add new hotel |
| Rooms | GET | `/api/rooms` | Get all rooms |
| Bookings | POST | `/api/bookings` | Add new booking |
| Guests | DELETE | `/api/guests/:id` | Delete guest |

---

## ✅ HTTP Status Codes Used
| Code | Meaning |
|------|----------|
| 200 | OK – Successful GET, PUT, DELETE |
| 201 | Created – Successful POST |
| 400 | Bad Request – Validation errors |
| 404 | Not Found – Resource not found |
| 500 | Internal Server Error – Server issue |

---

## 🧠 Validation Rules
Each module includes a middleware file that validates required fields.  
Example (Hotel Validation):
```js
body('name').notEmpty().withMessage('Hotel name is required');
body('rating').isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5');

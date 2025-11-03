# Hotel Booking System

## Project Overview
This is a **Hotel Booking System** built with **Node.js**, **Express.js**, and **MongoDB Atlas**.  
It allows managing **hotels, rooms, guests, and bookings** with full CRUD operations.  

Phase 3 integrates **MongoDB** using **Mongoose**, replacing the previous JSON-based storage.  

---

## Features

### Phase 2 (JSON-based)
- Stored hotels, rooms, guests, and bookings in JSON files.  
- Implemented CRUD operations for all modules.  
- Basic room availability management for bookings.  

### Phase 3 (MongoDB-based)
- **MongoDB Atlas integration** with Mongoose.  
- **Schemas** created for each module:
  - `Hotel` – name, location, rating, rooms
  - `Room` – hotel reference, number, type, price, availability
  - `Guest` – name, email, phone
  - `Booking` – guest reference, room reference, check-in/out, total price
- **CRUD operations** for all modules using Mongoose.  
- **Room availability** automatically updated when bookings are created or deleted.  
- **Search, sort, and pagination** for GET routes (optional via query parameters).  
- **Error handling** for invalid requests.  

---

## Project Structure

hotel-booking-system/
│
├─ modules/
│ ├─ hotels/
│ │ ├─ models/hotelModel.js
│ │ ├─ controllers/hotelController.js
│ │ └─ routes/hotelRoutes.js
│ ├─ rooms/
│ ├─ guests/
│ └─ bookings/
│
├─ shared/middlewares/connect-db.js
├─ server.js
├─ package.json
├─ package-lock.json
└─ README.mdhotel-booking-system/
│
├─ modules/
│ ├─ hotels/
│ │ ├─ models/hotelModel.js
│ │ ├─ controllers/hotelController.js
│ │ └─ routes/hotelRoutes.js
│ ├─ rooms/
│ ├─ guests/
│ └─ bookings/
│
├─ shared/middlewares/connect-db.js
├─ server.js
├─ package.json
├─ package-lock.json
└─ README.md


---

## Setup Instructions

1. Clone the repository:

```bash
git clone <your-repo-link>
cd hotel-booking-system
